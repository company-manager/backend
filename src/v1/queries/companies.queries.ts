const TABLE_NAME = 'companies'

const getById = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`
const getByTaxpayerId = `SELECT * FROM ${TABLE_NAME} WHERE taxpayer_id = $1`
const add = `INSERT INTO ${TABLE_NAME} (company_name, taxpayer_id) VALUES ($1, $2) RETURNING *`
const remove = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`

export default { getById, getByTaxpayerId, add, remove }
