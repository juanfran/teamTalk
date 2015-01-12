describe('audio service', function() {
  var audioService;
  var mockConfigurationService, mockPushToTalkService, mockContinuousTransmissionService, mockEventService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _inject() {
    inject(function (_audioService_) {
       audioService = _audioService_;
    });
  }

  function _setup() {
    _mockPushToTalkService();
    _mockContinuousTransmissionService();
    _mockEventServiceService();
    _inject();
  }

  function _mockEventServiceService() {
    _provide(function (provide) {
      mockEventService = {
        onConfigurationChange: sinon.spy(),
      };

      provide.value('eventService', mockEventService);
    });
  }

  function _mockPushToTalkService() {
    _provide(function (provide) {
      mockPushToTalkService = {
        start: sinon.spy(),
        destroy: sinon.spy()
      };

      provide.value('pushToTalkService', mockPushToTalkService);
    });
  }

  function _mockContinuousTransmissionService() {
    _provide(function (provide) {
      mockContinuousTransmissionService = {
        start: sinon.spy()
      };

      provide.value('continuousTransmission', mockContinuousTransmissionService);
    });
  }

  function _mockConfigurationService(capture, hotkey) {
    _provide(function (provide) {
      var stub = sinon.stub()

      stub.returns({
        capture: capture,
        hotkey: hotkey
      });

      mockConfigurationService = {
        get: stub
      };

      provide.value('configurationService', mockConfigurationService);
    });
  }

  beforeEach(function () {
    module('teamTalk');
  });

  describe('start', function () {
    it('start with push to talk', function () {
      _mockConfigurationService('push-to-talk', 'F');
      _setup();

      audioService.start();
      expect(mockPushToTalkService.start.withArgs('F').calledOnce).to.be.true;
    });

    it('start with continuous transmission', function () {
      _mockConfigurationService('continuous-transmission', 'F');
      _setup();

      audioService.start();
      expect(mockContinuousTransmissionService.start.calledOnce).to.be.true;
    });
  });

  describe('configuration change', function () {
   it('event on configuration', function () {
      _setup();

      audioService.start = sinon.spy();

      expect(mockEventService.onConfigurationChange.calledOnce).to.be.true;
    });

    it('configuration change method', function () {
      _setup();

      audioService.start = sinon.spy();

      audioService.configurationChange();

      expect(mockPushToTalkService.destroy.calledOnce).to.be.true;
      expect(audioService.start.calledOnce).to.be.true;
    });
  });
});
