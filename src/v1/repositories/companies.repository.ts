/* eslint-disable camelcase */

import pool from '@database/index'
import { Company } from '@global-types/index'
import companiesQueries from '@queries-V1/companies.queries'

const add = async (company: Company): Promise<Company> => {
    const { company_name, taxpayer_id } = company
    const results = await pool.query(companiesQueries.add, [
        company_name,
        taxpayer_id,
    ])

    return results?.rows?.[0]
}

const getById = async (id: string): Promise<Company> => {
    const results = await pool.query(companiesQueries.getById, [id])
    return results?.rows?.[0]
}

const getByTaxpayerId = async (id: string): Promise<Company> => {
    const results = await pool.query(companiesQueries.getByTaxpayerId, [id])
    return results?.rows?.[0]
}

const remove = async (id: string): Promise<Company> => {
    const results = await pool.query(companiesQueries.remove, [id])
    return results?.rows?.[0]
}

export default { getById, getByTaxpayerId, add, remove }
