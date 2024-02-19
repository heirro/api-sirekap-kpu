module.exports = {
	apps: [
		{
			name: 'sirekap-kpu',
			script: '/var/www/api-sirekap-kpu/app.js',
			args: '',
			interpreter: 'node',
			instances: 'max',
			exec_mode: 'cluster',
		},
	],
};
