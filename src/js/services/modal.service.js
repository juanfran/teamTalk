class ModalService {
  constructor() {
    this.overlay = $('.overlay');
    this.overlay.on('click', this.close.bind(this));
  }
  open(selector) {
    this.active = $(selector);
    this.active.addClass('active');

    $(".overlay").addClass('active');
  }
  close() {
    this.overlay.removeClass('active');
    this.active.removeClass('active');
  }
}

angular.module('teamTalk').service('modalService', ModalService);
