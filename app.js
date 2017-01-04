'use strict'

require('dotenv').config();
var fs     = require('fs');
var token  = process.env.SLACK_API_TOKEN;
var starjs = require('star-correct');

var RTM_EVENTS        = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var CLIENT_EVENTS 	  = require('@slack/client').CLIENT_EVENTS;

var RtmClient       = require('@slack/client').RtmClient;
var rtm             = new RtmClient(token, {logLevel: 'error', dataStore: mds});
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var mds             = new MemoryDataStore();

var channel;
var connected = false;
var lastMessage;
var userId;

/**
 * Open connection to send messages
 */
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function() {
	connected = true;
});

/**
 * Retrieving user ID
 */
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
	userId = rtmStartData.self.id;
});

/**
 * Listen to `message` events
 */
rtm.on(RTM_EVENTS.MESSAGE, function(message) {
	if (connected) {
		if(message.user == userId) {
			if (message.text && (message.text).endsWith('*') === false) {
				lastMessage = message;
			}

			if (message.text && (message.text).endsWith('*')) {
				var correctedMsg = starjs.correct([lastMessage.text, message.text]);
				if(correctedMsg) {
					message.text = correctedMsg;

					rtm.updateMessage(message, function () {
						rtm.deleteMessage(lastMessage);
					});
				}
			}
		}
	}
});

rtm.start();