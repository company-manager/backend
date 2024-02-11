import jwt from 'jsonwebtoken'
import { JwtConfigType, UserType } from './types'

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env
const ACCESS_TOKEN_CONFIG: JwtConfigType = { expiresIn: '10s' }
const REFRESH_TOKEN_CONFIG: JwtConfigType = { expiresIn: '30s' }
const refreshTokenSecret = REFRESH_TOKEN_SECRET || 'refresh_token_secret'
const accessTokenSecret = ACCESS_TOKEN_SECRET || 'access_token_secret'

const setNewAccessToken = (user: UserType) => {
    const accessToken = jwt.sign(user, accessTokenSecret, ACCESS_TOKEN_CONFIG)

    return accessToken
}

const setJwtTokens = (user: UserType) => {
    const accessToken = jwt.sign(user, accessTokenSecret, ACCESS_TOKEN_CONFIG)
    const refreshToken = jwt.sign(
        user,
        refreshTokenSecret,
        REFRESH_TOKEN_CONFIG,
    )

    return { accessToken, refreshToken }
}

export { setJwtTokens, setNewAccessToken }
