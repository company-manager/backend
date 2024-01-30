/* eslint-disable @typescript-eslint/no-unused-vars */
import userRepository from '@src/v1/repositories/users.repository'
import { User, UserUpdate } from '@global-types/.'

const getAll = () => {
    const results = userRepository.getAll()
    return results
}

const getById = (id: string) => {
    const results = userRepository.getById(id)
    return results
}

const getByEmail = (email: string) => {
    const results = userRepository.getByEmail(email)
    return results
}

const add = (data: User) => {
    // TODO: Validate data such as email
    const results = userRepository.add(data)
    return results
}

const deleteUser = (id: string) => {
    const results = userRepository.deleteUser(id)
    return results
}

const update = (id: string, data: UserUpdate) => {
    // TODO: Validate data
    const results = userRepository.update(id, data)
    return results
}

export default { getAll, getById, getByEmail, add, deleteUser, update }
