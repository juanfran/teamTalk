class AudioService {
  constructor(configurationService, pushToTalkService, continuousTransmission, eventService) {
    Object.assign(this, {
      configurationService,
      pushToTalkService,
      continuousTransmission,
      eventService
    });

    eventService.onConfigurationChange(this.configurationChange.bind(this));
  }
  start() {
    this.configuration = this.configurationService.get();

    if (this.configuration.capture === 'push-to-talk') {
      this.pushToTalkService.start(this.configuration.hotkey);
    } else {
      this.continuousTransmission.start();
    }
  }
  configurationChange() {
    this.pushToTalkService.destroy();

    this.start();
  }
}

AudioService.$inject = ['configurationService', 'pushToTalkService', 'continuousTransmission', 'eventService'];
angular.module('teamTalk.audio').service('audioService', AudioService);
