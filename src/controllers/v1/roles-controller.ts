import { Request, Response } from "express";
import {
  addNewRoleQuery,
  checkIfRoleExistsByName,
  checkIfRoleExistsById,
  deleteRoleQuery,
  getAllRolesQuery,
  getRoleByIdQuery,
} from "@queries-V1/roles-queries";
import pool from "@database/.";

// 🚀 Get all roles
export const getRoles = (req: Request, res: Response) => {
  pool.query(getAllRolesQuery, (error, results) => {
    if (error) throw error;

    res.status(200).json({ code: 200, status: "OK", results: results.rows });
  });
};

// 🚀 Get role by id
export const getRoleById = (req: Request, res: Response) => {
  const id = req.params?.id;

  pool.query(getRoleByIdQuery, [id], (error, results) => {
    if (error) throw error;

    res.status(200).json({ code: 200, status: "OK", results: results.rows });
  });
};

// 🚀 Add new role
export const addRole = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  const { name } = req.body;

  // ✅ Check if role exists
  pool.query(checkIfRoleExistsByName, [name], (error, results) => {
    const hasResults = results.rows.length;

    if (error) throw error;
    if (hasResults)
      return res.status(403).json({
        code: 403,
        status: "Forbidden",
        message: "🔴 Role already exists",
      });

    pool.query(addNewRoleQuery, [name], (error) => {
      if (error) throw error;
      res
        .status(201)
        .json({ code: 201, status: "Created", message: "🟢 Role created" });
    });
  });
};

// 🛑 Delete role by id
export const deleteRoleById = (req: Request, res: Response) => {
  const { id } = req.body;

  pool.query(checkIfRoleExistsById, [id], (error, results) => {
    const hasResults = results.rows.length;

    if (error) throw error;
    if (!hasResults)
      return res.status(404).json({
        code: 404,
        status: "Not found",
        message: "🔴 Role doesn't exist",
      });

    pool.query(deleteRoleQuery, [id], (error) => {
      if (error) throw error;

      res
        .status(200)
        .send({ code: 200, status: "OK", message: "🟢 Role deleted" });
    });
  });
};
