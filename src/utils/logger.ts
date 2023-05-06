import log4js from "log4js";

log4js.configure({
    appenders: { 
        console: { type: "stdout"}  },
    categories: { default: { appenders: ["console"], level: "all" } },
  });


export const logger = log4js.getLogger(); 