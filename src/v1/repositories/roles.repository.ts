import pool from '@database/.'
import { Role } from '@global-types/index'
import rolesQueries from '@queries-V1/roles.queries'

const getAll = async (): Promise<Role[]> => {
    const results = await pool.query(rolesQueries.getAll)
    return results?.rows
}

const getById = async (id: string): Promise<Role> => {
    const results = await pool.query(rolesQueries.getById, [id])
    return results?.rows?.[0]
}

const getByName = async (name: string): Promise<Role> => {
    const results = await pool.query(rolesQueries.getByName, [name])
    return results?.rows?.[0]
}

const add = async (name: string): Promise<Role> => {
    const results = await pool.query(rolesQueries.add, [name])
    return results?.rows?.[0]
}

const remove = async (id: string): Promise<Role> => {
    const results = await pool.query(rolesQueries.remove, [id])
    return results?.rows?.[0]
}

export default { getAll, getById, getByName, add, remove }
