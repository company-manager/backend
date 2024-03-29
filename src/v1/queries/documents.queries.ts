const TABLE_NAME = 'documents'

const getAll = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1`
const getById = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1 AND id = $2`
const create = `INSERT INTO ${TABLE_NAME} (author_id, company_id, title, body)
    VALUES
    ($1, $2, $3, NULLIF($4, NULL))
    RETURNING *
`
const update = `UPDATE ${TABLE_NAME} SET
    author_id = COALESCE($3, author_id),
    title = COALESCE($4, title),
    body = COALESCE($5, body),
    edited_at = current_timestamp
    WHERE company_id = $1 AND id = $2
    RETURNING *
`
const remove = `DELETE FROM ${TABLE_NAME} 
    WHERE company_id = $1 AND id = $2 
    RETURNING *
`

export default { getAll, getById, create, update, remove }
