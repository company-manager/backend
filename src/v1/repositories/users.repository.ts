import pool from '@database/.'
import { User, UserUpdate } from '@global-types/index'
import userQueries from '@src/v1/queries/users.queries'

const getAll = async (): Promise<User[]> => {
    const results = await pool.query(userQueries.getAll)
    return results?.rows
}

const getById = async (id: string): Promise<User> => {
    const results = await pool.query(userQueries.getById, [id])
    return results?.rows?.[0]
}

const getByEmail = async (email: string): Promise<User | []> => {
    const results = await pool.query(userQueries.getByEmail, [email])
    return results?.rows?.[0]
}

const add = async (user: User) => {
    const results = await pool.query(userQueries.add, [
        user.first_name,
        user.last_name,
        user.email,
        user.user_password,
        user.role_id,
    ])
    return results?.rows?.[0]
}

const deleteUser = async (id: string): Promise<User> => {
    const results = await pool.query(userQueries.deleteUser, [id])
    return results?.rows?.[0]
}

const update = async (id: string, data: UserUpdate): Promise<UserUpdate> => {
    const results = await pool.query(userQueries.update, [
        id,
        data.first_name,
        data.last_name,
        data.email,
        data.user_password,
        data.role_id,
    ])
    return results?.rows?.[0]
}

export default { getAll, getById, getByEmail, add, deleteUser, update }
