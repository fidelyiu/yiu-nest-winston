# yiu-nest-winston

<p align="center">
  <a href="http://nestjs.com"><img alt="Nest Logo" src="https://nestjs.com/img/logo-small.svg" width="120" /></a>
</p>

<p align="center">
  <a href="https://github.com/nestjs/nest">Nest</a> 的 <a href="https://github.com/winstonjs/winston">winston</a> 日志模块封装.
</p>

## 1.安装

```bash
pnpm i winston logform yiu-nest-winston
```

## 2.快速开始

`WinstonModule`默认全局注入。

### 2.1.同步注册
```typescript
import { Module } from '@nestjs/common'
import { WinstonModule, WinstonModuleOptions } from 'yiu-nest-winston'
import { createLogger } from 'winston'

const options: WinstonModuleOptions = {
    instance: createLogger(),
}

@Module({
    imports: [
        WinstonModule.forRoot(options),
    ],
})
export class AppModule {}
```

### 2.2.异步注册

```typescript
import { Module } from '@nestjs/common'
import { WinstonModule } from 'yiu-nest-winston'

@Module({
    imports: [
        WinstonModule.forRootAsync({ useClass: WinstonConfigService }),
    ],
})
export class AppModule {}
```

`WinstonConfigService`代码如下：
```typescript
import { Injectable } from '@nestjs/common'
import { transports } from 'winston'
import {
    WinstonModuleOptions,
    WinstonModuleOptionsFactory,
} from 'yiu-nest-winston'

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
    createWinstonModuleOptions(): WinstonModuleOptions {
        return {
            level: 'silly',
            transports: [new transports.Console()],
        }
    }
}

```


### 2.3.注入Service
```typescript
import { Injectable } from '@nestjs/common'
import { Logger } from 'winston'
import { InjectWinston, InjectWinstonYiu, WinstonYiu } from 'yiu-nest-winston'

@Injectable()
export class AuthService {
    constructor(
        // 此处注入的是全局的winston单例
        @InjectWinston()
        private readonly winstonLogger: Logger,
        // 此处注入的是当前Service的`WinstonYiu`,自动配置好了context
        @InjectWinstonYiu()
        private readonly yiuLogger: WinstonYiu,
    ) {}
}
```


## 其他

你可以考虑从[yiu-winston-kit](https://github.com/fidelyiu/yiu-winston-kit)库使用`Nest`风格的`printf`。