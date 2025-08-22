import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, json } = winston.format;

// See documentation of both packages for more info and options
// Winston logging levels:
// {emerg:   0,
// 	alert:   1,
// 	crit:    2,
// 	error:   3,
// 	warning: 4,
// 	notice:  5,
// 	info:    6,
// 	debug:   7 }

export const logger = winston.createLogger({
	level: "info",
	levels: winston.config.syslog.levels,
	format: combine(timestamp(), json()),
	transports: [
		new DailyRotateFile({
			filename: "./src/logs/%DATE%-app.log",
			datePattern: "YYYY-MM-DD-HH",
			maxSize: "20m",
			maxFiles: "30d",
		}),
		new DailyRotateFile({
			level: "error",
			filename: "./src/logs/%DATE%-error.log",
			datePattern: "YYYY-MM-DD-HH",
			maxSize: "20m",
			maxFiles: "30d",
		}),
		new DailyRotateFile({
			level: "crit",
			filename: "./src/logs/%DATE%-crit.log",
			datePattern: "YYYY-MM-DD-HH",
			maxSize: "20m",
			maxFiles: "30d",
		}),
		new DailyRotateFile({
			level: "alert",
			filename: "./src/logs/%DATE%-alert.log",
			datePattern: "YYYY-MM-DD-HH",
			maxSize: "20m",
			maxFiles: "30d",
		}),
	],
});
