describe('webrtc service', function() {
  var webrtcService;
  var mockEventService, mockMediaService, mockConfigurationService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _inject() {
    inject(function (_webrtcService_) {
       webrtcService = _webrtcService_;
    });
  }

  function _setup() {
    _inject();
  }

  function _mockWebrtc() {
    webrtcService.webrtc = {
      on: sinon.stub(),
      joinRoom: sinon.spy(),
      resumeVideo: sinon.spy(),
      pauseVideo: sinon.spy(),
      mute: sinon.spy(),
      unmute: sinon.spy(),
      shareScreen: sinon.spy(),
      stopScreenShare: sinon.spy(),
      sendToAll: sinon.spy()
    };
  }

  function _mockConfigurationService(configuration) {
    _provide(function (provide) {
      var getStub = sinon.stub();

      getStub.returns(configuration)

      mockConfigurationService = {
        get: getStub,
      };

      provide.value('configurationService', mockConfigurationService);
    });
  }

  function _mockEventService() {
    _provide(function (provide) {
      mockEventService = {
        get: sinon.spy(),
        roomReady: sinon.spy(),
        chatMsg: sinon.spy(),
        mute: sinon.spy(),
        unmute: sinon.spy()
      };

      provide.value('eventService', mockEventService);
    });
  }

  function _mockMediaService() {
    _provide(function (provide) {
      mockMediaService = {
        create: sinon.spy(),
        remove: sinon.spy(),
        mute: sinon.spy(),
        unmute: sinon.spy(),
        username: sinon.spy()
      };

      provide.value('mediaService', mockMediaService);
    });
  }


  beforeEach(function () {
    module('teamTalk');
  });

  describe('initialize', function() {
    var localVideo;

    beforeEach(function() {
      _setup();

      webrtcService.getRoomName = sinon.stub();
      webrtcService.createWebRtc = sinon.spy();
      webrtcService.joinRoom = sinon.spy();
      webrtcService.eventService = {
        onConfigurationChange: sinon.spy()
      }

      webrtcService.getRoomName.returns('testRoom');

      localVideo = function() {};

      webrtcService.init(localVideo);
    });

    it('set room name', function(){
      expect(webrtcService.room).to.be.equal('testRoom');
    });

    it('set localUserVideo', function(){
      expect(webrtcService.localUser).to.be.equal(localVideo);
    });

    it('create webrtc', function(){
      expect(webrtcService.createWebRtc.calledOnce).to.be.true;
    });

    it('join room', function(){
      expect(webrtcService.joinRoom.calledOnce).to.be.true;
    });

    it('on configuration change event', function(){
      expect(webrtcService.eventService.onConfigurationChange.calledOnce).to.be.true;
    });
  });

  describe('configuration change', function() {
    var configurationData = {'username': 'test1'};

    beforeEach(function() {
      _mockConfigurationService(configurationData);
      _setup();

      webrtcService.sendMessage = sinon.spy();
    });

    it('send message when the username change', function() {
      var data = [{'username': 'test1'}, {'username': 'test2'}];

      webrtcService.configurationChange({}, data);

      var to = {'username': configurationData.username}

      expect(webrtcService.sendMessage.withArgs(to, 'username').calledOnce).to.be.true;
    });

    it('do not send message when the username does not change', function() {
      var data = [{'username': 'test1'}, {'username': 'test1'}];

      webrtcService.configurationChange({}, data);

      var to = {'username': configurationData.username}

      expect(webrtcService.sendMessage.called).to.be.false;
    });
  });

  describe('join room init events', function() {
    beforeEach(function() {
      _setup();

      webrtcService._eventReadyToCall = sinon.spy();
      webrtcService._eventJoinedRoom = sinon.spy();
      webrtcService._eventRemoteVideoLoaded = sinon.spy();
      webrtcService._eventVideoAdded = sinon.spy();
      webrtcService._eventVideoRemoved = sinon.spy();
      webrtcService._eventMute = sinon.spy();
      webrtcService._eventUnmute = sinon.spy();
      webrtcService._eventChat = sinon.spy();
      webrtcService._eventMsg = sinon.spy();
    })
    it('init events', function() {
      webrtcService.joinRoom();

      expect(webrtcService._eventReadyToCall.calledOnce).to.be.true;
      expect(webrtcService._eventJoinedRoom.calledOnce).to.be.true;
      expect(webrtcService._eventRemoteVideoLoaded.calledOnce).to.be.true;
      expect(webrtcService._eventVideoAdded.calledOnce).to.be.true;
      expect(webrtcService._eventVideoRemoved.calledOnce).to.be.true;
      expect(webrtcService._eventMute.calledOnce).to.be.true;
      expect(webrtcService._eventUnmute.calledOnce).to.be.true;
      expect(webrtcService._eventChat.calledOnce).to.be.true;
      expect(webrtcService._eventMsg.calledOnce).to.be.true;
    });
  });

  describe('webrtc events', function() {
    var configuration = {'username': 'test'};

    beforeEach(function() {
      _mockConfigurationService(configuration);
      _mockEventService();
      _mockMediaService();

      _setup();

      _mockWebrtc();
    });

    it('readyToCall', function() {
      webrtcService.room = 'test1';
      webrtcService._eventReadyToCall();

      webrtcService.webrtc.on.callArg(1);

      expect(webrtcService.webrtc.on.withArgs('readyToCall', sinon.match.func).calledOnce).to.be.true;
      expect(webrtcService.webrtc.joinRoom.withArgs(webrtcService.room).calledOnce).to.be.true;
    });

    it('joinedRoom', function() {
      webrtcService._eventJoinedRoom();

      webrtcService.webrtc.on.callArg(1);

      expect(webrtcService.webrtc.on.withArgs('joinedRoom', sinon.match.func).calledOnce).to.be.true;
      expect(mockEventService.roomReady.calledOnce).to.be.true;
    });

    it('remoteVideoLoaded', function() {
      webrtcService._eventRemoteVideoLoaded();

      var peer = {
        send: sinon.spy()
      };

      webrtcService.webrtc.on.callArgWith(1, peer);

      var sendArgs = {data: {type: 'username', data: {'username': configuration.username}}};

      expect(webrtcService.webrtc.on.withArgs('remoteVideoLoaded', sinon.match.func).calledOnce).to.be.true;
      expect(peer.send.withArgs('msg', sendArgs).calledOnce).to.be.true;
    });

    it('videoAdded', function() {
      webrtcService._eventVideoAdded();

      var video = 'video';
      var peer = 'peer';

      webrtcService.webrtc.on.callArgWith(1, video, peer);

      expect(webrtcService.webrtc.on.withArgs('videoAdded', sinon.match.func).calledOnce).to.be.true;
      expect(mockMediaService.create.withArgs(video, peer).calledOnce).to.be.true;
    });

    it('mute', function() {
      webrtcService._eventMute();

      var peer = {
        id: 1,
        name: 'test'
      };

      webrtcService.webrtc.on.callArgWith(1, peer);

      expect(webrtcService.webrtc.on.withArgs('mute', sinon.match.func).calledOnce).to.be.true;
      expect(mockMediaService.mute.withArgs(peer.id, peer.name).calledOnce).to.be.true;
    });

    it('unmute', function() {
      webrtcService._eventUnmute();

      var peer = {
        id: 1,
        name: 'test'
      };

      webrtcService.webrtc.on.callArgWith(1, peer);

      expect(webrtcService.webrtc.on.withArgs('unmute', sinon.match.func).calledOnce).to.be.true;
      expect(mockMediaService.unmute.withArgs(peer.id, peer.name).calledOnce).to.be.true;
    });

    it('chat', function() {
      webrtcService._eventChat();

      var msg = {
        data: 'test'
      };

      webrtcService.webrtc.on.callArgWith(1, msg);

      expect(webrtcService.webrtc.on.withArgs('chat', sinon.match.func).calledOnce).to.be.true;
      expect(mockEventService.chatMsg.withArgs(msg.data).calledOnce).to.be.true;
    });

    it('username type msg ', function() {
      webrtcService._eventMsg();

      var peer = {
        id: 123,
        data: {
          type: 'username',
          data: {
            username: 'testuser'
          }
        }
      };

      webrtcService.webrtc.on.callArgWith(1, peer);

      expect(webrtcService.webrtc.on.withArgs('msg', sinon.match.func).calledOnce).to.be.true;
      expect(mockMediaService.username.withArgs(peer.id, peer.data.data.username).calledOnce).to.be.true;
    });
  });

  describe('webrtc actions', function () {
    beforeEach(function() {
      _mockEventService();
      _setup();
      _mockWebrtc();
    });

    it('resume video', function() {
      webrtcService.resumeVideo();

      expect(webrtcService.webrtc.resumeVideo.calledOnce).to.be.true;
    });

    it('pause video', function() {
      webrtcService.pauseVideo();

      expect(webrtcService.webrtc.pauseVideo.calledOnce).to.be.true;
    });

    it('mute', function() {
      webrtcService.mute();

      expect(webrtcService.webrtc.mute.calledOnce).to.be.true;
      expect(webrtcService.eventService.mute.calledOnce).to.be.true;
    });

    it('unmute', function() {
      webrtcService.unmute();

      expect(webrtcService.webrtc.unmute.calledOnce).to.be.true;
      expect(webrtcService.eventService.unmute.calledOnce).to.be.true;
    });

    it('screeShareAllowed', function() {
      webrtcService.webrtc.capabilities = {screenSharing: true};

      expect(webrtcService.sreenShareAllowed()).to.be.true;
    });

    it('share screen', function() {
      webrtcService.shareScreen();

      expect(webrtcService.webrtc.shareScreen.calledOnce).to.be.true;
    });

    it('stop share screen', function() {
      webrtcService.stopScreenShare();

      expect(webrtcService.webrtc.stopScreenShare.calledOnce).to.be.true;
    });

    it('send message', function() {
      var type = 'test1';
      var data = 'test2';

      webrtcService.sendMessage(data, type);

      var args = {data: {type: type, data: data}}

      expect(webrtcService.webrtc.sendToAll.withArgs('msg', args).calledOnce).to.be.true;
    });

    it('send chat message', function() {
      var msg = 'test2';

      webrtcService.sendChatMessage(msg);

      var args = {data: msg};

      expect(webrtcService.webrtc.sendToAll.withArgs('chat', args).calledOnce).to.be.true;
    });
  })
});
