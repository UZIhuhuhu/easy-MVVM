import Dep from './dep';

const createProxy = data => {
  const dep = new Dep();
  return new Proxy(data, {
    get(target, property, receiver) {
      // 由于需要在闭包内添加 watcher，所以需要通过 Dep 定义一个全局 target 属性，暂存 watcher
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (Reflect.get(receiver, key) === value) {
        return;
      }
      console.log(value);
      const result = Reflect.set(target, property, observer(value), receiver);
      dep.notify();
      return result;
    }
  });
};

export default function observer(data) {
  if (!(Object.prototype.toString.call(data) === '[object Object]')) {
    return data;
  }
  Object.keys(data).forEach(key => {
    data[key] = observer(data[key]);
  });
  return createProxy(data);
}
