describe("room directive", function() {
  var scope, compile;
  var $controllerProvider;
  var mockRoomController, mockRoomControllerInit, mockRoomControllerFocus, mockRoomControllerFullscreen;
  var validTemplate = "<room><div class='localUser'></div><div data-id='4' class='video'><div class='fullscreen'></div><video></video></div></room>";

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

  function _mockRoomController() {
    mockRoomControllerInit = sinon.spy();
    mockRoomControllerFocus = sinon.spy();
    mockRoomControllerFullscreen = sinon.spy();

    mockRoomController =  function() {
      this.init = mockRoomControllerInit;
      this.focus = mockRoomControllerFocus;
      this.fullscreen = mockRoomControllerFullscreen;
    }

    $controllerProvider.register('RoomController', mockRoomController);
  }

  function _setup() {
    inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      compile = $compile;
    });
  }

  beforeEach(function() {
    module('teamTalk');

    module(function(_$controllerProvider_){
      $controllerProvider = _$controllerProvider_;

      _mockRoomController();
    });

    _setup();
  });

  it("init roomController with the localUser element", function() {
    createDirective();

    var localUser = sinon.match(function(element) {
      return $(element).hasClass('localUser');
    });

    expect(mockRoomControllerInit.withArgs(localUser).calledOnce).to.be.true;
  });

  it("focus on click video", function() {
    var elm = createDirective();

    elm.find('video').trigger('click');

    expect(mockRoomControllerFocus.withArgs(4).calledOnce).to.be.true;
  });

  it("fullscreen on click icon fullscreen", function() {
    var elm = createDirective();

    elm.find('.fullscreen').trigger('click');

    expect(mockRoomControllerFullscreen.withArgs(4).calledOnce).to.be.true;
  });
});
