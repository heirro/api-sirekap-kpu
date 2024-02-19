import Fastify from 'fastify'
import { result } from './src/pilpres/result.js'
import { province } from './src/pilpres/province.js'

const fastify = Fastify({
  logger: false
})

fastify.register(province)
fastify.register(result)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()