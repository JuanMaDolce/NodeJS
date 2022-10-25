const logger = require('pino')()

logger.level = 'info'

logger.info('la respuesta es %d %d %s', 42,43,44)
logger.info({a:42}, 'Hola Mundo')
logger.info({a:42, b:2}, 'Hola Mundo')
logger.info({c: {a:42, b:2}}, 'Hola Mundo')