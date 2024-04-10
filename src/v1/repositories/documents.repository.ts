/* eslint-disable camelcase */
import pool from '@database/index'
import { Document } from '@global-types/index'
import documentsQueries from '@v1/queries/documents.queries'
import {
    get,
    set,
    update as updateCache,
    remove as deleteCache,
} from 'cache/utils'

const getAll = async (companyId: string) => {
    try {
        const cacheKey = `all-documents-${companyId}`
        const cache = await get(cacheKey)

        if (!cache) {
            const result = await pool.query(documentsQueries.getAll, [
                companyId,
            ])
            const results: Document[] = result.rows
            const documentsCache = JSON.stringify(results)
            set(cacheKey, documentsCache)

            return { results }
        }

        const results: Document[] = JSON.parse(cache)

        return { results }
    } catch (error) {
        return { error }
    }
}

const getById = async (companyId: string, documentId: string) => {
    try {
        const cacheKey = `document-${companyId}:${documentId}`
        const cache = await get(cacheKey)

        if (!cache) {
            const result = await pool.query(documentsQueries.getById, [
                companyId,
                documentId,
            ])
            const results: Document = result.rows[0]
            const documentsCache = JSON.stringify(results)
            set(cacheKey, documentsCache)

            return { results }
        }

        const results: Document = JSON.parse(cache)

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

        updateCache<Document>('document', companyId, results)

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

        updateCache<Document>('document', companyId, results)

        return { results }
    } catch (error) {
        return { error }
    }
}

const remove = async (companyId: string, documentId: string) => {
    try {
        const cacheKey = `document-${companyId}:${documentId}`
        const result = await pool.query(documentsQueries.remove, [
            companyId,
            documentId,
        ])

        const results: Document = result.rows[0]

        deleteCache(cacheKey)

        return { results }
    } catch (error) {
        return { error }
    }
}

export default { getAll, getById, create, update, remove }
