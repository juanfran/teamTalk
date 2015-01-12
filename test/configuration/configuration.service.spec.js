describe('configuration service', function() {
  var configurationService;
  var mockStorageService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _inject() {
    inject(function (_configurationService_) {
       configurationService = _configurationService_;
    });
  }

  function _setup() {
    _mockStorageService();
    _inject();
  }

  function _mockStorageService() {
    _provide(function (provide) {
      mockStorageService = {
        setObject: sinon.spy(),
        getObject: sinon.stub()
      };

      provide.value('storageService', mockStorageService);
    });
  }

  beforeEach(function () {
    module('teamTalk');
    _setup();
  });

  it('get configuration', function () {
    var defaults = {
      'username': 'anonymous',
      'capture': 'continous-transmission',
      'hotkey': null
    };

    var result = {configtest: 'example'};

    mockStorageService.getObject.withArgs('configuration', defaults).returns(result);

    var configuration = configurationService.get();

    expect(configuration).to.be.equal(result);
  });


  it('set configuration', function () {
    var config = {configtest: 'example'};

    configurationService.update(config);

    expect(mockStorageService.setObject.withArgs('configuration', config).calledOnce).to.be.true;
  });
});
