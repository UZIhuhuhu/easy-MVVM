import observer from './observer';
import Watcher from './watcher';

// 监听所有text节点
const watchTextNode = (element, data) => {
  [...element.childNodes].forEach(child => {
    if (!(child instanceof Text)) {
      watchTextNode(child, data);
    } else {
      // 只监听包含 {{}} 的文本节点
      if (child.nodeValue.match(/{{(.*?)}}/g)) {
        new Watcher(data, child);
      }
    }
  });
};

const bindViewToData = (root, data) => {
  // 监听数据
  observer(data);
  // 数据变化则更新对应的节点
  watchTextNode(root, data);
};

const vm = {
  appData: {
    firstName: 'tiny',
    lastName: 'huang',
    age: 13,
    list: [1, 2]
  }
};
bindViewToData(document.querySelector('#root'), vm.appData);

appData.firstName = 'mini';
appData.age = 22;
appData.list.shift();
appData.list.push(3);
