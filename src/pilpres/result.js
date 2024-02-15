'use strict'
import axios from 'axios'

export async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        await axios.get('https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json')
            .then(response => {
                let totalVoters = response.data.chart['100025'] + response.data.chart['100026'] + response.data.chart['100027']
                let percentageVoters = {
                    1: (response.data.chart['100025']) / totalVoters * 100,
                    2: (response.data.chart['100026']) / totalVoters * 100,
                    3: (response.data.chart['100027']) / totalVoters * 100
                }
                reply.send({
                    success: true,
                    data: {
                        timestamp: response.data.ts,
                        progress: {
                            current: response.data.progres['progres'],
                            total: response.data.progres['total'],
                            percentage: response.data.chart['persen'],
                            description: response.data.progres['progres'] / 1000 + ' dari ' + response.data.progres['total'] /1000 + ' TPS',
                        },
                        paslon: {
                            1: {
                                name: 'H. ANIES RASYID BASWEDAN, Ph.D. - Dr. (H.C.) H. A. MUHAIMIN ISKANDAR',
                                voters: response.data.chart['100025'],
                                percentage: parseFloat(percentageVoters[1].toFixed(2))
                            },
                            2: {
                                name: 'H. PRABOWO SUBIANTO - GIBRAN RAKABUMING RAKA',
                                voters: response.data.chart['100026'],
                                percentage: parseFloat(percentageVoters[2].toFixed(2))
                            },
                            3: {
                                name: 'H. GANJAR PRANOWO, S.H., M.I.P. - Prof. Dr. H. M. MAHFUD MD',
                                voters: response.data.chart['100027'],
                                percentage: parseFloat(percentageVoters[3].toFixed(2))
                            }
                        }
                    }
                })
            })
            .catch(error => {
                reply.send(error)
            })
    })
}