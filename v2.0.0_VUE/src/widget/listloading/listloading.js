/* jshint esversion: 6 */
/* eslint-disable */
import '../../jslib/iscroll.js';
import "!style-loader!css-loader!./listloading.css";
let timeDifference = (publishTime) => {
  let timeNow = Date.parse(new Date()),
    d = (timeNow - publishTime) / 1000;

  let dDays = parseInt(d / 86400); // 天
  let dHours = parseInt(d / 3600); // 时   
  let dMinutes = parseInt(d / 60); // 分
  let dSeconds = parseInt(d); // 秒

  if (dDays > 0 && dDays < 4) {
    return dDays + '天前';
  } else if (dDays <= 0 && dHours > 0) {
    return dHours + '小时前';
  } else if (dHours <= 0 && dMinutes > 0) {
    return dMinutes + '分钟前';
  } else if (dMinutes <= 0 && dSeconds >= 0) {
    // return dSeconds+'秒前';
    return '刚刚之前';
  } else {
    var s = new Date(publishTime);
    return s.getFullYear() + '年' + (s.getMonth() + 1) + '月' + s.getDate() + '日 ' + s.getHours() + ':' + ':' + s.getMinutes() + ':' + s.getSeconds();
  }
};

let bodyClassList = document.body.classList;

let publishEvents = (() => {
  let obj = {},
    __this = this;
  let listen = (key, eventfn) => { // 订阅
    let _ref = obj[key];
    let stack = _ref != null ? _ref : obj[key] = [];
    return stack.push(eventfn);
  };
  let one = (key, eventfn) => {
    remove(key);
    return listen(key, eventfn);
  };
  let remove = (key) => { // 解除
    let _ref = obj[key];
    let flg = _ref != null ? _ref.length = 0 : void 0;
    return flg;
  };
  let trigger = function () { // 发布
    let fn, stack, _i, _len, _ref, key;
    key = Array.prototype.shift.call(arguments);
    stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
    for (_i = 0, _len = stack.length; _i < _len; _i++) {
      fn = stack[_i];
      if (fn === undefined) return false;
      if (fn.apply(__this, arguments) === false) {
        return false;
      }
    }
  };
  return {
    listen: listen,
    one: one,
    remove: remove,
    trigger: trigger
  };
})();

// 自带工具包
let class2type = {};
'Boolean Number String Function Array Date RegExp Object Error'.split('').forEach(function (name, i) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});
let _util = {
  isFunction(value) {
    return typeof value === 'function';
  },
  type(obj) {
    return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object';
  },
  parseStringToHTML(text) {
    var i, a = document.createElement('div'),
      b = document.createDocumentFragment();
    a.innerHTML = text;
    while (a.firstChild) {
      i = a.firstChild;
      b.appendChild(i);
    }
    return b;
  },
  hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  },
  deepExtend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj) {
        continue;
      }

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            out[key] = this.deepExtend(out[key], obj[key]);
          } else {
            out[key] = obj[key];
          }
        }
      }
    }
    return out;
  }
};

function Listloading(element, options) {
  this.ele = document.querySelector(element); //[flag][yes]
  let id = this.ele.getAttribute('id');
  // 如果没有ID 则自动创建一个id
  if (!id) {
    id = 'listLoading' + Math.random().toString().replace('0.', '');
    this.ele.setAttribute('id', id); //[flag][yes]
  }
  this.id = id;

  this.children = this.ele.children[0]; //[flag][yes]

  // 如果不配置下拉刷新方法或者直接不传配置 则直接创建iscroll (v1.2.2)//[flag][yes]
  if (typeof options !== 'object' || !_util.isFunction(options.pullDownAction)) {
    let iscrollOptions = options ? options.iscrollOptions || {} : {};

    // 修复iscroll在新版chrome和其他新版浏览器(Android 7.0)无法滚动bug
    iscrollOptions.mouseWheel = true;
    this.iscroll = new IScroll('#' + id, iscrollOptions);
    return this.iscroll;
  }
  this.pullUpId = 'pullUp-' + id;
  this.pullDownId = 'pullDown-' + id;
  this.init(options);
}

