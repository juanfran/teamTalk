class WebRtcService {
  constructor($q, eventService, mediaService, configurationService, config) {
    Object.assign(this, {
      $q,
      eventService,
      mediaService,
      configurationService,
      config
    });
  }
  getRoomName() {
    return location.search && location.search.split('?')[1];
  }
  init(localVideo) {
    this.room = this.getRoomName();
    this.localUser = localVideo;

    this.createWebRtc();
    this.joinRoom();

    this.eventService.onConfigurationChange(this.configurationChange.bind(this));
  }
  configurationChange(event, data) {
    var newConfiguration = data[0];
    var oldConfiguration = data[1];

    if (newConfiguration.username !== oldConfiguration.username) {
      var configuration = this.configurationService.get();

      this.sendMessage({'username': configuration.username}, 'username');
    }
  }
  joinRoom() {
    this._eventReadyToCall();
    this._eventJoinedRoom();
    this._eventRemoteVideoLoaded();
    this._eventVideoAdded();
    this._eventVideoRemoved();
    this._eventMute();
    this._eventUnmute();
    this._eventChat();
    this._eventMsg();
  }
  _eventReadyToCall(){
    this.webrtc.on('readyToCall', () => {
      this.webrtc.joinRoom(this.room);
    });
  }
  _eventJoinedRoom(){
    this.webrtc.on('joinedRoom', () => {
      this.eventService.roomReady();
    });
  }
  _eventRemoteVideoLoaded() {
    this.webrtc.on('remoteVideoLoaded', (peer) => {
      var configuration = this.configurationService.get();
      peer.send('msg', {data: {type: 'username', data: {'username': configuration.username}}});
    });
  }
  _eventVideoAdded() {
    this.webrtc.on('videoAdded', (video, peer) => {
      this.mediaService.create(video, peer);
    });
  }
  _eventVideoRemoved() {
    this.webrtc.on('videoRemoved', (video) => {
      this.mediaService.remove(video);
    });
  }
  _eventMute() {
    this.webrtc.on('mute', (peer) => {
      this.mediaService.mute(peer.id, peer.name);
    });
  }
  _eventUnmute() {
    this.webrtc.on('unmute', (peer) => {
      this.mediaService.unmute(peer.id, peer.name);
    });
  }
  _eventChat() {
    this.webrtc.on('chat', (msg) => {
      this.eventService.chatMsg(msg.data);
    });
  }
  _eventMsg() {
    this.webrtc.on('msg', (peer) => {
      if (peer.data.type === 'username') {
        this.mediaService.username(peer.id, peer.data.data.username);
      }
    });
  }
  createWebRtc() {
    this.webrtc = new SimpleWebRTC({
      url: this.config.signal_url,
      localVideoEl: this.localUser,
      autoRequestMedia: true,
      debug: this.config.debug,
      detectSpeakingEvents: false,
      adjustPeerVolume: true,
      autoAdjustMic: true,
      peerVolumeWhenSpeaking: 0.25,
      media: {
        video: true,
        audio: true
      }
    });
  }
  resumeVideo() {
    this.webrtc.resumeVideo();
  }
  pauseVideo() {
    this.webrtc.pauseVideo();
  }
  mute() {
    this.webrtc.mute();
    this.eventService.mute();
  }
  unmute() {
    this.webrtc.unmute();
    this.eventService.unmute();
  }
  sreenShareAllowed() {
    return this.webrtc.capabilities.screenSharing;
  }
  shareScreen() {
    this.webrtc.shareScreen();
  }
  stopScreenShare() {
    this.webrtc.stopScreenShare();
  }
  sendMessage(message, type) {
    this.webrtc.sendToAll('msg', {data: {type: type, data: message}});
  }
  sendChatMessage(message) {
    this.webrtc.sendToAll('chat', {data: message});
    this.eventService.chatMsg(message);
  }
}

WebRtcService.$inject = ['$q', 'eventService', 'mediaService','configurationService', 'config'];
angular.module('teamTalk').service('webrtcService', WebRtcService);
