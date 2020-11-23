var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');
const data = require('./chargingStations.json');


var router = Router();
router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Welcome at Green Globe !! \n\nTo know more about the current store please follow this path: /tenant/greenglobe/store/bangalore \nTo check the status of the charging stations at your desired time of the day follow this path: /tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/status/:time \nIn order to get the detailed information about the next events for the day please follow this path: /tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/nextevent/:time');
})

/* Store Information */

router.get('/tenant/greenglobe/store/bangalore', function(req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Information page Green Globe, Bangalore \n\nGreen Globe, leading supermarket chain since 1995. From apparel to fresh farm veggie, you can buy everything at Green Globe.To stay up to date with deals and promotions at Green Globe Bangalore, subscribe to our newsletter. \n\nWhile shopping at Green Globe Bangalore, you can charge your vehicle at our charging station free of charge. \n\nfollow this path to check the status of the charging stations for the current day: /tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/status/:time \nFor the details about upcoming events, please follow the following path: /tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/nextevent/:time');
})

/* Status of the chargingstation */

router.get('/tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/status/:time', function(req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    var response = 'Welcome at Green Globe charging service. \n\nAt the moment we have 2 charging stations at our store. \n\nIn order to check the status of your desired charging station for the current day, simply enter the charging station number (either 1 or 2) as well as the time (in 24-hour notation) that you wish to charge your vehicle in the path ex:/tenant/greenglobe/store/bangalore/chargingstation/1/status/0800 . \n\ncharging station that you are requesting for: ' + req.params.chargingstation + ' \nYour desired time: ' + req.params.time + '\nStatus: ';
    var checkNextEvent = '\n\nIn order to get the detailed information about the next events for the day please follow this path: /tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/nextevent/:time'

    var chargingStationName = req.params.chargingstation;
    var acceptedTime = req.params.time;
    var date = new Date();
    var day = date.getDay();
    var isOpen = false;

    var chargingStations = (data.tenants[0].stores[0]['charging_station']);
    for (var i = 0; i < chargingStations.length; i++) {
        if (chargingStations[i].name === chargingStationName) {
            var ChargingStationsTime = chargingStations[i].open_hours[day].times;
            for (var j = 0; j < ChargingStationsTime.length; j++) {
                var chargingStationOpen = ChargingStationsTime[j].open;
                var chargingStationClose = ChargingStationsTime[j].close;
                if (acceptedTime >= chargingStationOpen && acceptedTime < chargingStationClose && acceptedTime !== "0000") {
                    isOpen = true;
                }
            }
        }
    }
    res.end(response + " " + isOpen + checkNextEvent);
})

/* Next event with a time stamp */

router.get('/tenant/greenglobe/store/bangalore/chargingstation/:chargingstation/nextevent/:time', function(req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    var response = 'Green Globe Bangalore Charging service !! \n\nThank you for your interest in getting a deatiled information of the next events for the current day. \n\nIn order to check the next event of your desired charging station for the current day simply enter the charging station number (either 1 or 2) as well as the time (in 24-hour notation) that you wish to charge your vehicle in the path ex: /tenant/greenglobe/store/bangalore/chargingstation/1/nextevent/0800 . \n\ncharging station that you are requesting for: ' + req.params.chargingstation + ' \n\nYour desired time: ' + req.params.time + '\n\nNext event: ';

    var chargingStationName = req.params.chargingstation;
    var acceptedTime = req.params.time;
    var date = new Date();
    var day = date.getDay();

    var chargingStations = (data.tenants[0].stores[0]['charging_station']);
    for (var i = 0; i < chargingStations.length; i++) {
        if (chargingStations[i].name === chargingStationName) {
            var ChargingStationsTime = chargingStations[i].open_hours[day].times;
            for (var j = 0; j < ChargingStationsTime.length; j++) {
                var chargingStationOpen = ChargingStationsTime[j].open;
                var chargingStationClose = ChargingStationsTime[j].close;               
                if (chargingStationOpen - acceptedTime > 0) {
                    var nextEvent = 'opening at ' + chargingStationOpen;
                    break;
                } else if (chargingStationClose - acceptedTime > 0) {
                    var nextEvent = 'Closing at ' + chargingStationClose;
                    break;
                } else {
                    var nextDay = (day + 1) % 7;
                    var dayAfter = nextDay + 1;
                    var nextOpeningTime = chargingStations[i].open_hours[nextDay].times[0].open;
                    var dayAfterOpeningTime = chargingStations[i].open_hours[dayAfter].times[0].open;
                    if (nextOpeningTime !== "0000") {
                        var nextEvent = 'Charging stations are now closed, opens again tomorrow at: ' + nextOpeningTime;
                    } else {
                        var nextEvent = 'Charging stations are now closed, opens again on Monday at: ' + dayAfterOpeningTime;
                    }
                }
            }
        }
    }
    res.end(response + nextEvent);
})


var server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res));
})

server.listen(8080);
