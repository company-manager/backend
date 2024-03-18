/* eslint-disable camelcase */
import pool from '@database/index'
import clientsQueries from '@queries-V1/clients.queries'

type ClientData = {
    name: string
    companyId: string
    taxpayer_id?: string
    address_1?: string
    address_2?: string
    city?: string
    country?: string
    phone_1?: string
    phone_2?: string
}

const getAll = async (companyId: string) => {
    const results = await pool.query(clientsQueries.getAll, [companyId])
    return results?.rows
}

const getById = async (companyId: string, clientId: string) => {
    const results = await pool.query(clientsQueries.getOneByCompany, [
        companyId,
        clientId,
    ])

    return results?.rows?.[0] || []
}

const remove = async (companyId: string, clientId: string) => {
    const results = await pool.query(clientsQueries.remove, [
        companyId,
        clientId,
    ])
    return results?.rows?.[0]
}

const getByTaxpayerId = async (companyId: string, taxpayerId: string) => {
    const results = await pool.query(clientsQueries.getByTaxpayerId, [
        companyId,
        taxpayerId,
    ])

    console.log('_results', results)

    return results?.rows?.[0]
}

const add = async (data: ClientData) => {
    const {
        name,
        companyId,
        taxpayer_id,
        address_1,
        address_2,
        city,
        country,
        phone_1,
        phone_2,
    } = data
    const results = await pool.query(clientsQueries.add, [
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

    return results?.rows?.[0]
}

const update = async (
    companyId: string,
    clientId: string,
    data: Partial<ClientData>,
) => {
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
    const results = await pool.query(clientsQueries.update, [
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

    return results.rows[0]
}

export default {
    getAll,
    getById,
    getByTaxpayerId,
    remove,
    add,
    update,
}
