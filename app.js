// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const https = require('https');
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(client,
        [{ topic: 'test', offset: 0}],
        {
            autoCommit: false
        }
    );

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
	        console.log(data);
	});

	consumer.on('message', function (message) {
		console.log('consumer message');
    	console.log(message);
	});

    client.on('messages', function(data) {
		consumer.on('message', function (message) {
			client.broadcast.emit('broad',data);
   			client.emit('broad', data);
		});
    });
})

server.listen(4200);
