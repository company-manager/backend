/* eslint-disable camelcase */
import pool from '@database/index'
import { Company } from '@global-types/index'
import companiesQueries from '@queries-V1/companies.queries'

const create = async (data: Omit<Company, 'id'>) => {
    try {
        const { company_name, taxpayer_id } = data
        const result = await pool.query(companiesQueries.create, [
            company_name,
            taxpayer_id,
        ])
        const results: Company = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const getById = async (id: string) => {
    try {
        const result = await pool.query(companiesQueries.getById, [id])
        const results: Company = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const getByTaxpayerId = async (id: string): Promise<Company> => {
    const results = await pool.query(companiesQueries.getByTaxpayerId, [id])
    return results?.rows?.[0]
}

const remove = async (companyId: string) => {
    try {
        const result = await pool.query(companiesQueries.remove, [companyId])
        const results: Company = result?.rows?.[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

export default { getById, getByTaxpayerId, create, remove }
