'use strict'
import axios from 'axios'

const PASLON_KEYS = ['100025', '100026', '100027'];
const BASE_URL = 'https://sirekap-obj-data.kpu.go.id';

async function fetchProvinceData(provinceCode, provinceData) {
    const { data } = await axios.get(`${BASE_URL}/pemilu/hhcw/ppwp/${provinceCode}.json`);
    const totalVoters = data.chart ? PASLON_KEYS.reduce((sum, key) => sum + (data.chart[key] || 0), 0) : 0;
    return {
        name: provinceData.find(prov => prov.kode === provinceCode).nama,
        paslon: data.chart ? PASLON_KEYS.reduce((obj, key, index) => ({
            ...obj,
            [index + 1]: {
                voters: data.chart[key] || 0,
                percentage: totalVoters ? parseFloat(((data.chart[key] / totalVoters) * 100).toFixed(2)) : 0
            }
        }), {}) : {},
        progress: {
            current: data.progres?.['progres'] || 0,
            total: data.progres?.['total'] || 0,
            percentage: data.chart?.['persen'] || 0,
            description: `${(data.progres?.['progres'] || 0) / 1000} dari ${(data.progres?.['total'] || 0) / 1000} TPS`
        }
    };
}

export async function province(fastify, options) {
    fastify.get('/province', async (request, reply) => {
        try {
            const [{ data: provinceData }] = await Promise.all([
                axios.get(`${BASE_URL}/wilayah/pemilu/ppwp/0.json`),
            ]);

            const data = await Promise.all(provinceData.map(({ kode }) => fetchProvinceData(kode, provinceData)));

            reply.send({
                success: true,
                data,
            });
        } catch (error) {
            reply.send(error);
        }
    });
}