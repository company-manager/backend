/* eslint-disable camelcase */
import pool from '@database/index'
import clientsQueries from '@queries-V1/clients.queries'

type ClientData = {
    name: string
    taxpayer_id: string
}

const getAll = async () => {
    const results = await pool.query(clientsQueries.getAll)
    return results?.rows
}

const getAllByCompany = async (companyId: string) => {
    const results = await pool.query(clientsQueries.getManyByCompany, [
        companyId,
    ])
    return results?.rows
}

const getById = async (companyId: string, clientId: string) => {
    const results = await pool.query(clientsQueries.getOneByCompany, [
        companyId,
        clientId,
    ])

    return results?.rows?.[0]
}

const remove = async (companyId: string, clientId: string) => {
    const results = await pool.query(clientsQueries.remove, [
        companyId,
        clientId,
    ])
    return results?.rows?.[0]
}

const add = async (data: ClientData) => {
    const { name, taxpayer_id } = data
    const results = await pool.query(clientsQueries.add, [name, taxpayer_id])
    return results?.rows?.[0]
}

const addRelationWithCompany = async (companyId: string, clientId: string) => {
    const results = await pool.query(clientsQueries.addToJunction, [
        companyId,
        clientId,
    ])

    return results?.rows?.[0]
}

const getByTaxpayerId = async (taxpayerId: string) => {
    const results = await pool.query(clientsQueries.getByTaxpayerId, [
        taxpayerId,
    ])

    return results?.rows?.[0]
}

const getRelation = async (companyId: string, clientId: string) => {
    const results = await pool.query(clientsQueries.getRelation, [
        companyId,
        clientId,
    ])

    return results?.rows
}

export default {
    getAll,
    getById,
    getAllByCompany,
    getByTaxpayerId,
    getRelation,
    remove,
    add,
    addRelationWithCompany,
}
