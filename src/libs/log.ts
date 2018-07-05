import * as log4j from "log4js";
// import * as file from "../log/log.json";
log4j.configure("./src/log/log.json");
export class Log {
    public logger: log4j.Logger = log4j.getLogger();

    public trace(message: string) {
        this.logger.trace(message);
    }
    public debug(message: string) {
        this.logger.debug(message);
    }
    public info(message: string) {
        this.logger.info(message);
    }
    public warn(message: string) {
        this.logger.warn(message);
    }
    public error(message: string) {
        this.logger.error(message);
    }
    public fatal(message: string) {
        this.logger.fatal(message);
    }
}