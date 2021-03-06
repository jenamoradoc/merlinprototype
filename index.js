const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 80))

const REQUIRE_AUTH = false
const AUTH_TOKEN = 'an-example-token'

app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  /*
  if(req.body.result.action == 'welcome'){
    axios.get(
           'https://dev23543.service-now.com/api/203134/ams/getinicidentlist'
    ).then((data)=>{
           console.log("Your Data",data)
           res.status(200).json({
             source: 'Merlin',
             speech: 'Hi! Tickets: ' + JSON.stringify(data.data),
             displayText: 'webhookReply'
           })
    }).catch((e)=>{
           console.log("error",e.toString());
    });
  }*/

  switch(req.body.result.action){
    case 'welcome':
      axios.get(
           'https://dev23543.service-now.com/api/203134/ams/getinicidentlist'
    ).then((data)=>{
           console.log("Your Data",data)
           res.status(200).json({
             source: 'Merlin',
             speech: 'Hi! Tickets: ' + JSON.stringify(data.data),
             displayText: 'webhookReply'
           })
    }).catch((e)=>{
           console.log("error",e.toString());
    });
    break;

    case 'check-tickets-request':
    console.log("Check tickets")
           res.status(200).json({
             source: 'Merlin',
             speech: 'Check tickets',
             displayText: 'webhookReply'
           })
    break;

    case 'create-ticket':
    console.log("Crear tickets")
           res.status(200).json({
             source: 'Merlin',
             speech: 'Crear tickets',
             displayText: 'webhookReply'
           })
    break;


  }

  // we have a simple authentication
  //if (REQUIRE_AUTH) {
  //  if (req.headers['auth-token'] !== AUTH_TOKEN) {
  //    return res.status(401).send('Unauthorized')
  //  }
  //}

  //res.status(200).json({
  //  source: 'Merlin',
  //  speech: 'BODY: ' + JSON.stringify(req.body),
  //  displayText: 'webhookReply'
  //})

  /*axios.get(
      'https://dev23543.service-now.com/api/203134/ams/getinicidentlist'
   ).then((data)=>{
          console.log("Your Data",data);
          res.send('Your data: ' + data);
   }).catch((e)=>{
          console.log("error",e.toString());
   });*/

  // and some validation too
  if (!req.body || !req.body.result || !req.body.result.parameters) {
    return res.status(400).send('Bad Request')
  }

  // the value of Action from api.ai is stored in req.body.result.action
  //console.log('* Received action -- %s', req.body.result.action)

  // parameters are stored in req.body.result.parameters
  //var userName = req.body.result.parameters['given-name']
  //var webhookReply = 'Hello ' + userName + '! Welcome from the webhook.'
})

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
