const TABLE_NAME = "roles";

export const getAllRolesQuery = `SELECT * FROM ${TABLE_NAME}`;
export const getRoleByIdQuery = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
export const checkIfRoleExistsByName = `SELECT r FROM ${TABLE_NAME} r WHERE r.name = $1`;
export const checkIfRoleExistsById = `SELECT r FROM ${TABLE_NAME} r WHERE r.id = $1`;
export const addNewRoleQuery = `INSERT INTO ${TABLE_NAME} (name) VALUES ($1)`;
export const deleteRoleQuery = `DELETE FROM ${TABLE_NAME} WHERE id = $1`;
