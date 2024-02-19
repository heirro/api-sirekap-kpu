module.exports = {
	apps: [
		{
			name: 'sirekap-kpu',
			script: 'node',
			args: 'start',
			instances: 'max',
			exec_mode: 'cluster',
		},
	],
};
