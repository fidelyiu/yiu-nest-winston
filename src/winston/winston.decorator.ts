import { Inject } from '@nestjs/common'
import { WINSTON_PROVIDER, WINSTON_YIU_PROVIDER } from './winston.constants'

export const InjectWinston = (): ParameterDecorator => {
    return Inject(WINSTON_PROVIDER)
}

export const InjectWinstonYiu = (): ParameterDecorator => {
    return Inject(WINSTON_YIU_PROVIDER)
}
