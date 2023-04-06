import { Module } from '@nestjs/common'
import { WinstonApp } from './winston.app.service'
import { WinstonYiu } from './winston.classes'
import {
    WINSTON_APP_PROVIDER,
    WINSTON_PROVIDER,
    WINSTON_YIU_PROVIDER,
} from './winston.constants'
import {
    ConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN,
} from './winston.module-definition'
import { createWinston } from './winston.providers'

@Module({
    providers: [
        {
            provide: WINSTON_PROVIDER,
            useFactory: createWinston,
            inject: [MODULE_OPTIONS_TOKEN],
        },
        {
            provide: WINSTON_APP_PROVIDER,
            useClass: WinstonApp,
        },
        {
            provide: WINSTON_YIU_PROVIDER,
            useClass: WinstonYiu,
        },
    ],
    exports: [WINSTON_PROVIDER, WINSTON_YIU_PROVIDER],
})
export class WinstonModule extends ConfigurableModuleClass {}
