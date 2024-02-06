const getUser = `SELECT * FROM users WHERE email = $1`

export default { getUser }
