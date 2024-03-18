/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEmpty } from '@utils/index'
import clientsRepository from '@repositories-V1/clients.repository'

type ClientData = {
    name: string
    taxpayer_id: string
}

const getAllByCompany = (companyId: string) => {
    const results = clientsRepository.getAllByCompany(companyId)
    return results
}

const getById = (companyId: string, clientId: string) => {
    const results = clientsRepository.getById(companyId, clientId)
    return results
}

const remove = (companyId: string, clientId: string) => {
    const results = clientsRepository.remove(companyId, clientId)
    return results
}

const add = async (clientData: ClientData, companyId: string) => {
    const client = await clientsRepository.getByTaxpayerId(
        clientData.taxpayer_id,
    )
    const clientAlreadyExists = !isEmpty(client)

    if (clientAlreadyExists) {
        const { id: clientId } = client
        const relation = await clientsRepository.getRelation(
            companyId,
            clientId,
        )
        const clientHasRelationWithCompany = !isEmpty(relation)

        if (clientHasRelationWithCompany) {
            const results = {
                failed: true,
                message: 'Client already exists in company scope',
            }
            return results
        }

        const results = await clientsRepository.addRelationWithCompany(
            companyId,
            clientId,
        )

        return results
    }

    const newClient = await clientsRepository.add(clientData)
    const { id: clientId } = newClient
    const results = await clientsRepository.addRelationWithCompany(
        companyId,
        clientId,
    )
    return results
}

export default { getAllByCompany, getById, remove, add }
