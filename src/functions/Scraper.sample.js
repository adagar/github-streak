/*
const rp = require('request-promise');
const cheerio = require('cheerio');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.allyPallyFarmersMarket = functions.https.onRequest((request, response) => {
    const topic = "allyPallyFarmersMarket"
    const url = `https://weareccfm.com/city-country-farmers-markets/market-profiles/alexandra-palace-market/`
    const options = {
        uri: url,
        headers: { 'User-Agent': 'test' },
        transform: (body) => cheerio.load(body)
    }

    rp(options)
        .then(($) => {
            const scrap = $('strong').text()
            const [location, date, address] = scrap.split("–")

            // Build message
            var message = {
                data: {
                    location: location,
                    date: date,
                    url: url
                },
                topic: topic
            };

            // Send a message to devices subscribed to the provided topic.
            admin.messaging().send(message)
                .then((res) => response
                    .status(200)
                    .type('application/json')
                    .send('-- Location: ' + location + ' -- Date: ' + date + ' -- Address: ' + address))
                .catch((error) => response.status(400).send(error))
        })
        .catch((err) => response.status(400).send(err))
});
*/
