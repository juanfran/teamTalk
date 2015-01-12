describe('push to talk service', function() {
  var pushToTalkService;
  var mockWebrtcService;

  function _provide(callback) {
    module(function ($provide) {
      callback($provide);
    });
  }

  function _inject() {
    inject(function (_pushToTalkService_) {
       pushToTalkService = _pushToTalkService_;
    });
  }

  function _setup() {
    _mockWebrtcService();
    _inject();
  }

  function _mockWebrtcService() {
    _provide(function (provide) {
      mockWebrtcService = {
        mute: sinon.spy(),
        unmute: sinon.spy(),
      };

      provide.value('webrtcService', mockWebrtcService);
    });
  }

  beforeEach(function () {
    module('teamTalk');
  });

  it('start assing keycode, mute and init events', function () {
    _setup();

    pushToTalkService.initEvents = sinon.spy();

    pushToTalkService.start('F');

    expect(pushToTalkService.buttonKeyCode).to.be.equal('F');
    expect(pushToTalkService.initEvents.calledOnce).to.be.true;
    expect(mockWebrtcService.mute.calledOnce).to.be.true;
  });

  it('unmute when the configured button is pressend', function () {
    _setup();

    buttonKeyCode = 'X';

    pushToTalkService.buttonKeyCode = buttonKeyCode;

    pushToTalkService.keyEvent({
      keyCode: buttonKeyCode,
      type: 'keydown'
    });

    expect(mockWebrtcService.unmute.calledOnce).to.be.true;
    expect(mockWebrtcService.mute.called).to.be.false;
  });

  it('mute when the configured button is released', function () {
    _setup();

    buttonKeyCode = 'X';

    pushToTalkService.buttonKeyCode = buttonKeyCode;

    pushToTalkService.keyEvent({
      keyCode: buttonKeyCode,
      type: 'keyup'
    });

    expect(mockWebrtcService.mute.calledOnce).to.be.true;
    expect(mockWebrtcService.unmute.called).to.be.false;
  });

  it('invalid button', function () {
    _setup();

    buttonKeyCode = 'X';

    pushToTalkService.buttonKeyCode = buttonKeyCode;

    pushToTalkService.keyEvent({
      keyCode: 'Z',
      type: 'keyup'
    });

    pushToTalkService.keyEvent({
      keyCode: 'Z',
      type: 'keydown'
    });

    expect(mockWebrtcService.mute.called).to.be.false;
    expect(mockWebrtcService.unmute.called).to.be.false;
  });
});
