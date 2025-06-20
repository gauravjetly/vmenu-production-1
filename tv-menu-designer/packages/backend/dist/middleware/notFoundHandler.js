"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
function notFoundHandler(req, res) {
    res.status(404).json({
        success: false,
        message: 'Resource not found',
        path: req.path
    });
}
//# sourceMappingURL=notFoundHandler.js.map