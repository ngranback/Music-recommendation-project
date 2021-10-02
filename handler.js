const db = require('./db_connect');


module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.getAllArtists = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getAll('artists') 
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      console.log(e);
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Todos: ' + e
      })
    })
};

module.exports.getAllUserArtists = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getAll('user_artists')
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      console.log(e);
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Todos: ' + e
      })
    })
};


module.exports.getSimilarArtists = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getById('suggested', event.pathParameters.requested_artist)
    .then(res => {
      callback(null,{
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(res)
   
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not find Todo: " 
      })
    })
};
