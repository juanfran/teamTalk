class ContinuousTransmission  {
  constructor(webrtcService) {
    this.webrtcService = webrtcService;
  }
  start() {
    this.webrtcService.unmute();
  }
}

ContinuousTransmission.$inject = ['webrtcService'];
angular.module('teamTalk.audio').service('continuousTransmission', ContinuousTransmission);
