const express = require('express');
const axios = require('axios');
const app = express();

app.get('/region', async (req, res) => {
	try {
		// Get the IP of whoever is making the request (the Roblox server)
		let serverIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		
		// Clean up the IP (remove IPv6 prefix if present)
		if (serverIp.startsWith('::ffff:')) {
			serverIp = serverIp.substring(7);
		}
		
		// Look up the region using that IP
		const regionResponse = await axios.get(`http://ip-api.com/json/${serverIp}?fields=city,region,country,countryCode`);
		const data = regionResponse.data;
		
		res.json({
			region: data.city + ', ' + data.region + ', ' + data.country,
			countryCode: data.countryCode
		});
	} catch (err) {
		res.json({ region: 'Unknown', countryCode: '' });
	}
});

app.listen(3000, () => console.log('API running'));
