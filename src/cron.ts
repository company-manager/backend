/* eslint-disable @typescript-eslint/no-unused-vars */
import cron from 'node-cron'

const EVERY_SECOND = '* * * * * *'
const EVERY_MINUTE = '* * * * *'
const EVERY_HOUR = '* 1 * * *'

const job = cron.schedule(EVERY_MINUTE, () => {
    console.log(`cron-job @ ${new Date().toLocaleString()}`)
})

export { job }
