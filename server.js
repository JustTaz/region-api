const express = require('express');
const axios = require('axios');
const app = express();

app.get('/region', async (req, res) => {
	try {
		// Get the Roblox server IP from the query parameter
		const serverIp = req.query.ip;
		
		if (!serverIp) {
			return res.json({ region: 'Unknown', countryCode: '' });
		}
		
		// Look up the region using the Roblox server's IP
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
