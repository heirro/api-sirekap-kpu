import Fastify from 'fastify'
import { result } from './src/pilpres/result.js'
import { province } from './src/pilpres/province.js'

const fastify = Fastify({
  logger: false
})

fastify.get('/loaderio-88f18b6967d301353c4b45fbf3a5e09e.txt', async (request, reply) => {
  reply.send('loaderio-88f18b6967d301353c4b45fbf3a5e09e')
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