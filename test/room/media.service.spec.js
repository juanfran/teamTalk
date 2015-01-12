describe("media service", function() {
  var mediaService;

  function _inject() {
    inject(function (_mediaService_) {
       mediaService = _mediaService_;
    });
  }

  function _setup() {
    $(document.body).html("<div id='test'></div><div class='remotes'><div class='focus'></div></div>");
    _inject();
  }

  beforeEach(function() {
    module('teamTalk');

    _setup();
  });

  after(function() {
    $(document.body).html("");
  });

  describe("focus", function() {
    it("remove focus and organize", function() {
      $('#test').addClass('focus');

      mediaService.organize = sinon.spy();

      mediaService.focus('test');

      expect($('#test').hasClass('focus')).to.be.false;
      expect(mediaService.organize.calledOnce).to.be.true;
    });

    it("add focus, remove old focus and organize", function() {
      mediaService.organize = sinon.spy();

      mediaService.focus('test');

      expect($('#test').hasClass('focus')).to.be.true;
      expect($('.remotes .focus').length).to.be.equal(0);
      expect(mediaService.organize.calledOnce).to.be.true;
    });
  });

  describe("fullscreen", function() {
    it("add fullscreen", function() {
      mediaService.organize = sinon.spy();

      mediaService.fullscreen('test');

      expect($('#test').hasClass('fullscreen-video')).to.be.true;
      expect($(document.body).hasClass('fullscreen-active')).to.be.true;
      expect(mediaService.organize.calledOnce).to.be.true;
    });

    it("remove fullscreen", function() {
      mediaService.organize = sinon.spy();

      $('#test').addClass('fullscreen-video');
      $(document.body).addClass('fullscreen-active');

      mediaService.fullscreen('test');

      expect($('#test').hasClass('fullscreen-video')).to.be.false;
      expect($(document.body).hasClass('fullscreen-active')).to.be.false;
      expect(mediaService.organize.calledOnce).to.be.true;
    });
  });

  describe("unmute", function() {
    it("unmute audio", function() {
      $('#test').addClass('mutedAudio');

      mediaService.unmute('test', 'audio');

      expect($('#test').hasClass('mutedAudio')).to.be.false;
    });

    it("unmute video", function() {
      $('#test').addClass('mutedVideo');

      mediaService.unmute('test', 'video');

      expect($('#test').hasClass('mutedVideo')).to.be.false;
    });
  });

  describe("mute", function() {
    it("mute audio", function() {
      mediaService.mute('test', 'audio');

      expect($('#test').hasClass('mutedAudio')).to.be.true;
    });

    it("mute video", function() {
      mediaService.mute('test', 'video');

      expect($('#test').hasClass('mutedVideo')).to.be.true;
    });
  });

  it("remove video", function() {
    mediaService.organize = sinon.spy();

    var videoWrapper = $("<div class='video'>");
    $("<div id='video'>").appendTo(videoWrapper);

    $(document.body).append(videoWrapper);

    mediaService.remove($('#video'));

    expect($('.video')).to.have.length(0);
    expect(mediaService.organize.calledOnce).to.be.true;
  });

  it("create video", function() {
    mediaService.organize = sinon.spy();
    var video = $("<div id='video'>");

    var peer = {
      id: 'testVideo'
    }

    mediaService.create(video, peer);

    var testVideo = $("#testVideo");
    var videoWrapper = testVideo.find('.video-wrapper');

    expect(testVideo.hasClass('video')).to.be.true;
    expect(videoWrapper.parent().hasClass('video')).to.be.true;
    expect(videoWrapper.find('.mute.fa.fa-microphone')).to.have.length(1);
    expect(videoWrapper.find('.fullscreen.fa.fa-arrows-alt')).to.have.length(1);
    expect(testVideo.parent().hasClass('remotes')).to.be.true;
    expect($('#video').parent().hasClass('video-wrapper')).to.be.true;
    expect(mediaService.organize.calledOnce).to.be.true;
  });

  // it("organize", function() {
  // visual test
  // })
});
