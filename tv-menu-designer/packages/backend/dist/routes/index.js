"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = setupRoutes;
const auth_routes_1 = require("./auth.routes");
const organization_routes_1 = require("./organization.routes");
const user_routes_1 = require("./user.routes");
const menu_routes_1 = require("./menu.routes");
const device_routes_1 = require("./device.routes");
const analytics_routes_1 = require("./analytics.routes");
const upload_routes_1 = require("./upload.routes");
function setupRoutes(app) {
    // API routes
    app.use('/api/auth', auth_routes_1.authRoutes);
    app.use('/api/organizations', organization_routes_1.organizationRoutes);
    app.use('/api/users', user_routes_1.userRoutes);
    app.use('/api/menus', menu_routes_1.menuRoutes);
    app.use('/api/devices', device_routes_1.deviceRoutes);
    app.use('/api/analytics', analytics_routes_1.analyticsRoutes);
    app.use('/api/upload', upload_routes_1.uploadRoutes);
}
//# sourceMappingURL=index.js.map