"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const promises_1 = __importDefault(require("fs/promises"));
const sharp_1 = __importDefault(require("sharp"));
const DIContainer_1 = require("../container/DIContainer");
const router = (0, express_1.Router)();
exports.uploadRoutes = router;
const logger = (0, DIContainer_1.getLogger)();
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = path_1.default.join(process.cwd(), 'uploads', 'images');
        await promises_1.default.mkdir(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const filename = `${(0, uuid_1.v4)()}${ext}`;
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed'));
        }
    }
});
// Upload single image
router.post('/image', auth_1.authenticate, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            throw new errorHandler_1.AppError('No file uploaded', 400);
        }
        const { file } = req;
        const userId = req.user.id;
        const organizationId = req.user.organizationId;
        // Process image with sharp
        const metadata = await (0, sharp_1.default)(file.path).metadata();
        // Create thumbnail
        const thumbnailFilename = `thumb_${file.filename}`;
        const thumbnailPath = path_1.default.join(path_1.default.dirname(file.path), thumbnailFilename);
        await (0, sharp_1.default)(file.path)
            .resize(300, 300, {
            fit: 'inside',
            withoutEnlargement: true
        })
            .jpeg({ quality: 80 })
            .toFile(thumbnailPath);
        // Optimize original if needed
        if (metadata.width > 2000 || metadata.height > 2000) {
            const optimizedPath = file.path + '.optimized';
            await (0, sharp_1.default)(file.path)
                .resize(2000, 2000, {
                fit: 'inside',
                withoutEnlargement: true
            })
                .jpeg({ quality: 90 })
                .toFile(optimizedPath);
            // Replace original with optimized
            await promises_1.default.unlink(file.path);
            await promises_1.default.rename(optimizedPath, file.path);
        }
        const imageData = {
            id: (0, uuid_1.v4)(),
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url: `/uploads/images/${file.filename}`,
            thumbnailUrl: `/uploads/images/${thumbnailFilename}`,
            width: metadata.width,
            height: metadata.height,
            organizationId,
            uploadedBy: userId,
            uploadedAt: new Date().toISOString()
        };
        logger.info('Image uploaded successfully', {
            imageId: imageData.id,
            userId,
            organizationId,
            filename: file.filename
        });
        res.status(201).json({
            success: true,
            data: imageData
        });
    }
    catch (error) {
        logger.error('Image upload error', error);
        throw error;
    }
});
// Get uploaded images
router.get('/images', auth_1.authenticate, async (req, res) => {
    try {
        const organizationId = req.user.organizationId;
        const uploadDir = path_1.default.join(process.cwd(), 'uploads', 'images');
        // TODO: Store image metadata in database for better querying
        // For now, return a simple list from filesystem
        const files = await promises_1.default.readdir(uploadDir);
        const images = files
            .filter(file => !file.startsWith('thumb_'))
            .map(filename => ({
            id: filename.split('.')[0],
            filename,
            url: `/uploads/images/${filename}`,
            thumbnailUrl: `/uploads/images/thumb_${filename}`
        }));
        res.json({
            success: true,
            data: images
        });
    }
    catch (error) {
        logger.error('Failed to list images', error);
        throw error;
    }
});
// Delete image
router.delete('/image/:filename', auth_1.authenticate, async (req, res) => {
    try {
        const { filename } = req.params;
        const uploadDir = path_1.default.join(process.cwd(), 'uploads', 'images');
        // Delete original and thumbnail
        await promises_1.default.unlink(path_1.default.join(uploadDir, filename));
        await promises_1.default.unlink(path_1.default.join(uploadDir, `thumb_${filename}`)).catch(() => { });
        logger.info('Image deleted', { filename });
        res.json({
            success: true,
            message: 'Image deleted successfully'
        });
    }
    catch (error) {
        logger.error('Failed to delete image', error);
        throw error;
    }
});
//# sourceMappingURL=upload.routes.js.map