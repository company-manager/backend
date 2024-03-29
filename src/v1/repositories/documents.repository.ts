/* eslint-disable camelcase */
import pool from '@database/index'
import { Document } from '@global-types/index'
import documentsQueries from '@queries-V1/documents.queries'

const getAll = async (companyId: string) => {
    try {
        const result = await pool.query(documentsQueries.getAll, [companyId])
        const results: Document[] = result.rows

        return { results }
    } catch (error) {
        return { error }
    }
}

const getById = async (companyId: string, documentId: string) => {
    try {
        const result = await pool.query(documentsQueries.getById, [
            companyId,
            documentId,
        ])
        const results: Document = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const create = async (
    companyId: string,
    data: Omit<Document, 'id' | 'company_id'>,
) => {
    try {
        const { author_id, title, body } = data
        const result = await pool.query(documentsQueries.create, [
            author_id,
            companyId,
            title,
            body,
        ])

        const results: Document = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const update = async (
    companyId: string,
    documentId: string,
    data: Partial<Document>,
) => {
    try {
        const { author_id, title, body } = data
        const result = await pool.query(documentsQueries.update, [
            companyId,
            documentId,
            author_id || null,
            title,
            body,
        ])

        const results: Document = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

const remove = async (companyId: string, documentId: string) => {
    try {
        const result = await pool.query(documentsQueries.remove, [
            companyId,
            documentId,
        ])

        const results: Document = result.rows[0]

        return { results }
    } catch (error) {
        return { error }
    }
}

export default { getAll, getById, create, update, remove }
