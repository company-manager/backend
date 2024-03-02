import pool from '@database/index'
import clientsQueries from '@queries-V1/clients.queries'

const getAll = async () => {
    const results = await pool.query(clientsQueries.getAll)
    return results?.rows
}

const getById = async (id: string) => {
    const results = await pool.query(clientsQueries.getById, [id])
    return results?.rows?.[0]
}

export default { getAll, getById }
