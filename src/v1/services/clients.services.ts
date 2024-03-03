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

const add = (data: ClientData) => {
    const results = clientsRepository.add(data)
    return results
}

export default { getAllByCompany, getById, remove, add }
