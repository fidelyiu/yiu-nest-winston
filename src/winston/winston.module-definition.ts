import { ConfigurableModuleBuilder } from '@nestjs/common'
import { WinstonModuleOptions } from './winston.interfaces'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<WinstonModuleOptions>()
        .setClassMethodName('forRoot')
        .setFactoryMethodName('createWinstonModuleOptions')
        .setExtras(
            {
                isGlobal: true,
            },
            (definition, extras) => ({
                ...definition,
                global: extras.isGlobal,
            })
        )
        .build()
