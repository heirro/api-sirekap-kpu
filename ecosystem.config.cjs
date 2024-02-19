module.exports = {
	apps: [{
		name: "sirekap-kpu",
		script: "app.js",
		instances: "max",
		exec_mode: "cluster"
	}]
}