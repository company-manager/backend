import rolesRepository from '@repositories-V1/roles.repository'

const getAll = () => {
    const results = rolesRepository.getAll()
    return results
}

const getById = (id: string) => {
    const results = rolesRepository.getById(id)
    return results
}

const getByName = (name: string) => {
    const results = rolesRepository.getByName(name)
    return results
}

const add = (name: string) => {
    const results = rolesRepository.add(name)
    return results
}

const remove = (id: string) => {
    const results = rolesRepository.remove(id)
    return results
}

export default { getAll, getById, getByName, add, remove }
