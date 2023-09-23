const { createLogger, format, transports } = require('winston')
const myCustomLevels = {
 levels: {
  error: 0,
  warn: 1,
  data: 2,
  info: 3,
  debug: 4,
  verbose: 5,
  silly: 6,
  custom: 7,
 },
 colors: {
  error: 'red',
  warn: 'orange',
  data: 'grey',
  info: 'green',
  debug: 'yellow',
  verbose: 'cyan',
  silly: 'magenta',
  custom: 'blue',
 },
};

const logger = createLogger(
 {
  level: myCustomLevels,
  format: format.combine(
   format.timestamp({ format: 'DD-MM-YYYY  HH:mm:ss' }),
   format.json()
  ),
  transports: [
   new transports.Console({ level: 'info' }),
   new transports.File({ filename: 'logger.log', level: 'info' })
  ]
 }
);

module.exports = logger