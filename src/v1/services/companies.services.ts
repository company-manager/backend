import { Company } from '@global-types/index'
import companiesRepository from '@repositories-V1/companies.repository'

const add = (company: Company) => {
    const results = companiesRepository.add(company)
    return results
}

const getById = (id: string) => {
    const results = companiesRepository.getById(id)
    return results
}

const getByTaxpayerId = (id: string) => {
    const results = companiesRepository.getByTaxpayerId(id)
    return results
}

const remove = (id: string) => {
    const results = companiesRepository.remove(id)
    return results
}

export default { add, getById, getByTaxpayerId, remove }
