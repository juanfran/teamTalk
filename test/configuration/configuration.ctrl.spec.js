describe("configuration controller", function() {
  var configurationController;
  var scope;
  var mockEventService, mockConfigurationService, mockModalService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _mockEventService() {
    _provide(function (provide) {
      mockEventService = {
        onOpenConfiguration: sinon.spy(),
        configurationChange: sinon.spy()
      };

      provide.value('eventService', mockEventService);
    });
  }

  function _mockConfigurationService() {
    _provide(function (provide) {
      mockConfigurationService = {
        get:  sinon.stub(),
        update: sinon.spy()
      };

      provide.value('configurationService', mockConfigurationService);
    });
  }

  function _mockModalService() {
    _provide(function (provide) {
      mockModalService = {
        open:  sinon.spy(),
        close: sinon.spy()
      };

      provide.value('modalService', mockModalService);
    });
  }

  function _inject() {
     inject(function ($controller) {
      scope = {};
      configurationController = $controller('ConfigurationController', {
        $scope: scope
      });
    });
  }

  function _setup() {
    _mockEventService();
    _mockConfigurationService();
    _mockModalService();

    _inject();
  }

  beforeEach(function() {
    module('teamTalk');

    _setup();
  });

  it("eventService openConfiguration", function() {
    expect(mockEventService.onOpenConfiguration.calledOnce).to.be.true;
  });

  it("open configuration modal", function() {
    var config = {test: true};

    mockConfigurationService.get.returns(config);

    configurationController.openConfiguration();

    expect(configurationController.data).to.be.equal(config);
    expect(mockModalService.open.withArgs('.configuration-lightbox').calledOnce).to.be.true;
  });

  describe("update configuration", function() {
    var config, oldConfig;

    beforeEach(function() {
      oldConfig = {old: true};
      config = {old: false};

      mockConfigurationService.get.returns(oldConfig);

      configurationController.data = config;
      configurationController.update();
    });

    it("store new configuration", function() {
      expect(mockConfigurationService.update.withArgs(config).calledOnce).to.be.true;
    });

    it("close modal", function() {
      expect(mockModalService.close.calledOnce).to.be.true;
    });

    it("notify configuration change", function() {
      expect(mockEventService.configurationChange.withArgs(config, oldConfig).calledOnce).to.be.true;

    })
  });
});
