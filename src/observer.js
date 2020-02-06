import Dep from './dep';
export default function observer(data) {
  function Reactive(data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      for (let key in data) {
        if (typeof data[key] === 'object') {
          createObjectProxy(data, key, data[key]);
        } else {
          createCommonProxy(data, key, data[key]);
        }
      }
    }
  }

  function createObjectProxy(data, key, value) {
    Reactive(value);
    const dep = new Dep();
    data[key] = new Proxy(value, {
      get(target, property, receiver) {
        // 由于需要在闭包内添加 watcher，所以需要通过 Dep 定义一个全局 target 属性，暂存 watcher
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return Reflect.get(target, property, receiver);
      },
      set(target, property, value, receiver) {
        dep.notify();
        return Reflect.set(target, property, value, receiver);
      }
    });
  }

  function createCommonProxy(data, key, value) {
    const dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return value;
      },
      set(newValue) {
        if (value === newValue) return;
        value = newValue;
        dep.notify();
      }
    });
  }

  Reactive(data);
}
