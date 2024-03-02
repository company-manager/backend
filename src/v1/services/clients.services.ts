import clientsRepository from '@repositories-V1/clients.repository'

const getAll = () => {
    const results = clientsRepository.getAll()
    return results
}

const getById = (id: string) => {
    const results = clientsRepository.getById(id)
    return results
}

export default { getAll, getById }
