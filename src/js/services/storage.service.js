class StorageService {
  get(key, defaults) {
    if (localStorage[key]) {
      return localStorage[key];
    } else {
      return defaults;
    }
  }
  getObject(key, defaults) {
    defaults = JSON.stringify(defaults);

    return JSON.parse(this.get(key, defaults));
  }
  set(key, value) {
    localStorage[key] = value;
  }
  setObject(key, value) {
    this.set(key, JSON.stringify(value))
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}

angular.module('teamTalk').service('storageService', StorageService);
