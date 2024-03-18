/* eslint-disable @typescript-eslint/no-unused-vars */
import clientsRepository from '@repositories-V1/clients.repository'

type ClientData = {
    name: string
    taxpayer_id?: string
    address_1?: string
    address_2?: string
    city?: string
    country?: string
    phone_1?: string
    phone_2?: string
}

const getAll = (companyId: string) => {
    const results = clientsRepository.getAll(companyId)
    return results
}

const getById = (companyId: string, clientId: string) => {
    const results = clientsRepository.getById(companyId, clientId)
    return results
}

const getByTaxpayerId = (companyId: string, taxpayerId: string) => {
    const results = clientsRepository.getByTaxpayerId(companyId, taxpayerId)
    return results
}

const remove = (companyId: string, clientId: string) => {
    const results = clientsRepository.remove(companyId, clientId)
    return results
}

const add = (clientData: ClientData, companyId: string) => {
    const data = { ...clientData, companyId }
    const results = clientsRepository.add(data)
    return results
}

const update = async (
    companyId: string,
    clientId: string,
    data: Partial<ClientData>,
) => {
    const results = await clientsRepository.update(companyId, clientId, data)
    return results
}

export default { getAll, getById, getByTaxpayerId, remove, add, update }
