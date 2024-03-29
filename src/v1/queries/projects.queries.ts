const TABLE_NAME = 'projects'

const getAll = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1`
const getById = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1 AND id = $2`
const create = `INSERT INTO ${TABLE_NAME} (project_name, status_id, company_id, client_id, user_id)
VALUES
($1, COALESCE($2, 1), $3, $4, $5)
RETURNING *`
const update = `UPDATE ${TABLE_NAME} SET 
    project_name = COALESCE(NULLIF($2, ''), project_name),
    status_id = COALESCE(NULLIF($3, status_id), status_id),
    company_id = $4,
    client_id = NULLIF(client_id, $5),
    user_id = NULLIF(user_id, $6)
    WHERE id = $1
    RETURNING *
`
const remove = `DELETE FROM ${TABLE_NAME} WHERE company_id = $1 AND id = $2 RETURNING *`

export default { getAll, getById, create, update, remove }
