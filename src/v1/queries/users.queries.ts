/**
 *
 * @param $[number] ($1) represents the values for querying
 * @param _$[number] (_$1) represents the values from query parameters
 *
 */

const TABLE_NAME = 'users'

const getAll = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1 ORDER BY _$1 _$2`
const getById = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1 AND id = $2`
const getByEmail = `SELECT * FROM ${TABLE_NAME} WHERE email = $1`
const verifyById = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`
const create = `INSERT INTO ${TABLE_NAME} 
    (first_name, last_name, email, user_password, role_id, is_verified, terms_accepted, verification_token, company_id) 
    VALUES 
    ($1, $2, $3, crypt($4, gen_salt('bf')), $5, COALESCE($6, FALSE), $7, $8, $9) 
    RETURNING *
`
const update = `UPDATE ${TABLE_NAME} SET 
    first_name = COALESCE(NULLIF($3, ''), first_name),
    last_name = COALESCE(NULLIF($4, ''), last_name),
    email = COALESCE(NULLIF($5, ''), email),
    user_password = COALESCE(NULLIF(crypt($6, gen_salt('bf')), ''), user_password),
    role_id = COALESCE($7, role_id),
    is_verified = COALESCE($8, is_verified),
    terms_accepted = COALESCE($9, terms_accepted),
    verification_token = COALESCE(NULLIF($10, ''), verification_token)
    WHERE company_id = $1 AND id = $2
    RETURNING *
`
const updateById = `UPDATE ${TABLE_NAME} SET 
    first_name = COALESCE(NULLIF($2, ''), first_name),
    last_name = COALESCE(NULLIF($3, ''), last_name),
    email = COALESCE(NULLIF($4, ''), email),
    user_password = COALESCE(NULLIF(crypt($5, gen_salt('bf')), ''), user_password),
    role_id = COALESCE($6, role_id),
    is_verified = COALESCE($7, is_verified),
    terms_accepted = COALESCE($8, terms_accepted),
    verification_token = COALESCE(NULLIF($9, ''), verification_token)
    WHERE id = $1
    RETURNING *
`
const remove = `DELETE FROM ${TABLE_NAME} WHERE company_id = $1 AND id = $2 RETURNING *`

export default {
    getAll,
    getById,
    getByEmail,
    verifyById,
    create,
    update,
    updateById,
    remove,
}
