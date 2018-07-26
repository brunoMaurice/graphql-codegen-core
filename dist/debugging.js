"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./utils/logger");
function debugLog() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (process.env.DEBUG !== undefined) {
        logger_1.logger.info.apply(logger_1.logger, args);
    }
}
exports.debugLog = debugLog;
//# sourceMappingURL=debugging.js.map