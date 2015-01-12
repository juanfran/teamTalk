describe('storage service', function() {
  var storageService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _inject() {
    inject(function (_storageService_) {
      storageService = _storageService_;
    });
  }

  function _setup() {
    localStorage.clear();

    _inject();
  }

  beforeEach(function () {
    module('teamTalk');

    _setup();
  });

  it('get defaults', function () {
    var result = storageService.get('test', 'defaults');

    expect(result).to.be.equal('defaults');
  });

  it('get key', function () {
    localStorage.test = 'testLocalStorage';

    var result = storageService.get('test', 'defaults');

    expect(result).to.be.equal(localStorage.test);
  });

  it('set plain content', function () {
    var result = storageService.set('test', 'testLocalStorage');

    expect(localStorage.test).to.be.equal('testLocalStorage');
  });

  it('set object', function () {
    var obj = {'test': 'test'};

    var result = storageService.setObject('test', obj);

    expect(localStorage.test).to.be.equal(JSON.stringify(obj));
  });

  it('remove', function () {
    localStorage.test = 'testLocalStorage';

    var result = storageService.remove('test');

    expect(localStorage.test).to.be.undefined;
  });
});
