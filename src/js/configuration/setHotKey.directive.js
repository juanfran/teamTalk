angular.module('teamTalk.configuration').directive('sethotkey', function() {
  var keymap = {
    '17': 'Control',
    '9': 'Tab',
    '91': 'Windows',
    '18': 'Alt',
    '225': 'Alt Gr',
    '32': 'Space',
    '16': 'Mayus',
    '13': 'Enter'
  };

  return {
    restrict: 'A',
    scope: {
      'hotkey': '='
    },
    link: function(scope, element) {
      function printHotKeyText(key) {
        if (!key) {
          element.val('Set hotkey');
        } else if (keymap[key]) {
          element.val(keymap[key]);
        } else {
          element.val(String.fromCharCode(key));
        }
      };

      scope.$watch('hotkey', printHotKeyText);

      $(element).on('click', () => {
        $(document.body).off('keydown');
        $(document.body).off('keyup');

        element.val('Press any key');

        $(document.body).one('keydown', (e) => {
          e.preventDefault();

          scope.$apply(() => {
            scope.hotkey = e.keyCode;
          });
        });
      });
    }
  };
});
