const winston = require('winston');

// Konfigurasi logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs.log' })
    ]
});

module.exports = logger;
