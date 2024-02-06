import pool from '@database/.'
import { User, UserUpdate } from '@global-types/index'
import usersQueries from '@src/v1/queries/users.queries'

const DEFAULT_ROLE_ID = 3

const getAll = async (): Promise<User[]> => {
    const results = await pool.query(usersQueries.getAll)
    return results?.rows
}

const getById = async (id: string): Promise<User> => {
    const results = await pool.query(usersQueries.getById, [id])
    return results?.rows?.[0]
}

const getByEmail = async (email: string): Promise<User | undefined> => {
    const results = await pool.query(usersQueries.getByEmail, [email])
    return results?.rows?.[0]
}

const add = async (user: User) => {
    const results = await pool.query(usersQueries.add, [
        user.first_name,
        user.last_name,
        user.email,
        user.user_password,
        user.role_id || DEFAULT_ROLE_ID,
    ])
    return results?.rows?.[0]
}

const remove = async (id: string): Promise<User> => {
    const results = await pool.query(usersQueries.remove, [id])
    return results?.rows?.[0]
}

const update = async (id: string, data: UserUpdate): Promise<UserUpdate> => {
    const results = await pool.query(usersQueries.update, [
        id,
        data.first_name,
        data.last_name,
        data.email,
        data.user_password,
        data.role_id,
    ])
    return results?.rows?.[0]
}

export default { getAll, getById, getByEmail, add, remove, update }
