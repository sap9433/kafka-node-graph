var kafka = require('kafka-node');
var Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);

    producer.on('ready', function () {
    console.log('Producer is ready');
        data = {"bpi":{"USD":{"code":"USD","rate_float":6420.5275},"GBP":{"code":"GBP","rate_float":4911.6714}}}

        setInterval(function(){
            let copy = data;
            copy.bpi.USD.rate_float = copy.bpi.USD.rate_float + Math.random()*100;
            copy.bpi.GBP.rate_float = copy.bpi.GBP.rate_float + Math.random()*100
            payloads = [
                { topic: 'test', messages:JSON.stringify(copy) , partition: 0 }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data)
            });
        }, 1000);

});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
});


