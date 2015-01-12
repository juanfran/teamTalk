class MenuController {
  constructor($scope, webrtcService, eventService) {
    Object.assign(this, {
      $scope,
      webrtcService,
      eventService,
      camera: true,
      sharescreen: true
    });

    eventService.onMute(this.mute.bind(this));
    eventService.onUnMute(this.unmute.bind(this));
  }
  mute() {
    this.$scope.$evalAsync(() => {
      this.microphone = false;
    });
  }
  unmute() {
    this.$scope.$evalAsync(() => {
      this.microphone = true;
    });
  }//#TODO: toggleCamera & toggleMicrophone interval var
  toggleCamera() {
    this.camera = !!!this.camera;

    if (this.camera) {
      this.webrtcService.resumeVideo();
    } else {
      this.webrtcService.pauseVideo();
    }
  }
  toggleMicrophone() {
    if (this.microphone) {
      this.webrtcService.mute();
    } else {
      this.webrtcService.unmute();
    }
  }
  toggleShareScreen() {
    if (!this.webrtcService.sreenShareAllowed()) {
      alert('Screen sharing not allowed')
    } else {
      this.sharescreen = !!!this.sharescreen;

      if (this.sharescreen) {
        this.webrtcService.stopScreenShare();
      } else {
        this.webrtcService.shareScreen();
      }
    }
  }
  configuration() {
    this.eventService.openConfiguration();
  }
}

MenuController.$inject = ['$scope', 'webrtcService', 'eventService'];
angular.module('teamTalk.menu').controller('MenuController', MenuController);
