/* eslint-disable @typescript-eslint/no-unused-vars */
import usersRepository from '@repositories-V1/users.repository'
import { User, UserUpdate } from '@global-types/.'

const getAll = () => {
    const results = usersRepository.getAll()
    return results
}

const getById = (id: string) => {
    const results = usersRepository.getById(id)
    return results
}

const getByEmail = (email: string) => {
    const results = usersRepository.getByEmail(email)
    return results
}

const create = (data: User) => {
    // TODO: Validate data such as email
    const results = usersRepository.create(data)
    return results
}

const remove = (id: string) => {
    const results = usersRepository.remove(id)
    return results
}

const update = (id: string, data: UserUpdate) => {
    // TODO: Validate data
    const results = usersRepository.update(id, data)
    return results
}

export default { getAll, getById, getByEmail, create, remove, update }
