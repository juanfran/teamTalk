class ConfigurationController {
  constructor(eventService, configurationService, modalService) {
    Object.assign(this, {
      configurationService,
      eventService,
      modalService
    });

    this.eventService.onOpenConfiguration(this.openConfiguration.bind(this));
  }
  openConfiguration() {
    this.data = this.configurationService.get();
    this.modalService.open('.configuration-lightbox');
  }
  update() {
    var oldConfiguration = this.configurationService.get();

    this.configurationService.update(this.data);
    this.modalService.close();
    this.eventService.configurationChange(this.data, oldConfiguration);
  }
}

ConfigurationController.$inject = ['eventService', 'configurationService', 'modalService'];

angular.module('teamTalk.configuration').controller('ConfigurationController', ConfigurationController);
