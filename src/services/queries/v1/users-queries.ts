const TABLE_NAME = "users";

export const getAllUsersQuery = `SELECT * FROM ${TABLE_NAME}`;
export const getUserByIdQuery = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
export const checkIfUserExistsByEmail = `SELECT r FROM ${TABLE_NAME} r WHERE r.email = $1`;
export const checkIfUserExistsById = `SELECT r FROM ${TABLE_NAME} r WHERE r.id = $1`;
export const addNewUserQuery = `INSERT INTO ${TABLE_NAME} (first_name, last_name, email, user_password, role_id) VALUES ($1,$2,$3, crypt($4, gen_salt('bf')),$5)`;
export const deleteUserQuery = `DELETE FROM ${TABLE_NAME} WHERE id = $1`;
export const updateUserQuery = `UPDATE ${TABLE_NAME} SET 
    first_name = COALESCE(NULLIF($2, ''), first_name),
    last_name = COALESCE(NULLIF($3, ''), last_name),
    email = COALESCE(NULLIF($4, ''), email),
    user_password = COALESCE(NULLIF(crypt($5, gen_salt('bf')), ''), user_password),
    role_id = COALESCE($6, role_id)
    WHERE id = $1
`;
