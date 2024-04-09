/* eslint-disable camelcase */
import pool from '@database/index'
import { Client } from '@global-types/index'
import clientsQueries from '@v1/queries/clients.queries'
import {
    get,
    set,
    update as updateCache,
    remove as deleteCache,
} from 'cache/utils'

const getAll = async (companyId: string) => {
    try {
        const cacheKey = `all-clients-${companyId}`
        const cache = await get(cacheKey)

        if (!cache) {
            const result = await pool.query(clientsQueries.getAll, [companyId])
            const results: Client[] = result?.rows
            const clientsCache = JSON.stringify(results)
            set(cacheKey, clientsCache)

            return { results }
        }

        const results: Client[] = JSON.parse(cache)

        return { results }
    } catch (error) {
        return { error }
    }
}

const getById = async (companyId: string, clientId: string) => {
    try {
        const cacheKey = `client-${companyId}:${clientId}`
        const cache = await get(cacheKey)

        if (!cache) {
            const result = await pool.query(clientsQueries.getById, [
                companyId,
                clientId,
            ])
            const results: Client = result.rows[0]
            const clientsCache = JSON.stringify(result)
            set(cacheKey, clientsCache)

            return { results }
        }

        const results: Client = JSON.parse(cache)

        return { results }
    } catch (error) {
        return { error }
    }
}

const getByTaxpayerId = async (companyId: string, taxpayerId: string) => {
    const results = await pool.query(clientsQueries.getByTaxpayerId, [
        companyId,
        taxpayerId,
    ])

    return results?.rows?.[0]
}

const create = async (
    companyId: string,
    data: Omit<Client, 'id' | 'company_id'>,
) => {
    try {
        const {
            name,
            taxpayer_id,
            address_1,
            address_2,
            city,
            country,
            phone_1,
            phone_2,
        } = data

        const result = await pool.query(clientsQueries.create, [
            name,
            companyId,
            taxpayer_id,
            address_1,
            address_2,
            city,
            country,
            phone_1,
            phone_2,
        ])

        const results: Client = result.rows[0]

        updateCache<Client>('client', companyId, results)

        return { results }
    } catch (error) {
        return { error }
    }
}

const update = async (
    companyId: string,
    clientId: string,
    data: Partial<Client>,
) => {
    try {
        const {
            name,
            taxpayer_id,
            address_1,
            address_2,
            city,
            country,
            phone_1,
            phone_2,
        } = data

        const result = await pool.query(clientsQueries.update, [
            companyId,
            clientId,
            name,
            taxpayer_id,
            address_1,
            address_2,
            city,
            country,
            phone_1,
            phone_2,
        ])
        const results: Client = result.rows[0]

        updateCache<Client>('client', companyId, results)

        return { results }
    } catch (error) {
        return { error }
    }
}

const remove = async (companyId: string, clientId: string) => {
    try {
        const cacheKey = `client-${companyId}:${clientId}`
        const result = await pool.query(clientsQueries.remove, [
            companyId,
            clientId,
        ])
        const results: Client = result.rows[0]

        deleteCache(cacheKey)

        return { results }
    } catch (error) {
        return { error }
    }
}

export default {
    getAll,
    getById,
    getByTaxpayerId,
    create,
    update,
    remove,
}
