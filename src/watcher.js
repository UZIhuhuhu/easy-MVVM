import Dep from './dep';

export default class Watcher {
  constructor(data, node) {
    this.node = node;
    this.data = data;
    this.nodeValue = node.nodeValue;
    this.get();
  }
  // 模版解析
  eval(result) {
    return new Function(...Object.keys(this.data), `return ${result}`)(
      ...Object.values(this.data)
    );
  }
  get() {
    Dep.target = this;
    // 初始化
    this.update();
    Dep.target = null;
  }
  // update view
  update() {
    // 匹配到 {{}}
    const newValue = this.nodeValue.replace(/{{(.*?)}}/g, result => {
      result = result.replace(/{{|}}/g, '');
      return this.eval(result);
    });
    this.node.nodeValue = newValue;
  }
}
