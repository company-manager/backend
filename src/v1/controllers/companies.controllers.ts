import { Request, Response } from 'express'

const getById = (req: Request, res: Response) => {
    try {
        console.log(res)
        console.log(req.params)
        res.status(200).json({ id: req.params })
    } catch (error) {
        console.log(error)
    }
}

export default { getById }
