import jwt from 'jsonwebtoken'
import { JwtConfigType, UserType } from './types'

const jwtTokens = (user: UserType) => {
    const accessTokenConfig: JwtConfigType = {
        expiresIn: '10m',
    }
    const refreshTokenConfig: JwtConfigType = {
        expiresIn: '5d',
    }

    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || 'access_token_secret'
    const accessToken = jwt.sign(user, accessTokenSecret, accessTokenConfig)

    const refreshTokenSecret =
        process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret'
    const refreshToken = jwt.sign(user, refreshTokenSecret, refreshTokenConfig)

    return { accessToken, refreshToken }
}

export { jwtTokens }
