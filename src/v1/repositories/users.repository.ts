/* eslint-disable camelcase */
import pool from '@database/.'
import { User } from '@global-types/.'
import usersQueries from '@src/v1/queries/users.queries'
import { editString, generateToken, isEmpty } from '@utils/index'
import { Params } from '@src/helpers/params'
import { get, set } from 'cache/utils'

const DEFAULT_ROLE_ID = 3

const getAll = async (companyId: string, queryParams: Params) => {
    try {
        const cacheKey = `all-users-${companyId}`
        const result = await get(cacheKey)

        let orderByParam = 'first_name'
        let orderParam = 'ASC'

        if (!isEmpty(queryParams)) {
            if (queryParams.orderby) {
                orderByParam = queryParams.orderby
            }

            if (queryParams.order) {
                orderParam = queryParams.order
            }
        }

        if (!result) {
            const query = editString(usersQueries.getAll, [
                orderByParam,
                orderParam,
            ])

            const dbResult = await pool.query(query, [companyId])
            const results: User[] = dbResult.rows
            const usersCache = JSON.stringify(results)
            set(cacheKey, usersCache)

            return { results }
        }

        const results: User[] = JSON.parse(result)

        return { results }
    } catch (error) {
        return { error }
    }
}

const getById = async (companyId: string, userId: string) => {
    try {
        const cacheKey = `user-${companyId}:${userId}`
        const result = await get(cacheKey)

        if (!result) {
            const dbResult = await pool.query(usersQueries.getById, [
                companyId,
                userId,
            ])
            const results: User = dbResult.rows[0]
            const usersCache = JSON.stringify(results)
            set(cacheKey, usersCache)

            return { results }
        }

        const results: User = JSON.parse(result)

        return { results }
    } catch (error) {
        return { error }
    }
}

const getByEmail = async (email: string): Promise<User | undefined> => {
    const results = await pool.query(usersQueries.getByEmail, [email])
    return results?.rows?.[0]
}

const verifyById = async (userId: string) => {
    try {
        const result = await pool.query(usersQueries.verifyById, [userId])
        const results = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const create = async (
    companyId: string,
    data: Omit<User, 'id' | 'company_id'>,
) => {
    try {
        const verification_token = generateToken()
        const {
            first_name,
            last_name,
            email,
            user_password,
            role_id,
            is_verified,
            terms_accepted,
        } = data

        const result = await pool.query(usersQueries.create, [
            first_name,
            last_name,
            email,
            user_password,
            role_id || DEFAULT_ROLE_ID,
            is_verified,
            terms_accepted,
            verification_token,
            companyId,
        ])

        const results: User = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const update = async (
    companyId: string,
    userId: string,
    data: Partial<User>,
) => {
    try {
        const {
            first_name,
            last_name,
            email,
            user_password,
            role_id,
            is_verified,
            terms_accepted,
            verification_token,
        } = data

        const result = await pool.query(usersQueries.update, [
            companyId,
            userId,
            first_name,
            last_name,
            email,
            user_password,
            role_id,
            is_verified,
            terms_accepted,
            verification_token,
        ])

        const results: User = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const updateById = async (userId: string, data: Partial<User>) => {
    try {
        const {
            first_name,
            last_name,
            email,
            user_password,
            role_id,
            is_verified,
            terms_accepted,
            verification_token,
        } = data

        const result = await pool.query(usersQueries.updateById, [
            userId,
            first_name,
            last_name,
            email,
            user_password,
            role_id,
            is_verified,
            terms_accepted,
            verification_token,
        ])

        const results: User = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const remove = async (companyId: string, userId: string) => {
    try {
        const result = await pool.query(usersQueries.remove, [
            companyId,
            userId,
        ])

        const results: User = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

export default {
    getAll,
    getById,
    getByEmail,
    verifyById,
    create,
    update,
    updateById,
    remove,
}
