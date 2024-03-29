import { Company } from '@global-types/index'
import companiesRepository from '@repositories-V1/companies.repository'

const create = async (data: Omit<Company, 'id'>) => {
    const results = await companiesRepository.create(data)
    return results
}

const getById = async (companyId: string) => {
    const results = await companiesRepository.getById(companyId)
    return results
}

const getByTaxpayerId = async (id: string) => {
    const results = await companiesRepository.getByTaxpayerId(id)
    return results
}

const remove = async (id: string) => {
    const results = await companiesRepository.remove(id)
    return results
}

export default { create, getById, getByTaxpayerId, remove }
