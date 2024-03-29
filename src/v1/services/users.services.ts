/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@global-types/.'
import usersRepository from '@repositories-V1/users.repository'
import { generateToken } from '@utils/index'
import { Params } from '@utils/params'

const getAll = async (companyId: string, queryParams: Params) => {
    const results = await usersRepository.getAll(companyId, queryParams)
    return results
}

const getById = async (companyId: string, userId: string) => {
    const results = await usersRepository.getById(companyId, userId)
    return results
}

const getByEmail = async (email: string) => {
    const results = await usersRepository.getByEmail(email)
    return results
}

const verifyById = async (userId: string) => {
    const results = await usersRepository.verifyById(userId)
    return results
}

const create = async (
    companyId: string,
    data: Omit<User, 'id' | 'company_id'>,
) => {
    const token = generateToken()
    const results = await usersRepository.create(companyId, {
        ...data,
        verification_token: token,
    })
    return results
}

const update = async (
    companyId: string,
    userId: string,
    data: Partial<User>,
) => {
    const results = await usersRepository.update(companyId, userId, data)
    return results
}

const updateById = async (userId: string, data: Partial<User>) => {
    const results = await usersRepository.updateById(userId, data)
    return results
}

const remove = async (companyId: string, userId: string) => {
    const results = await usersRepository.remove(companyId, userId)
    return results
}

export default {
    getAll,
    getById,
    getByEmail,
    verifyById,
    create,
    update,
    updateById,
    remove,
}
