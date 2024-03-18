const TABLE_NAME = 'clients'
const JUNCTION_TABLE = 'company_client'

const getAll = `SELECT * FROM ${TABLE_NAME}`
const getById = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`
const getOneByCompany = `SELECT * FROM ${TABLE_NAME} JOIN ${JUNCTION_TABLE} ON clients.id = company_client.client_id WHERE company_id = $1 AND client_id = $2`
const getManyByCompany = `SELECT * FROM ${TABLE_NAME} JOIN ${JUNCTION_TABLE} ON clients.id = company_client.client_id WHERE company_id = $1`
const add = `INSERT INTO ${TABLE_NAME} (client_name, taxpayer_id) VALUES ($1, $2) RETURNING *`
const addToJunction = `INSERT INTO ${JUNCTION_TABLE} (company_id, client_id) VALUES ($1, $2) RETURNING *`
const remove = `DELETE FROM ${JUNCTION_TABLE} WHERE company_id = $1 AND client_id = $2 RETURNING *`
const getByTaxpayerId = `SELECT * FROM ${TABLE_NAME} WHERE taxpayer_id = $1`
const getRelation = `SELECT * FROM ${JUNCTION_TABLE} WHERE company_id = $1 AND client_id = $2`

export default {
    getAll,
    getById,
    getOneByCompany,
    getManyByCompany,
    getByTaxpayerId,
    getRelation,
    remove,
    add,
    addToJunction,
}
