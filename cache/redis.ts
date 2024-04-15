import { createClient } from 'redis/dist/index'

const DEFAULT_PORT = 6379
const redisClient = createClient()
;(async () => {
    redisClient.on('error', (err) => console.log('Error ' + err))

    await redisClient.connect()
    console.log(
        `📚 Redis is ready on port ${DEFAULT_PORT} on ${new Date().toLocaleString()}`,
    )
})()

export default redisClient
