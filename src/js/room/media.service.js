class MediaService {
  constructor() {
    $(window).on('resize', this.organize.bind(this));
  }
  focus(id) {
    var elm = $(`#${id}`);

    if (elm.hasClass('fullscreen-video')) return;

    if (elm.hasClass('focus')) {
      elm.removeClass('focus');
    } else {
      $('.remotes .focus').removeClass('focus');
      elm.addClass('focus');
    }

    this.organize();
  }
  fullscreen(id) {
    var elm = $(`#${id}`);

    elm.toggleClass('fullscreen-video');
    $(document.body).toggleClass('fullscreen-active');

    this.organize();
  } //TODO: split video
  unmute(id, type) {
    var elm = $(`#${id}`);

    if (type === 'audio') {
      elm.removeClass('mutedAudio');
    } else {
      elm.removeClass('mutedVideo');
    }
  }
  mute(id, type) {
    var elm = $(`#${id}`);

    if (type === 'audio') {
      elm.addClass('mutedAudio');
    } else {
      elm.addClass('mutedVideo');
    }
  }
  remove(video) {
    $(video).closest('.video').remove();

    this.organize();
  }
  username(id, username) {
    var elm = $(`#${id}`);
    elm.attr('title', username);
  }
  create(video, peer) {
    var mute = $('<div>').addClass('mute fa fa-microphone');
    var fullscreen = $('<div>').addClass('fullscreen fa fa-arrows-alt');

    var videoWrapper = $('<div>')
      .addClass('video-wrapper')
      .append(video)
      .append(fullscreen)
      .append(mute);

    var videoEl = $('<div>')
      .attr('id', peer.id)
      .data('id', peer.id)
      .addClass('video')
      .append(videoWrapper);

    videoEl.appendTo($('.remotes'));

    this.organize();
  }
  organize() {
    var items = $('.remotes .video').removeAttr('style');

    if (!items.length) return;

    var fullscreenVideo = items.filter('.fullscreen-video');

    if (fullscreenVideo.length) {
      var videoTag = fullscreenVideo.find('video');

      fullscreenVideo.css('width', videoTag.width());
      fullscreenVideo.css('height', videoTag.height());
    } else {
      var focus = items.filter('.focus');

      items = $.makeArray(items.not('.focus'));

      var maxItemsPerRow = 3;
      var availableWidth = $('.remotes').width();
      var maxVideoWidth = 700 > availableWidth ? availableWidth : 700;
      var aspectRatio = 3 / 4;

      var itemsPerRow = items.length > maxItemsPerRow ? maxItemsPerRow : items.length;
      var videoWidth = function () {
        var width = availableWidth / itemsPerRow;

        if (width > maxVideoWidth) {
          return maxVideoWidth;
        } else {
          return width;
        }
      }();

      var videoHeight = videoWidth * aspectRatio;
      var rowCount = 0;
      var focusedHeight = 0;

      if (!focus.length && items.length === 1) {
        focus = $(items.shift());
      }

      if (focus.length) {
        focusedHeight = maxVideoWidth * aspectRatio;

        focus.css({
          top: 0,
          left: (availableWidth / 2) - (maxVideoWidth / 2),
          width: maxVideoWidth,
          height: focusedHeight,
          position: 'absolute'
        });
      }

      _.each(items, function (item) {
        var row = Math.floor(rowCount / itemsPerRow);
        var rowPosition = rowCount - row * itemsPerRow;

        var top = focusedHeight + row * videoHeight;
        var left = rowPosition * videoWidth;

        $(item).css({
          top: top,
          left: left,
          width: videoWidth,
          height: videoHeight,
          position: 'absolute'
        });

        rowCount++;
      });
    }
  }
}

angular.module('teamTalk.room').service('mediaService', MediaService);
