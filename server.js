const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
	res.json({ message: 'API is working' });
});

app.get('/region', async (req, res) => {
	try {
		const ipResponse = await axios.get('https://api.ipify.org?format=json');
		const ip = ipResponse.data.ip;
		
		const regionResponse = await axios.get('http://ip-api.com/json/' + ip + '?fields=city,country,countryCode');
		const data = regionResponse.data;
		
		res.json({
			region: data.city + ', ' + data.country,
			countryCode: data.countryCode
		});
	} catch (err) {
		res.json({ region: 'Unknown', countryCode: '' });
	}
});

app.listen(3000, () => console.log('API running'));
