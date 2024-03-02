import { Request, Response } from 'express'
import clientsServices from '@services-V1/clients.services'
import responses from '@src/helpers/responses'

const getAll = async (req: Request, res: Response) => {
    try {
        const results = await clientsServices.getAll()

        if (!results) {
            return res.status(403).json({
                ...responses.forbidden,
                message: 'No results',
            })
        }

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(req.params)
        const results = await clientsServices.getById(id)

        if (!results) {
            return res.status(400).json({ code: 400, message: 'Bad request' })
        }

        return res.status(200).json({ ...responses.ok, results })
    } catch (error) {
        console.log(error)
    }
}

export default { getAll, getById }
