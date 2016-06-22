'use strict';

/**
 * Dependencies
 */

var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handle = function(e, ctx, cb) {
  console.log('get id: ' + e.id);
  var id = e.id;

  var params = {
    TableName: 'beacon-service-urls',
    Key: {
      id: id
    }
  };

  dynamo.get(params, function(err, data) {
    if (err) {
      console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
      ctx.done(JSON.stringify(err, null, 2));
    } else {
      console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
      ctx.done(null, { url: data.Item.url, content: 'foo' });
    }
  });
}
