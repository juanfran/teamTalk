angular.module('teamTalk.room', []);
angular.module('teamTalk.chat', []);
angular.module('teamTalk.configuration', []);
angular.module('teamTalk.menu', []);
angular.module('teamTalk.audio', []);

angular.module('teamTalk', [
  'teamTalk.chat',
  'teamTalk.configuration',
  'teamTalk.menu',
  'teamTalk.room',
  'teamTalk.audio'
]);