Listloading.prototype = {
  version: '2.0.0',
  // 初始化
  init(options) {
    let id = this.id;
    this.options = {
      // 上拉刷新文字
      upLoadmoretxt: '<i class="icon-up"></i>上拉加载更多',
      // 下拉刷新文字
      pullDrefreshtxt: '<i class="icon-down"></i>下拉加载更多',
      // 正在加载中文字
      loadertxt: '<i class="icon-loading"></i>正在加载更多',
      // 松开刷新文字
      Realtimetxt: '松开刷新',
      // 已经全部加载完毕文字
      loaderendtxt: '已显示完全部',
      // 显示区域高度
      viewHeight: parseFloat(getComputedStyle(this.ele).height), //[flag][yes]

      // 发布订阅注册
      pullUpActionStr: 'pullUpActionStr' + id,
      pullDownActionStr: 'pullDownAction' + id
    };
    let op = this.options;
    let {pullUpActionStr, pullDownActionStr} = op;
    // 删除发布订阅
    publishEvents.remove(pullUpActionStr);
    publishEvents.remove(pullDownActionStr);

    // 继承
    _util.deepExtend(op, options); //[flag][yes]
    // 执行render
    this.render();
  },
  // 入口
  render() {
    // 创建iscroll
    this.pullDownAction(true);
  },
  // 销毁ListLoading
  destroy() {
    let childrenStyle = this.children.style;
    // 删除上拉下拉刷新节点//[flag][yes]
    childrenStyle.WebkitTransform = '';
    childrenStyle.transform = '';
    document.querySelectorAll('#' + this.pullDownId + ', #' + this.pullUpId).forEach(function (item) {
      item.remove();
    }); //[flag][yes]
    this.iscroll.destroy();
  },
  // 刷新listloading
  refresh(refresh) {
    // 重新检测是否需要创建上拉加载更多 再做刷新
    this.createPullUpEle(refresh);
  },
  // 创建上拉加载更多
  createPullUpEle(refresh) {
    let op = this.options,
      children = this.children; //[flag][yes]

    let childrenHeight = parseFloat(getComputedStyle(children).height), //[flag][yes]
      pullUpId = this.pullUpId,
      { viewHeight, pullDownOffset, pullUpOffset } = op,
      iscroll = this.iscroll;
      
    op.minScrollHeight = viewHeight + pullDownOffset; // 最小滚动高度

    // 设置最小滚动高度
    children.style.minHeight = op.minScrollHeight + 'px';
    
    // 如果加载更多存在 则不再去load pullUp
    if (this.pullUpEle) {
      childrenHeight -= pullUpOffset;
      // 检测可滚动高度是否小于最小滚动高度
      if (childrenHeight <= op.minScrollHeight) {
        this.pullUpEle.remove();
        this.pullUpEle = null;
        this.options.pullUpOffset = 0;
      }
    } else {
      // 必须有上拉加载方法  可滚动的高度必须大于可显示区域高度才会有上拉加载更多
      if (_util.isFunction(op.pullUpAction) && childrenHeight > op.minScrollHeight) {
        let html = `<div id="${pullUpId}" data-class="pullUpId">
                      <span class="pullUpLabel inlineblock-span">${op.upLoadmoretxt}</span>
                    </div>`;

        children.append(_util.parseStringToHTML(html)); //[flag][yes]

        this.pullUpEle = document.getElementById(pullUpId); //[flag][yes]

        // 上拉加载更多容器高度
        op.pullUpOffset = this.pullUpEle.offsetHeight;
      }
    }

    if (iscroll) {
      // 自定义刷新的时候 重置iscroll可以滚动的高度
      if (this.pullUpEle && !refresh) this.pullUpEle.style.height = 0; //[flag][yes]
      iscroll.refresh();
      // 自定义刷新的时候 重置iscroll可以滚动的高度
      if (this.pullUpEle && !refresh) {
        this.pullUpEle.removeAttribute('style'); //[flag][yes]
        iscroll.maxScrollY = iscroll.maxScrollY - this.options.pullUpOffset;
      }
      if (iscroll.y === 0 && !refresh) {
        this.resizeAnimate();
      }
    }
  },
  // 创建上拉下拉刷新节点
  createPullIScroll() {
    let op = this.options;
    // 时间
    let timeHtml = '';
    if (op.disableTime) {
      op.endDate = Date.parse(new Date());
      timeHtml = `<span class="time">最后更新时间：<em id="${this.id}time-em">${timeDifference(op.endDate)}</em></span>`;
    };

    // 下拉加载更多//[flag][yes]
    let pullDownEle = `<div id="${this.pullDownId}" data-class="pullDownId">
                        <span class="pullDownLabel inlineblock-span">${op.pullDrefreshtxt}</span>
                        ${timeHtml}
                      <div>`;
    pullDownEle = _util.parseStringToHTML(pullDownEle);
    
    this.children.insertBefore(pullDownEle, this.children.firstChild);
    this.pullDownEle = this.children.firstChild;
    this.options.pullDownOffset = this.pullDownEle ? this.pullDownEle.offsetHeight : 0;

    // 创建上拉加载更多
    this.createPullUpEle();
  },
  // 设置class和提示
  toggleClassText(obj, cls, labelCls, text) {
    obj.setAttribute('class', cls); //[flag][yes]
    obj.querySelector('.' + labelCls).innerHTML = text;
  },
  // 复位动画
  resizeAnimate(y) {
    let [iscroll, pullDownOffset] = [this.iscroll, this.options.pullDownOffset];
    if (!y) {
      y = -pullDownOffset;
    } else {
      // 最大滚动高度
      let maxScrollY = -iscroll.maxScrollY - pullDownOffset;
      // 防止向下滑动两次
      if (-y <= maxScrollY) {
        y = -maxScrollY;
      }
    }
    iscroll.scrollTo(0, y, 300, IScroll.utils.ease.quadratic);
  },
  // scrollEvent  按下 拖动 停止 三个动作的事件 *****
  scrollEvent() {
    let self = this,
      op = self.options,
      pullDownOffset = -op.pullDownOffset,
      {
        iscroll,
        pullDownEle,
        toggleClassText
      } = self,
      {
        pullDrefreshtxt,
        upLoadmoretxt,
        Realtimetxt,
        loadertxt
      } = op;

    // 解决微信长按识别二维码
    this.ele.addEventListener('touchstart', function (e) {
      e.returnValue = true;
    });

    // 开始
    iscroll.on('scrollStart', function () {
      if (document.querySelector('.fixedTop')) {
        return;
      }
      let pullUpEle = self.pullUpEle;
      // 开始下拉时间
      self.startPullTime = new Date().getTime();
      // 是否显示时间
      if (op.disableTime) {
        //[flag][yes]
        document.getElementById(self.id + 'time-em').innerHTML = timeDifference(op.endDate);
      }

      // 下拉
      if (pullDownEle && _util.hasClass(pullDownEle, 'loading')) {
        // 设置class和提示
        toggleClassText(pullDownEle, '', 'pullDownLabel', pullDrefreshtxt);
      } else if (pullUpEle && _util.hasClass(pullUpEle, 'loading')) { // 上拉
        // 设置class和提示
        toggleClassText(pullUpEle, '', 'pullUpLabel', upLoadmoretxt);
      }
    });

    // 移动
    iscroll.on('scrollMove', function () {
      if (document.querySelector('.fixedTop')) {
        return;
      }
      let {
          y,
          maxScrollY
        } = this,
        pullUpEle = self.pullUpEle,
        gapY = 5, // 拖动的距离
        pullDownEleCls = _util.hasClass(pullDownEle, 'flip'), //[flag][yes]
        pullUpEleCls = pullUpEle && _util.hasClass(pullUpEle, 'flip'); //[flag][yes]

      // 下拉刷新 显示向上图标
      if (y > gapY && !pullDownEleCls) {
        // 设置class和提示
        toggleClassText(pullDownEle, 'flip', 'pullDownLabel', '<i class="icon-up"></i>' + Realtimetxt);
      } else if (y < gapY && pullDownEleCls) { // 下拉刷新
        // 设置class和提示
        toggleClassText(pullDownEle, '', 'pullDownLabel', pullDrefreshtxt);
      } else if (pullUpEle && y < (maxScrollY - gapY) && !pullUpEleCls) {
        // 设置class和提示
        toggleClassText(pullUpEle, 'flip', 'pullUpLabel', '<i class="icon-down"></i>' + Realtimetxt);
      } else if (pullUpEle && y > (maxScrollY + gapY) && pullUpEleCls) {
        // 设置class和提示
        toggleClassText(pullUpEle, '', 'pullUpLabel', upLoadmoretxt);
      }
    });

    // 结束
    iscroll.on('scrollEnd', function () {
      let {
          y,
          maxScrollY
        } = this,
        pullUpEle = self.pullUpEle,
        nowDate = new Date();

      // 滚动到底自动加载更多
      if (y === maxScrollY && pullUpEle) {
        toggleClassText(pullUpEle, 'flip', 'pullUpLabel', Realtimetxt);
      }
      // 下拉结束事件
      self.endPullTime = nowDate.getTime();
      // 间隔时间
      self.totalGapTime = self.endPullTime - self.startPullTime;
      // 结束时间戳
      self.options.endDate = Date.parse(nowDate);

      // 防止拖动过快卡屏
      if (self.totalGapTime < 200) {
        if (y > pullDownOffset && y < 1) {
          // 复位动画
          self.resizeAnimate();
        }
        return;
      }
      if (pullDownEle && _util.hasClass(pullDownEle, 'flip')) { //[flag][yes]
        // 设置class和提示
        toggleClassText(pullDownEle, 'loading', 'pullDownLabel', loadertxt);
        // 下拉刷新     
        self.pullDownAction();
      } else if (pullUpEle && _util.hasClass(pullUpEle, 'flip')) {
        // 设置class和提示
        toggleClassText(pullUpEle, 'loading', 'pullUpLabel', loadertxt);
        // 上拉加载更多
        self.pullUpAction();
      } else if (y > pullDownOffset && y < 1) {
        // 复位动画
        self.resizeAnimate();
      } else if (-maxScrollY >= -y && (maxScrollY + op.pullUpOffset) > y) {
        // 复位动画
        self.resizeAnimate(maxScrollY + op.pullUpOffset);
      }
    });
  },
  // 下拉刷新     
  pullDownAction: function (flag) {
    let self = this,
      op = self.options,
      {
        pullDownAction,
        pullDownActionStr
      } = op,
      // 防止暴力拖拽 计算拖拽的间隔时间
      intervals = new Date().getTime() - self.startPullTime;

    if (_util.isFunction(pullDownAction)) {
      // 创建iscroll
      if (!this.iscroll) {
        publishEvents.listen(pullDownActionStr, function () {
          // 创建上拉下拉刷新节点
          self.createPullIScroll();

          // 默认iscroll配置
          var obj = {
            // preventDefault为false这行就是解决onclick失效问题
            // 为true就是阻止事件冒泡,所以onclick没用  但是开启这个值在微信下面拖动会有问题  滑动结束之后触发不到scrollend
            preventDefault: false,
            startY: -op.pullDownOffset,
            mouseWheel: true,
            // listLoading: true, // iscroll中_move  433行  刷新bug
            scrollbars: false // 显示iscroll滚动条
            // probeType: 3   // 这个属性是调节在scroll事件触发中探针的活跃度或者频率。有效值有：1, 2, 3。数值越高表示更活跃的探测。探针活跃度越高对CPU的影响就越大。  iscroll-probe.js
          };

          // 继承覆盖默认iscroll配置
          _util.deepExtend(obj, op.iscrollOptions); //[flag][yes]

          // 创建IScroll
          self.iscroll = new IScroll('#' + self.id, obj);

          // iscroll事件
          self.scrollEvent();
          // 移除订阅
          publishEvents.remove(pullDownActionStr);
        });
        // 回调
        pullDownAction(function () {
          // 执行订阅方法
          publishEvents.trigger(pullDownActionStr);
        }, flag);
      }
      // 防止暴力拖拽
      if (intervals >= 400) {
        publishEvents.listen(pullDownActionStr, function () {
          // 重新刷新检测是否需要上拉加载更多
          self.refresh(true);

          var pullUpEle = self.pullUpEle;
          // 加载文字
          if (pullUpEle) {
            pullUpEle.querySelector('.pullUpLabel').innerHTML = op.upLoadmoretxt; //[flag][yes]
          } else {
            // 是否重新需要创建上拉加载更多
            self.createPullUpEle();
          }
          // 加载完毕让动画停留1秒
          setTimeout(function () {
            bodyClassList.remove('iscroll'); //[flag][yes]
            // 复位动画
            self.resizeAnimate();

            // 数据加载完成后，调用界面更新方法
            self.iscroll.refresh();
            // 移除订阅
            publishEvents.remove(pullDownActionStr);
          }, 1000);
        });
        // 回调
        pullDownAction(function () {
          // 加载中禁止拖动
          bodyClassList.add('iscroll'); //[flag][yes]
          // 执行订阅方法
          publishEvents.trigger(pullDownActionStr);
        }, flag);
      }
    }
  },
  // 上拉加载更多
  pullUpAction() {
    let self = this,
      {
        startPullTime,
        iscroll,
        options
      } = self,
      {
        pullUpAction,
        pullUpActionStr,
        pullUpOffset
      } = options,
      // 防止暴力拖拽 计算拖拽的间隔时间
      intervals = new Date().getTime() - startPullTime;

    if (_util.isFunction(pullUpAction)) {
      let top = iscroll.y + pullUpOffset;
      if (intervals >= 400) {
        publishEvents.listen(pullUpActionStr, function () {
          // 重新刷新检测是否需要上拉加载更多
          self.refresh(true);
          let pullUpEle = self.pullUpEle, time = 1000,
            {loaderendtxt, pullEnd, loadertxt} = options;

          // 数据全部加载完毕
          if (pullEnd) {
            // 加载完毕让动画停留1秒
            setTimeout(function () {
              bodyClassList.remove('iscroll'); //[flag][yes]
              // 复位动画
              self.resizeAnimate(top);
            }, time);
          } else {
            bodyClassList.remove('iscroll');
            loaderendtxt = loadertxt;
            // 数据加载完成后，调用界面更新方法
            iscroll.refresh();
          }

          // 显示加载完毕文字
          pullUpEle.querySelector('.pullUpLabel').innerHTML = loaderendtxt;

          // 移除订阅
          publishEvents.remove(pullUpActionStr);
        });
        // 回调
        pullUpAction(function (pullEnd) {
          // 加载中禁止拖动
          bodyClassList.add('iscroll'); //[flag][yes]
          // 检查下拉是否完毕
          options.pullEnd = pullEnd;
          // 执行订阅方法
          publishEvents.trigger(pullUpActionStr);
        });
      } else {
        // 复位动画
        self.resizeAnimate(top);
      }
    }
  }
};
export default Listloading;