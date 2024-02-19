module.exports = {
	apps: [
		{
			name: 'sirekap-kpu',
			script: 'npm',
			args: 'run start',
			instances: 'max',
			exec_mode: 'cluster',
		},
	],
};
