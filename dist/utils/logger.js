"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var winston = require("winston");
var winston_1 = require("winston");
exports.logger = new winston_1.Logger({
    transports: [
        new winston.transports.Console({
            timestamp: function () {
                return moment().format('HH:mm:ss.SSS');
            },
            level: 'info',
            colorize: true,
            formatter: function (options) {
                return (options.timestamp() + " - " +
                    (winston.config.colorize(options.level) + ": ") +
                    ("" + (options.message ? options.message : '')) +
                    ("" + (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : '')));
            }
        })
    ]
});
//# sourceMappingURL=logger.js.map