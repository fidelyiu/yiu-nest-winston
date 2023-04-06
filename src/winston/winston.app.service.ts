import { Inject, Injectable, LoggerService } from '@nestjs/common'
import { LogEntry, Logger } from 'winston'
import { WINSTON_PROVIDER } from './winston.constants'

@Injectable()
export class WinstonApp implements LoggerService {
    constructor(
        @Inject(WINSTON_PROVIDER)
        private readonly logger: Logger
    ) {}

    private _log(
        level: string,
        message: unknown,
        context: unknown,
        ...mate: unknown[]
    ): void {
        if (
            typeof context === 'string' ||
            context instanceof String ||
            context === undefined
        ) {
            const logObj: LogEntry = {
                level,
                message: message as string,
                context,
            }
            if (mate.length) {
                logObj.mate = mate
            }
            this.logger.log(logObj)
        } else {
            this.logger.log({
                level,
                message: `${message}`,
                context: 'Nest',
                mate: [context, ...mate],
            })
        }
    }

    log(message: unknown, context?: unknown, ...mate: unknown[]): void {
        this._log('info', message, context, ...mate)
    }
    error(message: unknown, context?: unknown, ...mate: unknown[]): void {
        if (
            mate.includes('ExceptionsHandler') ||
            mate.includes('ExceptionHandler')
        ) {
            this.logger.log({
                level: 'error',
                message: `${message}`,
                context: 'Nest',
                error: context,
                mate: mate,
            })
        } else {
            this._log('error', message, context, ...mate)
        }
    }
    warn(message: unknown, context?: unknown, ...mate: unknown[]): void {
        this._log('warn', message, context, ...mate)
    }
    debug(message: unknown, context?: unknown, ...mate: unknown[]): void {
        this._log('debug', message, context, ...mate)
    }
    verbose(message: unknown, context?: unknown, ...mate: unknown[]): void {
        this._log('verbose', message, context, ...mate)
    }
}
