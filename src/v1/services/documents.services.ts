import { Document } from '@global-types/index'
import documentsRepository from '@repositories-V1/documents.repository'

const getAll = async (companyId: string) => {
    const results = await documentsRepository.getAll(companyId)
    return results
}

const getById = async (companyId: string, documentId: string) => {
    const results = await documentsRepository.getById(companyId, documentId)
    return results
}

const create = async (
    companyId: string,
    data: Omit<Document, 'id' | 'company_id'>,
) => {
    const results = await documentsRepository.create(companyId, data)
    return results
}

const update = async (
    companyId: string,
    documentId: string,
    data: Partial<Document>,
) => {
    const results = await documentsRepository.update(
        companyId,
        documentId,
        data,
    )
    return results
}

const remove = async (companyId: string, documentId: string) => {
    const results = await documentsRepository.remove(companyId, documentId)
    return results
}

export default { getAll, getById, create, update, remove }
