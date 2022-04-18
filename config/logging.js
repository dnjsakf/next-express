const path = require("path");
const winstonDaily = require("winston-daily-rotate-file");
const winston = require("winston");
const { format } = winston;

const customFormat = format.printf((info)=>(
    `[${info.timestamp}][${info.level}] - ${info.message}`
));

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customFormat,
    ),
    transports: [
        new winston.transports.Console(),
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYYMMDD',
            dirname: path.join(__dirname, '../logs'),
            filename: `appName_%DATE%.log`,
            maxSize: null,
            maxFiles: 14
        }),
    ],
});

const stream = {
    write(message){
      logger.info(message)
    }
};

module.exports = { logger, stream };