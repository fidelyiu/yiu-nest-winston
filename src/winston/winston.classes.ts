import { Inject, Injectable, Scope } from '@nestjs/common'
import { INQUIRER } from '@nestjs/core'
import { Logger } from 'winston'
import { WINSTON_PROVIDER } from './winston.constants'
import { LogLevel, LogWrap } from './winston.interfaces'

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonYiu {
    constructor(
        @Inject(WINSTON_PROVIDER)
        private readonly logger: Logger,
        @Inject(INQUIRER)
        private readonly parentClass: object
    ) {
        this.initContextByParentClass()
    }

    private context = 'UnknownContext'
    setContext(context: string): void {
        this.context = context
    }
    private initContextByParentClass(): void {
        const { parentClass } = this
        if (!parentClass) return
        const { constructor } = parentClass
        if (!constructor) return
        const { name } = constructor
        if (!name) return
        this.setContext(name)
    }

    private log(level: LogLevel, data: LogWrap): void {
        const { message, splat, ...mate } = data
        this.logger.log({
            ...mate,
            message: message,
            splat: splat,
            context: this.context,
            level,
        })
    }

    error(data: LogWrap | string): void {
        if (typeof data === 'object' && data) {
            this.log('error', data)
        } else {
            this.log('error', { message: `${data}` })
        }
    }

    warn(data: LogWrap | string): void {
        if (typeof data === 'object' && data) {
            this.log('warn', data)
        } else {
            this.log('warn', { message: `${data}` })
        }
    }

    info(data: LogWrap | string): void {
        if (typeof data === 'object' && data) {
            this.log('info', data)
        } else {
            this.log('info', { message: `${data}` })
        }
    }

    http(data: LogWrap | string): void {
        if (typeof data === 'object' && data) {
            this.log('http', data)
        } else {
            this.log('http', { message: `${data}` })
        }
    }

    verbose(data: LogWrap | string): void {
        if (typeof data === 'object' && data) {
            this.log('verbose', data)
        } else {
            this.log('verbose', { message: `${data}` })
        }
    }

    debug(data: LogWrap | string): void {
        if (typeof data === 'object' && data) {
            this.log('debug', data)
        } else {
            this.log('debug', { message: `${data}` })
        }
    }

    silly(data: LogWrap | string): void {
        if (typeof data === 'object' && data) {
            this.log('silly', data)
        } else {
            this.log('silly', { message: `${data}` })
        }
    }
}
