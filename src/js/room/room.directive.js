angular.module('teamTalk.room').directive('room', function() {
  return {
    restrict: 'EA',
    controller: 'RoomController',
    scope: {},
    link: function(scope, element, attrs, roomCtrl) {
      roomCtrl.init(element.find('.localUser')[0]);

      element.on('click', 'video', function (e) {
        var target = $(e.currentTarget).closest('.video');

        roomCtrl.focus(target.data('id'));
      });

      element.on('click', '.fullscreen', function (e) {
        var target = $(e.currentTarget).closest('.video');

        roomCtrl.fullscreen(target.data('id'));
      });
    }
  };
});
