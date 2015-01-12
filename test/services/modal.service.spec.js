describe('modal service', function() {
  var modalService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _inject() {
    inject(function (_modalService_) {
       modalService = _modalService_;
    });
  }

  function _setup() {
    $(document.body).html("<div class='overlay'></div>");

    _inject();
  }

  beforeEach(function () {
    module('teamTalk');

    _setup();
  });

  it('open', function () {
    var elm = $('<div id="test">').appendTo(document.body);

    modalService.open('#test');

    expect($('#test').hasClass('active')).to.be.true;
    expect($('.overlay').hasClass('active')).to.be.true;
    expect(modalService.active.attr('id')).to.be.equal('test');
  });

  it('close', function () {
    var elm = $('<div id="test">')
      .addClass('active')
      .appendTo(document.body);

    $('.overlay').addClass('active');

    expect($('#test').hasClass('active')).to.be.true;
    expect($('.overlay').hasClass('active')).to.be.true;

    modalService.active = elm;
    modalService.close();

    expect($('#test').hasClass('active')).to.be.false;
    expect($('.overlay').hasClass('active')).to.be.false;
  });
});
