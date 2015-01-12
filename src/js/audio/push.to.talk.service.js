class PushToTalkService {
  constructor(webrtcService) {
    this.webrtcService = webrtcService;
  }
  initEvents() {
    $(document.body).on('keydown.push-to-talk', this.keyEvent.bind(this));
    $(document.body).on('keyup.push-to-talk', this.keyEvent.bind(this));
  }
  keyEvent(event) {
    if (event.keyCode === this.buttonKeyCode) {
      if (event.type === 'keydown') {
        this.webrtcService.unmute();
      } else {
        this.webrtcService.mute();
      }
    }
  }
  start(buttonKeyCode) {
    Object.assign(this, {
      buttonKeyCode
    });

    this.webrtcService.mute();
    this.initEvents();
  }
  destroy() {
    $(document.body).off('keydown.push-to-talk');
    $(document.body).off('keyup.push-to-talk');
  }
}

PushToTalkService.$inject = ['webrtcService'];
angular.module('teamTalk.audio').service('pushToTalkService', PushToTalkService);
