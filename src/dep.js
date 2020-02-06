export default class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach(item => {
      item.update();
    });
  }
}
Dep.target = null;
