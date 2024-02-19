module.exports = {
	apps: [
		{
			name: 'sirekap-kpu',
			script: 'app.js',
			args: '',
			interpreter: 'node',
			instances: 'max',
			exec_mode: 'cluster',
		},
	],
};
