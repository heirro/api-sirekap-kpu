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
                percentage: totalVoters ? parseFloat(((data.chart[key] || 0 / totalVoters) * 100).toFixed(2)) : 0
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

export async function result(fastify, options) {
    fastify.get('/', async (request, reply) => {
        try {
            const [{ data: provinceData }, { data: responseData }, { data: paslonDetails }] = await Promise.all([
                axios.get(`${BASE_URL}/wilayah/pemilu/ppwp/0.json`),
                axios.get(`${BASE_URL}/pemilu/hhcw/ppwp.json`),
                axios.get(`${BASE_URL}/pemilu/ppwp.json`)
            ]);

            const totalVoters = PASLON_KEYS.reduce((sum, key) => sum + responseData.chart[key], 0);
            const paslon = PASLON_KEYS.reduce((obj, key, index) => ({
                ...obj,
                [index + 1]: {
                    name: paslonDetails[key]['nama'],
                    voters: responseData.chart[key],
                    percentage: parseFloat(((responseData.chart[key] / totalVoters) * 100).toFixed(2))
                }
            }), {});

            const province = await Promise.all(provinceData.map(({ kode }) => fetchProvinceData(kode, provinceData)));

            reply.send({
                success: true,
                data: {
                    timestamp: responseData.ts,
                    progress: {
                        current: responseData.progres['progres'],
                        total: responseData.progres['total'],
                        percentage: responseData.chart['persen'],
                        description: `${responseData.progres['progres'] / 1000} dari ${responseData.progres['total'] / 1000} TPS`,
                    },
                    paslon,
                    province,
                }
            });
        } catch (error) {
            reply.send(error);
        }
    });
}