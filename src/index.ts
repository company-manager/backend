import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import usersRouter from '@routes/users-routes'
import rolesRouter from '@routes/roles-routes'
import authRouter from '@routes/auth-routes'
import { authenticateToken } from '@middleware/authorization'
import swaggerConfig from '@src/swagger.json'

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.get('/', (req, res) => res.send('👋 Welcome to server'))

app.use('/api/v1/roles', authenticateToken, rolesRouter)
app.use('/api/v1/users', authenticateToken, usersRouter)
app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`))
