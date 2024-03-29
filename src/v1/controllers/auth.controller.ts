/* eslint-disable camelcase */
import { Request, Response } from 'express'
import usersServices from '@services-V1/users.services'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { setJwtTokens, setNewAccessToken } from '@utils/jwt'
import { Company, User } from '@global-types/index'
import { editString, isEmpty, sendEmail } from '@utils/index'
import responses from '@src/helpers/responses'
import companiesServices from '@services-V1/companies.services'
import verificationEmail from '@emails/sign-up/verification/verify'
import successVerificationEmail from '@emails/sign-up/verification/success'

dotenv.config()

const login = async (req: Request, res: Response) => {
    try {
        const validUserRequest = req.body.user
        if (!validUserRequest)
            return res.status(400).json({
                ...responses.badRequest,
                tip: 'No user email or password given',
            })

        const { email, password } = req.body.user
        const user = await usersServices.getByEmail(email)

        if (!user)
            return res.status(401).json({
                ...responses.unauthorized,
                tip: 'Email not found',
            })

        if (!user.is_verified)
            return res.status(403).json({
                ...responses.forbidden,
                tip: 'User not verified',
            })

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.user_password,
        )

        if (!isPasswordCorrect)
            return res.status(401).json({
                ...responses.unauthorized,
                tip: 'Password is incorrect.',
            })

        const userData = {
            id: user.id,
            first_name: user.first_name,
            email: user.email,
        }
        const tokens = setJwtTokens(userData)
        const { id, company_id } = user

        res.status(200)
            .header('Authorization', tokens.accessToken)
            .cookie('company_id', user.company_id, { httpOnly: true })
            .cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
            })
            .json({
                company: { id: company_id },
                user: { id },
                tokens,
            })
    } catch (error) {
        res.status(401).json({
            ...responses.unauthorized,
            error,
        })
    }
}

const refresh = (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token
        console.log('r_token_', refreshToken)

        if (!refreshToken)
            return res.status(401).json({
                code: 401,
                status: 'Unauthorized',
                message: 'The refresh token is null.',
            })

        const refreshTokenSecret =
            process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret'

        jwt.verify(refreshToken, refreshTokenSecret, (error, payload) => {
            if (error)
                return res.status(401).send({
                    code: 401,
                    status: 'Unauthorized',
                    message: 'The refresh token is invalid.',
                })

            const { id, first_name, email } = payload
            const user = { id, first_name, email }

            const accessToken = setNewAccessToken(user)
            const tokens = { accessToken, refreshToken }

            res.header('Authorization', accessToken)
            res.status(200).json({
                user: { ...user },
                tokens,
            })
        })
    } catch (error) {
        res.status(401).send({
            code: 401,
            status: 'Unauthorized',
            message: 'Something went wrong.',
        })
    }
}

const logout = (req: Request, res: Response) => {
    try {
        if (!req.cookies.refresh_token)
            return res.status(404).json({
                code: 404,
                status: 'Not found',
                message: 'No user logged in.',
            })
        res.clearCookie('refresh_token')
        res.clearCookie('company_id')
        return res
            .status(200)
            .json({ code: 200, status: 'OK', message: '👋 User logged out.' })
    } catch (error) {
        res.status(401).json({
            code: 401,
            status: 'Unauthorized',
            message: 'Something went wrong.',
        })
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const { company, user }: { company: Company; user: User } = req.body

        if (!company || !user)
            return res.status(400).json({ ...responses.badRequest })

        if (isEmpty(company) || isEmpty(user))
            return res.status(400).json({ ...responses.badRequest })

        const companyAlreadyExists = await companiesServices.getByTaxpayerId(
            company.taxpayer_id,
        )

        if (companyAlreadyExists) {
            return res.status(400).json({
                ...responses.badRequest,
                message: `Taxpayer id ${company.taxpayer_id} already exists`,
            })
        }

        const { results: newCompany, error } =
            await companiesServices.create(company)
        if (error) {
            return res.status(500).json({ ...responses.serverError, error })
        }

        if (newCompany) {
            const companyId = newCompany.id

            const { results: newUser, error } = await usersServices.create(
                companyId,
                {
                    ...user,
                },
            )

            if (error) {
                return res.status(500).json({ ...responses.serverError })
            }

            if (newUser) {
                const emailData = {
                    ...verificationEmail,
                    body: editString(verificationEmail.body, [
                        newUser.first_name,
                        `http://localhost:3003/api/v1/verify/${newUser.id}/${newUser.verification_token}`,
                    ]),
                    to: newUser.email,
                }

                sendEmail(emailData)

                return res.status(201).json({
                    ...responses.created,
                    results: { company: companyId, user: newUser.id },
                })
            }
        }
    } catch (error) {
        res.status(500).json({ ...responses.serverError })
    }
}

const verify = async (req: Request, res: Response) => {
    try {
        const { id, token } = req.params

        const { results: user, error } = await usersServices.verifyById(id)

        if (error) {
            return res.status(400).json({ ...responses.badRequest })
        }

        if (!user) {
            return res.status(404).json({ ...responses.notFound })
        }

        if (user) {
            if (user.is_verified) {
                return res.status(301).json({
                    ...responses.redirect,
                    message: 'User already verified',
                })
            }

            const isTokenValid = token === user.verification_token

            if (!isTokenValid) {
                return res.status(401).json({
                    ...responses.unauthorized,
                    message: 'Verification token invalid',
                })
            }

            const { results: updatedUserResults, error: updatedUserError } =
                await usersServices.updateById(user.id, {
                    is_verified: true,
                })

            if (updatedUserError) {
                return res.status(500).json({ ...responses.serverError })
            }

            if (updatedUserResults) {
                const emailData = {
                    ...successVerificationEmail,
                    body: editString(successVerificationEmail.body, [
                        user.first_name,
                    ]),
                    to: user.email,
                }

                sendEmail(emailData)

                return res.status(301).json({
                    ...responses.redirect,
                    results: updatedUserResults,
                })
            }
        }
    } catch (error) {
        return res.status(500).json({ ...responses.serverError, error })
    }
}

export default { login, refresh, logout, register, verify }
