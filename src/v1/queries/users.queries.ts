const TABLE_NAME = 'users'

const getAll = `SELECT * FROM ${TABLE_NAME}`
const getById = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`
const getByEmail = `SELECT * FROM ${TABLE_NAME} WHERE email = $1`
const checkById = `SELECT r FROM ${TABLE_NAME} r WHERE r.id = $1`
const create = `INSERT INTO ${TABLE_NAME} (first_name, last_name, email, user_password, role_id) VALUES ($1,$2,$3, crypt($4, gen_salt('bf')),$5) RETURNING *`
const remove = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`
const update = `UPDATE ${TABLE_NAME} SET 
    first_name = COALESCE(NULLIF($2, ''), first_name),
    last_name = COALESCE(NULLIF($3, ''), last_name),
    email = COALESCE(NULLIF($4, ''), email),
    user_password = COALESCE(NULLIF(crypt($5, gen_salt('bf')), ''), user_password),
    role_id = COALESCE($6, role_id)
    WHERE id = $1
    RETURNING *
`

export default {
    getAll,
    getById,
    getByEmail,
    checkById,
    create,
    remove,
    update,
}
