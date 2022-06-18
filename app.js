const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.post('/', function (req, res) {
    const query = req.body.cityName;
    const apiKey = "4d6db88a02451f5898036900b7a46f48";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const w_data = JSON.parse(data);
            const temp = w_data.main.temp;
            const desc = w_data.weather[0].description;
            const img = w_data.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + img + "@2x.png";
            const img_disp = "<img src=" + imgurl + ">";
            res.write("<h1>Temperature is: " + temp + "</h1>");
            res.write("<h2>And it's " + desc + "</h2>");
            res.write(img_disp);
            res.send();
        })
    })

})
// const query = "Bengaluru";
//     const apiKey = "4d6db88a02451f5898036900b7a46f48";
//     const unit = "metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
//     https.get(url, function (response) {
//         console.log(response.statusCode);
//         response.on("data", function (data) {
//             const w_data = JSON.parse(data);
//             console.log(w_data);
//             const temp = w_data.main.temp;
//             const desc = w_data.weather[0].description;
//             const img = w_data.weather[0].icon;
//             const imgurl = "http://openweathermap.org/img/wn/" + img + "@2x.png";
//             const img_disp = "<img src=" + imgurl + ">";
//             res.write("<h1>Temperature is: " + temp + "</h1>");
//             res.write("<h2>And it's " + desc + "</h2>");
//             res.write(img_disp);
//             res.send();
//         })
//     })

app.listen(3000, function () {
    console.log("server running at port 3000");
})