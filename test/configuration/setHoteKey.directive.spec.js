describe("room directive", function() {
  var scope, compile;
  var validTemplate = "<input type='button' sethotkey hotkey='test.hotkey'></input>";

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function createDirective(template) {
    var elm;

    elm = compile(template || validTemplate)(scope);

    scope.$apply();

    return elm;
  }

  function _setup() {
    inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      scope.test = {};
      compile = $compile;
    });
  }

  beforeEach(function() {
    module('teamTalk');

    _setup();
  });

  describe("print hotkey when hotkey change", function() {
    it("empty hotkey", function() {
      var element = createDirective();

      expect(element.val()).to.be.equal('Set hotkey');
    });

    it("normal key text", function() {
      var element = createDirective();

      scope.test.hotkey = 67;
      scope.$apply();

      expect(element.val()).to.be.equal('C');
    });

    it("custom key text", function() {
      var element = createDirective();

      scope.test.hotkey = 13;
      scope.$apply();

      expect(element.val()).to.be.equal('Enter');
    });
  });

  it("set new key", function() {
    var element = createDirective();

    element.trigger('click');

    expect(element.val()).to.be.equal('Press any key');

    var e = $.Event('keydown');
    e.keyCode = 53;
    $(document.body).trigger(e);

    expect(scope.test.hotkey).to.be.equal(53);
    expect(element.val()).to.be.equal('5');
  });
});
