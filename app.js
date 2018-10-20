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


    client.on('messages', function(data) {
		consumer.on('message', function (message) {
			val = message.value
			console.log(val);
			client.broadcast.emit('broad',val);
   			client.emit('broad', val);
		});
    });
})

server.listen(4200);
