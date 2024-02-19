module.exports = {
	apps: [
		{
			name: 'sirekap-kpu',
			script: './node_modules/.bin/next',
			args: 'start',
			instances: 'max',
			exec_mode: 'cluster',
		},
	],
};
