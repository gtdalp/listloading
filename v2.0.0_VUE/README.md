# vue版本listloading

> listloading是成熟移动端的上拉加载更多、下拉刷新的组件

``` bash
npm install
```
# demo运行
npm run dev


## npm安装
```javascript
npm install listloading
```

### 1、html结构
```html
<div id="listloading">
    <div>
        <ul id="order-list"></ul>
    </div>
</div>
```

### 2、引入
```javascript
import ListLoading from './listloading.js';
```
### 3、调用
```javascript

new ListLoading('#testListloading', {
    disableTime: true, // 是否需要显示时间
    pullDownAction: (cb, flg) => { // 下拉刷新
    this.listData = this.getData();
    // dom渲染完毕之后 切记一定要等待dom加载完毕之后再执行回调***
    this.$nextTick(function() {
        // 执行完执行方法之后必须执行回调 回调的作用是通知默认加载已经全部执行完毕，程序需要去创建iscroll或者做下拉刷新动作
        cb();
    });
    },
    pullUpAction: (cb) => { //上拉加载更多
    m--;
    let flg = false;
    if (m < 1) {
        flg = true;
    } else {
        this.listData = this.listData.concat(this.getData());
    }
    
    // dom渲染完毕之后 切记一定要等待dom加载完毕之后再执行回调***
    this.$nextTick(function() {
        // 数据加载完毕需要返回 end为true则为全部数据加载完毕
        cb(flg);
    });
    },
    Realtimetxt: '官人不要，请放开我！',
    loaderendtxt: '我是有底线的',
    // iscroll的API
    iscrollOptions: {
        scrollbars: true // 显示iscroll滚动条
    }
});
```