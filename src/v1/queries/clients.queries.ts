const TABLE_NAME = 'clients'

const getAll = `SELECT * FROM ${TABLE_NAME}`
const getById = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`

export default { getAll, getById }
