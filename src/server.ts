import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import usersRouter from '@src/v1/routes/users.routes'
import clientsRouter from '@src/v1/routes/clients.routes'
import authRouter from '@src/v1/routes/auth.routes'
import companiesRouter from '@src/v1/routes/companies.routes'
import projectsRouter from '@src/v1/routes/projects.routes'
import documentsRouter from '@src/v1/routes/documents.routes'
import emailMiddleware from '@middleware/email'
import { authenticateToken } from '@middleware/authorization'
import swaggerConfig from '@src/swagger.json'

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())

!process.env.NODE_ENV && app.use('/public', express.static('public'))

app.post('/email', emailMiddleware.corsEmail, emailMiddleware.send)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.get('/api', (req, res) =>
    res.status(200).json({ message: '👋 Welcome to server' }),
)

app.use('/api/v1/users', authenticateToken, usersRouter)
app.use('/api/v1/clients', authenticateToken, clientsRouter)
app.use('/api/v1/projects', authenticateToken, projectsRouter)
app.use('/api/v1/documents', authenticateToken, documentsRouter)
app.use('/api/v1/companies', companiesRouter)
app.use('/api/v1/auth', authRouter)

app.listen(PORT, () =>
    console.log(
        `🚀 Server is running on port ${PORT} on ${new Date().toLocaleString()}`,
    ),
)
