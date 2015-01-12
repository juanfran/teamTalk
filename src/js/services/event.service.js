class EventService {
  constructor($rootScope) {
    Object.assign(this, {
      $rootScope
    });
  }
  openConfiguration() {
    this.$rootScope.$emit('openConfiguration');
  }
  onOpenConfiguration(callback) {
    this.$rootScope.$on('openConfiguration', callback);
  }
  roomReady() {
    this.$rootScope.$emit('roomReady');
  }
  onRoomReady(callback) {
    this.$rootScope.$on('roomReady', callback);
  }
  onConfigurationChange(callback) {
    this.$rootScope.$on('configurationChange', callback);
  }
  configurationChange() {
    this.$rootScope.$emit('configurationChange', arguments);
  }
  onMute(callback) {
    this.$rootScope.$on('mute', callback);
  }
  mute() {
    this.$rootScope.$emit('mute');
  }
  onUnMute(callback) {
    this.$rootScope.$on('unmute', callback);
  }
  unmute() {
    this.$rootScope.$emit('unmute');
  }
  onChatMsg(callback) {
    this.$rootScope.$on('chatMsg', callback);
  }
  chatMsg(msg) {
    this.$rootScope.$emit('chatMsg', msg);
  }
}

EventService.$inject = ['$rootScope'];
angular.module('teamTalk').service('eventService', EventService);
