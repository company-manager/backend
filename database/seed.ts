import fs from 'fs'
import { Pool } from 'pg'
import dotenv from 'dotenv'
import { dbConnection } from '@database/.'

dotenv.config()

const pool = new Pool(dbConnection)
const seedFile = process.env.DB_SEED_FILE || 'dev-seed'

const seedQuery = fs.readFileSync(`database/seed/${seedFile}.sql`, {
    encoding: 'utf8',
})

pool.query(seedQuery, (error) => {
    if (error) throw error

    console.log('🌱 Database seeded')
    pool.end()
})
