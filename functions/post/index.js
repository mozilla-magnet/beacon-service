'use strict';

/**
 * Dependencies
 */

var uuid = require('shortid').generate;
var AWS = require('aws-sdk');

var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handle = function(e, ctx, cb) {
  console.log('processing event: %j', e);
  var url = e.url;

  var params = {
    TableName: 'beacon-service-urls',
    Item: {
      id: uuid(),
      url: url,
      time_added: Date.now()
    }
  };

  dynamo.put(params, function(err, data) {
    if (err) {
      console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
      ctx.done(JSON.stringify(err, null, 2));
    } else {
      console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
      ctx.done(null, data);
    }
  });
}
