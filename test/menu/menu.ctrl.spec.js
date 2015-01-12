describe("menu controller", function() {
  var menuController;
  var scope;
  var mockEventService, mockWebrtcService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _mockEventService() {
    _provide(function (provide) {
      mockEventService = {
        onMute: sinon.spy(),
        onUnMute: sinon.spy(),
        openConfiguration: sinon.spy()
      };

      provide.value('eventService', mockEventService);
    });
  }

  function _mockWebrtcService() {
    _provide(function (provide) {
      mockWebrtcService = {
        pauseVideo:  sinon.spy(),
        resumeVideo: sinon.spy(),
        mute: sinon.spy(),
        unmute: sinon.spy()
      };

      provide.value('webrtcService', mockWebrtcService);
    });
  }


  function _inject() {
     inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      menuController = $controller('MenuController', {
        $scope: scope
      });
    });
  }

  function _setup() {
    _mockEventService();
    _mockWebrtcService();

    _inject();
  }

  beforeEach(function() {
    module('teamTalk');

    _setup();
  });

  it("eventService mute/unmute", function() {
    expect(mockEventService.onMute.calledOnce).to.be.true;
    expect(mockEventService.onUnMute.calledOnce).to.be.true;
  });

  it("mute set microphone to false", function() {
    menuController.mute();
    scope.$apply();

    expect(menuController.microphone).to.be.false;
  });

  it("unmute set microphone to true", function() {
    menuController.unmute();
    scope.$apply();

    expect(menuController.microphone).to.be.true;
  });

  it("toggleCamera", function() {
    menuController.toggleCamera();
    expect(menuController.camera).to.be.false;
    expect(mockWebrtcService.pauseVideo.called).to.be.true;
    expect(mockWebrtcService.resumeVideo.called).to.be.false;

    menuController.toggleCamera();
    expect(menuController.camera).to.be.true;
    expect(mockWebrtcService.pauseVideo.calledOnce).to.be.true;
    expect(mockWebrtcService.resumeVideo.calledOnce).to.be.true;
  });

  it("toggleMicrophone", function() {
    menuController.microphone = false;
    menuController.toggleMicrophone();
    expect(mockWebrtcService.unmute.called).to.be.true;
    expect(mockWebrtcService.mute.called).to.be.false;

    menuController.microphone = true;
    menuController.toggleMicrophone();
    expect(mockWebrtcService.unmute.calledOnce).to.be.true;
    expect(mockWebrtcService.mute.calledOnce).to.be.true;
  });

  it("open configuration", function() {
    menuController.configuration();

    expect(mockEventService.openConfiguration.calledOnce).to.be.true;
  })
});
