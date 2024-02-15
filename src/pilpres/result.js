'use strict'
import axios from 'axios'

export async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        try {
            const response = await axios.get('https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json');
            const paslonDetails = await axios.get('https://sirekap-obj-data.kpu.go.id/pemilu/ppwp.json');
            const totalVoters = ['100025', '100026', '100027'].reduce((sum, key) => sum + response.data.chart[key], 0);
            const paslon = ['100025', '100026', '100027'].map((key, index) => ({
                name: paslonDetails['data'][key]['nama'],
                voters: response.data.chart[key],
                percentage: parseFloat(((response.data.chart[key] / totalVoters) * 100).toFixed(2))
            }));
            reply.send({
                success: true,
                data: {
                    timestamp: response.data.ts,
                    progress: {
                        current: response.data.progres['progres'],
                        total: response.data.progres['total'],
                        percentage: response.data.chart['persen'],
                        description: `${response.data.progres['progres'] / 1000} dari ${response.data.progres['total'] / 1000} TPS`,
                    },
                    paslon
                }
            });
        } catch (error) {
            reply.send(error);
        }
    });
}