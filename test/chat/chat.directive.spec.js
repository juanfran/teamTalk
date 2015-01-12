describe('chat', function () {
  var scope, compile;
  var mockEventService, mockWebrtcService, mockConfigurationService;
  var validTemplate = '<chat><div class="text"></div></chat>';

  function _mockEventService() {
    _provide(function (provide) {
      mockEventService = {
        onChatMsg:  sinon.stub()
      };

      provide.value('eventService', mockEventService);
    });
  }

  function _mockWebrtcService() {
    _provide(function (provide) {
      mockWebrtcService = {
        sendChatMessage:  sinon.stub()
      };

      provide.value('webrtcService', mockWebrtcService);
    });
  }

  function _mockConfigurationService() {
    _provide(function (provide) {
      var configuration = sinon.stub();

      configuration.returns({'username': 'testUser'});

      mockConfigurationService = {
        get:  configuration
      };

      provide.value('configurationService', mockConfigurationService);
    });
  }

  function createDirective(data, template) {
    var elm;

    scope.data = data;

    elm = compile(template || validTemplate)(scope);

    scope.$apply();

    return elm;
  }

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _setup() {
    module('teamTalk');

    _mockWebrtcService();
    _mockEventService();
    _mockConfigurationService();

    inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      compile = $compile;
    });
  }

  beforeEach(function () {
    _setup()
  });

  it('add message when event received', function () {
    createDirective();

    expect(scope.messages).to.have.length(0);

    mockEventService.onChatMsg.callArgWith(0, {}, 'test1');

    scope.$apply();

    expect(scope.messages).to.have.length(1);
  });

  it('send message when the user press enter', function () {
    createDirective();

    scope.text = 'test test';

    scope.$apply();

    var event = {which: 13};

    scope.chatKeyPress(event);

    scope.$apply();

    var message = {
      user: 'testUser',
      text: 'test test'
    }

    expect(mockWebrtcService.sendChatMessage.withArgs(message).calledOnce).to.be.true;
    expect(scope.text).to.have.length(0);
  });
});
