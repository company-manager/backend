import { createClient } from 'redis/dist/index'

const redisClient = createClient()
;(async () => {
    redisClient.on('error', (err) => console.log('Error ' + err))

    await redisClient.connect()
    console.log('📚 Redis is ready')
})()

export default redisClient
