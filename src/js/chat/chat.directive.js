angular.module('teamTalk.chat').directive('chat', ['configurationService', 'webrtcService', 'eventService', function(configurationService, webrtcService, eventService) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      scope.messages = [];

      eventService.onChatMsg(function (event, message) {
        scope.$evalAsync(function() {
          scope.messages.push(message);
        });
      });

      scope.$watchCollection('messages', function() {
        var messages = element.find('.text');

        messages.scrollTop(messages[0].scrollHeight);
      });

      scope.chatKeyPress = function(event) {
        if (event.which === 13) {
          if (scope.text.length) {
            var data = configurationService.get();
            var message = {
              'user': data.username,
              'text': scope.text
            };

            webrtcService.sendChatMessage(message);

            scope.text = '';
          }
        }
      };
    }
  };
}]);
