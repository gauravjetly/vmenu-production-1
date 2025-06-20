"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.deviceRoutes = router;
// TODO: Implement device routes
// - GET /api/devices - List all devices for organization
// - GET /api/devices/:id - Get device details
// - POST /api/devices - Register new device
// - PUT /api/devices/:id - Update device
// - DELETE /api/devices/:id - Remove device
// - POST /api/devices/:id/pair - Pair device with pairing code
// - PUT /api/devices/:id/menu - Assign menu to device
// - GET /api/devices/:id/status - Get device status
// - POST /api/devices/:id/restart - Restart device
// Placeholder routes
router.get('/', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Device list endpoint not implemented' });
});
router.get('/:id', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Get device endpoint not implemented' });
});
router.post('/', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Register device endpoint not implemented' });
});
router.put('/:id', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Update device endpoint not implemented' });
});
router.delete('/:id', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Delete device endpoint not implemented' });
});
router.post('/:id/pair', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Pair device endpoint not implemented' });
});
router.put('/:id/menu', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Assign menu endpoint not implemented' });
});
router.get('/:id/status', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Device status endpoint not implemented' });
});
router.post('/:id/restart', auth_1.authenticate, (req, res) => {
    res.status(501).json({ message: 'Restart device endpoint not implemented' });
});
//# sourceMappingURL=device.routes.js.map