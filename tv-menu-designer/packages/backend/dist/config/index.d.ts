export declare const config: {
    env: string;
    isDevelopment: boolean;
    isProduction: boolean;
    server: {
        port: number;
        host: string;
    };
    database: {
        host: string;
        port: number;
        name: string;
        user: string;
        password: string;
        pool: {
            min: number;
            max: number;
        };
    };
    redis: {
        host: string;
        port: number;
        password: string;
        db: number;
    };
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    cors: {
        origins: string[];
    };
    upload: {
        maxSize: number;
        allowedTypes: string[];
    };
    aws: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
        s3Bucket: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    };
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
    websocket: {
        port: number;
        pingInterval: number;
    };
    logging: {
        level: string;
        file: string;
    };
};
//# sourceMappingURL=index.d.ts.map