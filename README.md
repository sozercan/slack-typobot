# slack-typobot

Slack bot that corrects typos ending with an asterisk

<a href="https://azuredeploy.net/" target="_blank"><img src="http://azuredeploy.net/deploybutton.png"/></a>

## Screenshot

![](http://i.imgur.com/1YWEUOS.gif)

## Install

Create a file called `.env` and put your API token in it:

    SLACK_API_TOKEN="PUT-TOKEN-HERE"

Install dependencies:

    npm install

`cd` into the directory containing `app` to run:

    node app.js

## Dependencies

The `package.json` exists but this package isn't published.

Thanks to @Decagon/star-correct for https://github.com/Decagon/star.js