import { createLogger, Logger } from 'winston'
import { WinstonModuleOptions } from './winston.interfaces'

export function createWinston(options: WinstonModuleOptions): Logger {
    if (options && options.instance && options.instance instanceof Logger) {
        return options.instance
    }
    return createLogger(options)
}
