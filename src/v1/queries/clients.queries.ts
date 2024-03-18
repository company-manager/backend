const TABLE_NAME = 'clients'

const getAll = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1`
const getOneByCompany = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1 AND client_id = $2`
const remove = `DELETE FROM ${TABLE_NAME} WHERE company_id = $1 AND client_id = $2 RETURNING *`
const getByTaxpayerId = `SELECT * FROM ${TABLE_NAME} WHERE company_id = $1 AND taxpayer_id = $2`
const add = `INSERT INTO ${TABLE_NAME} (name, company_id, taxpayer_id, address_1, address_2, city, country, phone_1, phone_2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
const update = `UPDATE ${TABLE_NAME} SET 
    name = COALESCE(NULLIF($3, ''), name),
    taxpayer_id = COALESCE(NULLIF($4, ''), taxpayer_id),
    address_1 = COALESCE(NULLIF($5, ''), address_1),
    address_2 = COALESCE(NULLIF($6, ''), address_2),
    city = COALESCE(NULLIF($7, ''), city),
    country = COALESCE(NULLIF($8, ''), country),
    phone_1 = COALESCE(NULLIF($9, ''), phone_1),
    phone_2 = COALESCE(NULLIF($10, ''), phone_2) 
    WHERE company_id = $1 AND client_id = $2
    RETURNING *
`

export default {
    getAll,
    getOneByCompany,
    getByTaxpayerId,
    remove,
    add,
    update,
}
