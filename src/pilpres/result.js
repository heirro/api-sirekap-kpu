'use strict'

import axios from 'axios'

export async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        await axios.get('https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json')
            .then(response => {
                reply.send({
                    success: true,
                    data: {
                        timestamp: response.data.ts,
                        paslon: {
                            1: {
                                name: 'H. ANIES RASYID BASWEDAN, Ph.D. - Dr. (H.C.) H. A. MUHAIMIN ISKANDAR',
                                voters: response.data.chart['100025']
                            },
                            2: {
                                name: 'H. PRABOWO SUBIANTO - GIBRAN RAKABUMING RAKA',
                                voters: response.data.chart['100026']
                            },
                            3: {
                                name: 'H. GANJAR PRANOWO, S.H., M.I.P. - Prof. Dr. H. M. MAHFUD MD',
                                voters: response.data.chart['100027']
                            }
                        },
                        progress: {
                            remark: "current dan total yang menunjukkan jumlah TPS yang sudah input real data dan total TPS yang ada.",
                            current: response.data.progres['progres'],
                            total: response.data.progres['total'],
                            percentage: response.data.chart['persen']
                        }
                    }
                })
            })
            .catch(error => {
                reply.send(error)
            })
    })
}