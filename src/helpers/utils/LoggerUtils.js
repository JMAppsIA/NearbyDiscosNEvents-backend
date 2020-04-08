class LoggerUtils {
    static debug(message) {
      if (['DEBUG'].includes(process.env.LOGGING_LEVEL) || !process.env.LOGGING_LEVEL || process.env.STAGE !== 'PROD') {
        if (typeof message === 'object') {
          const mssg = JSON.stringify(message);
          if (mssg === '{}') {
            console.error(message);
          } else {
            console.error(mssg);
          }
        } else {
          console.log(message);
        }
      }
    }
  
    static info(message) {
      if (['INFO', 'DEBUG'].includes(process.env.LOGGING_LEVEL) || !process.env.LOGGING_LEVEL) {
        if (typeof message === 'object') {
          const mssg = JSON.stringify(message);
          if (mssg === '{}') {
            console.error(message);
          } else {
            console.error(mssg);
          }
        } else {
          console.log(message);
        }
      }
    }
  
    static error(message) {
      if (['INFO', 'ERROR', 'DEBUG'].includes(process.env.LOGGING_LEVEL) || !process.env.LOGGING_LEVEL) {
        if (typeof message === 'object') {
          const mssg = JSON.stringify(message);
          if (mssg === '{}') {
            console.error(message);
          } else {
            console.error(mssg);
          }
        } else {
          console.error(message);
        }
      }
    }
  }
  
  module.exports = LoggerUtils;
  