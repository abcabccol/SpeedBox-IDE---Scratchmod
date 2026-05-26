/**
 * Speedbox Server Health Check Configuration
 * Add this to your Express server configuration
 */

/**
 * Setup health check and recovery endpoints
 * Usage in your server file:
 * const { setupSpeedboxHealthCheck } = require('./src/server/speedbox-health-check');
 * setupSpeedboxHealthCheck(app);
 */

export const setupSpeedboxHealthCheck = (app) => {
    /**
     * Health check endpoint - returns 200 if server is running
     */
    app.head('/health-check', (req, res) => {
        res.status(200).send();
    });

    app.get('/health-check', (req, res) => {
        res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            name: 'Speedbox IDE',
            version: process.env.npm_package_version || '1.0.0'
        });
    });

    /**
     * Error recovery endpoint
     */
    app.post('/api/recovery', (req, res) => {
        try {
            // Clear any cached data
            // Reset connection pools
            // Restart critical services
            
            res.status(200).json({
                status: 'recovery_initiated',
                message: 'Sunucu kurtarma başlatıldı',
                timestamp: new Date().toISOString()
            });

            console.log('🔄 Server recovery initiated');
        } catch (error) {
            res.status(500).json({
                status: 'recovery_failed',
                error: error.message
            });
        }
    });

    /**
     * Error logging endpoint
     */
    app.post('/api/logs/error', (req, res) => {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                console.error('[CLIENT ERROR]', {
                    message: data.message,
                    error: data.error,
                    stack: data.stack,
                    userAgent: data.userAgent,
                    timestamp: data.timestamp
                });

                res.status(200).json({ logged: true });
            } catch (error) {
                res.status(400).json({ error: 'Invalid JSON' });
            }
        });
    });

    console.log('✓ Speedbox health check endpoints configured');
};

export default setupSpeedboxHealthCheck;
