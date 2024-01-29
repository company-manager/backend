import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import usersRouter from '@src/routes/v1/users.routes'
import rolesRouter from '@src/routes/v1/roles.routes'
import authRouter from '@src/routes/v1/auth.routes'
import { authenticateToken } from '@src/middleware/authorization'
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
