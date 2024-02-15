import Fastify from 'fastify'
import { routes } from './src/pilpres/result.js'

const fastify = Fastify({
  logger: false
})

fastify.get('/loaderio-88f18b6967d301353c4b45fbf3a5e09e.txt', async (request, reply) => {
  reply.send('loaderio-88f18b6967d301353c4b45fbf3a5e09e')
})

fastify.register(routes)

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