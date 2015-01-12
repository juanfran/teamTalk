class ConfigurationService {
  constructor(storageService) {
    Object.assign(this, {
      storageService
    });
  }
  get() {
    var defaults = {
      'username': 'anonymous',
      'capture': 'continous-transmission',
      'hotkey': null
    };

    return this.storageService.getObject('configuration', defaults);
  }
  update(data) {
    this.storageService.setObject('configuration', data);
  }
}

ConfigurationService.$inject = ['storageService'];
angular.module('teamTalk.configuration').service('configurationService', ConfigurationService);
