/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from '@global-types/index'
import clientsRepository from '@repositories-V1/clients.repository'

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

const create = (companyId: string, data: Omit<Client, 'id' | 'company_id'>) => {
    const results = clientsRepository.create(companyId, data)
    return results
}

const update = (companyId: string, clientId: string, data: Partial<Client>) => {
    const results = clientsRepository.update(companyId, clientId, data)
    return results
}

const remove = (companyId: string, clientId: string) => {
    const results = clientsRepository.remove(companyId, clientId)
    return results
}

export default { getAll, getById, getByTaxpayerId, create, update, remove }
