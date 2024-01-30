import jwt from 'jsonwebtoken'
import { JwtConfigType, UserType } from './types'

const jwtTokens = (user: UserType) => {
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env
    const accessTokenConfig: JwtConfigType = {
        expiresIn: '10m',
    }
    const refreshTokenConfig: JwtConfigType = {
        expiresIn: '5d',
    }

    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, accessTokenConfig)
    const refreshToken = jwt.sign(
        user,
        REFRESH_TOKEN_SECRET,
        refreshTokenConfig,
    )

    return { accessToken, refreshToken }
}

export { jwtTokens }
