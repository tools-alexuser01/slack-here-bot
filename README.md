# Slack bot

[![Build Status](https://travis-ci.org/apiaryio/slack-here-bot.svg?branch=master)](https://travis-ci.org/apiaryio/slack-here-bot)

Based on http://blog.somewhatabstract.com/2015/03/02/writing-a-simple-slack-bot-with-node-slack-client/

## Using

Implementation `@here` similar to `hipchat` for slack. Bot has namae `@herebot` (@here is reserved name).

You can use `@here My message` or use `@herebot My message` and all online users will be notify by `@herebot`.

## Testing

Environment configuration file: `.env`. Hubot token - [create bot](https://apiary.slack.com/services/new/bot).

    HUBOT_SLACK_TOKEN=""

Install [foreman](https://github.com/ddollar/foreman)

    gem install foreman

Start local version

    foreman start


