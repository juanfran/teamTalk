describe('event service', function() {
  var eventService;
  var mockRootScope;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _inject() {
    inject(function (_eventService_) {
       eventService = _eventService_;
    });
  }

  function _setup() {
    _mockRootScope();
    _inject();
  }

  function _mockRootScope() {
    _provide(function (provide) {
      mockRootScope = {
        $emit: sinon.spy(),
        $on: sinon.spy(),
      };

      provide.value('$rootScope', mockRootScope);
    });
  }

  beforeEach(function () {
    module('teamTalk');

    _setup();
  });

  it('openConfiguration', function () {
    eventService.openConfiguration();

    expect(mockRootScope.$emit.withArgs('openConfiguration').calledOnce).to.be.true;
  });

  it('onOpenConfiguration', function () {
    var fn = function() {};

    eventService.onOpenConfiguration(fn);

    expect(mockRootScope.$on.withArgs('openConfiguration', fn).calledOnce).to.be.true;
  });

  it('roomReady', function () {
    eventService.roomReady();

    expect(mockRootScope.$emit.withArgs('roomReady').calledOnce).to.be.true;
  });

  it('onRoomReady', function () {
    var fn = function() {};

    eventService.onRoomReady(fn);

    expect(mockRootScope.$on.withArgs('roomReady', fn).calledOnce).to.be.true;
  });

  it('configurationChange', function () {
    eventService.configurationChange();

    expect(mockRootScope.$emit.withArgs('configurationChange').calledOnce).to.be.true;
  });

  it('onConfigurationChange', function () {
    var fn = function() {};

    eventService.onConfigurationChange(fn);

    expect(mockRootScope.$on.withArgs('configurationChange', fn).calledOnce).to.be.true;
  });

  it('mute', function () {
    eventService.mute();

    expect(mockRootScope.$emit.withArgs('mute').calledOnce).to.be.true;
  });

  it('onMute', function () {
    var fn = function() {};

    eventService.onMute(fn);

    expect(mockRootScope.$on.withArgs('mute', fn).calledOnce).to.be.true;
  });

  it('unmute', function () {
    eventService.unmute();

    expect(mockRootScope.$emit.withArgs('unmute').calledOnce).to.be.true;
  });

  it('onUnMute', function () {
    var fn = function() {};

    eventService.onUnMute(fn);

    expect(mockRootScope.$on.withArgs('unmute', fn).calledOnce).to.be.true;
  });

  it('chatMsg', function () {
    eventService.chatMsg();

    expect(mockRootScope.$emit.withArgs('chatMsg').calledOnce).to.be.true;
  });

  it('onChatMsg', function () {
    var fn = function() {};

    eventService.onChatMsg(fn);

    expect(mockRootScope.$on.withArgs('chatMsg', fn).calledOnce).to.be.true;
  });
});
