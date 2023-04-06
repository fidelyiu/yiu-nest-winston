import { ConfigurableModuleOptionsFactory } from '@nestjs/common'
import { Logger, LoggerOptions } from 'winston'

export interface WinstonModuleOptions extends LoggerOptions {
    instance?: Logger
}

export type WinstonModuleOptionsFactory = ConfigurableModuleOptionsFactory<
    WinstonModuleOptions,
    'createWinstonModuleOptions'
>

export interface LogWrap {
    message: string
    splat?: unknown[]
    [optionName: string]: unknown
}

export type LogLevel =
    | 'error'
    | 'warn'
    | 'info'
    | 'http'
    | 'verbose'
    | 'debug'
    | 'silly'
