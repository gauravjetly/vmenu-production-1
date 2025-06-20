import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { authenticate, AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import fs from 'fs/promises';
import sharp from 'sharp';
import { getLogger } from '../container/DIContainer';

const router = Router();
const logger = getLogger();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'images');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Upload single image
router.post(
  '/image',
  authenticate,
  upload.single('image'),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        throw new AppError('No file uploaded', 400);
      }

      const { file } = req;
      const userId = req.user!.id;
      const organizationId = req.user!.organizationId;

      // Process image with sharp
      const metadata = await sharp(file.path).metadata();
      
      // Create thumbnail
      const thumbnailFilename = `thumb_${file.filename}`;
      const thumbnailPath = path.join(path.dirname(file.path), thumbnailFilename);
      
      await sharp(file.path)
        .resize(300, 300, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);

      // Optimize original if needed
      if (metadata.width! > 2000 || metadata.height! > 2000) {
        const optimizedPath = file.path + '.optimized';
        await sharp(file.path)
          .resize(2000, 2000, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ quality: 90 })
          .toFile(optimizedPath);
        
        // Replace original with optimized
        await fs.unlink(file.path);
        await fs.rename(optimizedPath, file.path);
      }

      const imageData = {
        id: uuidv4(),
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
    } catch (error) {
      logger.error('Image upload error', error as Error);
      throw error;
    }
  }
);

// Get uploaded images
router.get('/images', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const organizationId = req.user!.organizationId;
    const uploadDir = path.join(process.cwd(), 'uploads', 'images');
    
    // TODO: Store image metadata in database for better querying
    // For now, return a simple list from filesystem
    const files = await fs.readdir(uploadDir);
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
  } catch (error) {
    logger.error('Failed to list images', error as Error);
    throw error;
  }
});

// Delete image
router.delete('/image/:filename', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { filename } = req.params;
    const uploadDir = path.join(process.cwd(), 'uploads', 'images');
    
    // Delete original and thumbnail
    await fs.unlink(path.join(uploadDir, filename));
    await fs.unlink(path.join(uploadDir, `thumb_${filename}`)).catch(() => {});

    logger.info('Image deleted', { filename });

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    logger.error('Failed to delete image', error as Error);
    throw error;
  }
});

export { router as uploadRoutes };