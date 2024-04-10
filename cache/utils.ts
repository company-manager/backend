import redisClient from 'cache/redis'

const get = async (key: string) => {
    const cachedData = await redisClient.get(key)

    if (cachedData) {
        const result = JSON.parse(cachedData)
        return result
    }

    return cachedData
}

const set = async (key: string, value: string) => {
    await redisClient.set(key, JSON.stringify(value))
}

interface Data {
    id: string
}

const update = async <T extends Data>(
    instance: string,
    companyId: string,
    data: T,
) => {
    // Update list
    const listCacheKey = `all-${instance}-${companyId}`
    updateList<T>(listCacheKey, data)

    // Update single instance
    const singleCacheKey = `${instance}-${companyId}:${
        data.id || data[`${instance}_id`]
    }`
    updateSingle<T>(singleCacheKey, data)
}

const updateSingle = <T>(key: string, data: T) => {
    const cacheData = JSON.stringify(data)
    set(key, cacheData)
}

const updateList = async <T>(key: string, data: T) => {
    const dataAlreadyCached = await get(key)
    const parsedData = JSON.parse(dataAlreadyCached)

    const updatedData = parsedData ? [...parsedData, data] : [data]
    const updatedDataCache = JSON.stringify(updatedData)

    set(key, updatedDataCache)
}

const remove = async (key: string) => {
    await redisClient.del(key)
}

export { get, set, update, remove }
