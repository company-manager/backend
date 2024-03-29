/* eslint-disable camelcase */
import pool from '@database/index'
import { Client } from '@global-types/index'
import clientsQueries from '@queries-V1/clients.queries'

const getAll = async (companyId: string) => {
    try {
        const result = await pool.query(clientsQueries.getAll, [companyId])
        const results: Client[] = result?.rows

        return { results }
    } catch (error) {
        return { error }
    }
}

const getById = async (companyId: string, clientId: string) => {
    try {
        const result = await pool.query(clientsQueries.getById, [
            companyId,
            clientId,
        ])
        const results: Client = result.rows[0]

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

        return { results }
    } catch (error) {
        return { error }
    }
}

const remove = async (companyId: string, clientId: string) => {
    try {
        const result = await pool.query(clientsQueries.remove, [
            companyId,
            clientId,
        ])
        const results: Client = result.rows[0]

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
