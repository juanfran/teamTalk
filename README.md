TeamTalk is a group videochat app with webrtc.

## Install

```shell
npm install
bower install
```

## Configure

`src/js/config.js`
```js
angular.module('teamTalk')
  .constant('config', {
    signal_url: 'http://localhost:8888',
    debug: true
  })
```

`signal_url` the url of your signaling server, for example you could use [signalmaster](https://github.com/andyet/signalmaster)

`debug` log app debug info

## Launch

This project requires [gulp](http://gulpjs.com/)

Run `gulp` in the teamTalk directory and then go to `http://localhost:8080?room_name` and that's it.