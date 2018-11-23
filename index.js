const WebSocket = require('ws');
var Mock = require('mockjs');

const wss = new WebSocket.Server({ port: 1757 });

function getData() {
  var data = Mock.mock({
    "status": "ok",
    "data": {
      "type": "lottery.new_lottery",
      "data": {
        "award_currency": ['ETH', 'BGG'][Mock.Random.natural(0, 1)],
        "award_amount": Mock.Random.float(0, 100),
        "award_amount_eth": Mock.Random.natural(),
        "lucky_number_start": Mock.Random.natural(0, 1000),
        "lucky_number_end": Mock.Random.natural(1000, 2000),
        "uid": 1367924704,
        "lucky_number_total": Mock.Random.natural(0, 10000),
        "total_people": Mock.Random.natural(0, 2000)
      }
    }
  })
  console.log('data', data)
  data = JSON.stringify(data)
  return data
}

wss.on('connection', function connection(ws) {

  console.log('connect being')

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  setInterval(() => {
    ws.send(getData());
  }, 5000)

});
