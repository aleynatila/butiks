// PM2 Ecosystem Configuration
// Alternative to systemd service for managing Node.js processes
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'butiks-api',
    script: './src/server.js',
    instances: 'max', // Use all available CPU cores
    exec_mode: 'cluster',
    
    // Environment variables
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    
    // Restart configuration
    watch: false, // Set to true in development if needed
    max_memory_restart: '1G',
    restart_delay: 4000,
    
    // Logging
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Advanced features
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Graceful shutdown
    kill_timeout: 5000,
    listen_timeout: 3000,
    
    // Source map support
    node_args: '--enable-source-maps'
  }]
};
