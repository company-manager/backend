const TABLE_NAME = 'roles'

export const getAll = `SELECT * FROM ${TABLE_NAME}`
export const getById = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`
export const getByName = `SELECT r FROM ${TABLE_NAME} r WHERE r.name = $1`
export const add = `INSERT INTO ${TABLE_NAME} (name) VALUES ($1) RETURNING *`
export const remove = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`

export default { getAll, getById, getByName, add, remove }
