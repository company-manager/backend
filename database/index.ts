import { Pool } from 'pg'
import dotenv from 'dotenv'
import { PoolType } from '@database/types'

dotenv.config()

const { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

export const dbConnection: PoolType = {
  user: DB_USER || 'nuno',
  host: DB_HOST || 'localhost',
  password: DB_PASSWORD || 'NunoLemo$51',
  database: DB_NAME || 'company_manager',
  port: DB_PORT || 5432,
}

const pool = new Pool(dbConnection)

export default pool
