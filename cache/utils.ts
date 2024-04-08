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

export { get, set }
