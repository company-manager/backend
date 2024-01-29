/* eslint-disable camelcase */
import { Request, Response } from 'express'
import {
  addNewUserQuery,
  checkIfUserExistsByEmail,
  checkIfUserExistsById,
  deleteUserQuery,
  getAllUsersQuery,
  getUserByIdQuery,
  updateUserQuery,
} from '@queries/v1/users-queries'
import pool from '@database/index'

const DEFAULT_ROLE_ID = 3

// 🚀 Get all users
export const getUsers = (req: Request, res: Response) => {
  pool.query(getAllUsersQuery, (error, results) => {
    if (error) throw error

    res.status(200).json({ code: 200, status: 'OK', results: results.rows })
  })
}

// 🚀 Get user by id
export const getUserById = (req: Request, res: Response) => {
  const id = req.params.id
  console.log(typeof id)

  try {
    pool.query(getUserByIdQuery, [id], (error, results) => {
      if (!results)
        return res.status(404).json({
          code: 404,
          status: 'Not found',
          message: '🔴 Parameter id not found',
        })
      if (error) throw error

      res.status(200).json({ code: 200, status: 'OK', results: results.rows })
    })
  } catch (error) {
    res.status(401).json({
      code: 401,
      status: 'Unauthorized',
      message: '🔴 Something went wrong',
    })
  }
}

// 🚀 Add new user
export const addUser = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  const { first_name, last_name, email, user_password, role_id } = req.body.user

  // ✅ Check if user exists
  pool.query(checkIfUserExistsByEmail, [email], (error, results) => {
    const hasResults = results?.rows?.length

    if (error) throw error
    if (hasResults)
      return res.status(403).json({
        code: 403,
        status: 'Forbidden',
        message: '🔴 User already exists',
      })

    pool.query(
      addNewUserQuery,
      [first_name, last_name, email, user_password, role_id || DEFAULT_ROLE_ID],
      (error) => {
        if (error) throw error
        res
          .status(201)
          .send({ code: 201, status: 'Created', message: '🟢 User created' })
      },
    )
  })
}

// 🛑 Delete user by id
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.body.user

  pool.query(checkIfUserExistsById, [id], (error, results) => {
    const hasResults = results.rows.length

    if (error) throw error
    if (!hasResults)
      return res.status(403).json({
        code: 403,
        status: 'Forbidden',
        message: "🔴 User doesn't exists",
      })

    pool.query(deleteUserQuery, [id], (error) => {
      if (error) throw error

      res
        .status(200)
        .send({ code: 200, status: 'OK', message: '🟢 User deleted' })
    })
  })
}

// Update user data
export const updateUser = (req, res) => {
  const { id } = req.params
  const { first_name, last_name, email, user_password, role_id } =
    req.body?.user || {}
  const hasValidData = req.body.user && Object.keys(req.body.user)?.length > 0

  if (!hasValidData)
    return res.status(400).send({
      code: 400,
      status: 'Bad request',
      message: '🔴 Request body must include user data.',
    })

  pool.query(
    updateUserQuery,
    [id, first_name, last_name, email, user_password, role_id],
    (error) => {
      if (error) throw error

      res
        .status(200)
        .send({ code: 200, status: 'OK', message: '🟢 User updated' })
    },
  )
}
