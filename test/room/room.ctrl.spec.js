describe("room controller", function() {
  var roomController;
  var scope;
  var mockEventService, mockWebrtcService, mockAudioService, mockMediaService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _mockEventService() {
    _provide(function (provide) {
      mockEventService = {
        onRoomReady:  sinon.stub()
      };

      provide.value('eventService', mockEventService);
    });
  }

  function _mockWebrtcService() {
    _provide(function (provide) {
      mockWebrtcService = {
        init:  sinon.spy()
      };

      provide.value('webrtcService', mockWebrtcService);
    });
  }


  function _mockAudioService() {
    _provide(function (provide) {
      mockAudioService = {
        start:  sinon.spy()
      };

      provide.value('audioService', mockAudioService);
    });
  }

  function _mockMediaService() {
    _provide(function (provide) {
      mockMediaService = {
        focus: sinon.spy(),
        fullscreen: sinon.spy()
      };

      provide.value('mediaService', mockMediaService);
    });
  }

  function _inject() {
     inject(function ($controller) {
      scope = {};
      roomController = $controller('RoomController', {
        $scope: scope
      });
    });
  }

  function _setup() {
    _mockEventService();
    _mockWebrtcService();
    _mockAudioService();
    _mockMediaService();

    _inject();
  }

  beforeEach(function() {
    module('teamTalk');

    _setup();
  });

  describe("initialize room", function() {
    it("call webrtcService with the element", function() {
      var elementSpy = sinon.spy();

      roomController.init(elementSpy);

      expect(mockWebrtcService.init.withArgs(elementSpy).calledOnce).to.be.true;
    });

    it("audioService start on doom ready", function() {
      var elementSpy = sinon.spy();

      roomController.init(elementSpy);

      mockEventService.onRoomReady.callArg(0);

      expect(mockWebrtcService.init.withArgs(elementSpy).calledOnce).to.be.true;
      expect(mockAudioService.start.calledOnce).to.be.true;
    });
  });

  it("focus", function() {
    roomController.focus(3);

    expect(mockMediaService.focus.withArgs(3).calledOnce).to.be.true;
  });

  it("fullscreen", function() {
    roomController.fullscreen(4);

    expect(mockMediaService.fullscreen.withArgs(4).calledOnce).to.be.true;
  });
});
