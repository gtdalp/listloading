<template>
  <div id="testListloading">
    <div>
        <ul id="order-list" class="order-list">
          <li v-for="(it, index) in listData" @click="liClick(index, it.time)" :key="it.time" :class="it.cls">
            <span class="icon">
              <svg class="svg-icon" aria-hidden="true">
                <use :xlink:href="'#icon-' + it.cls"></use>
              </svg>
            </span>
            <p class="title">
              <time class="r">{{it.time}}</time>
              <span class="textOverflow">上拉下拉刷新组件Tile</span>
            </p>
            <p class="text">移动端上拉下拉刷新组件...</p>
          </li>
        </ul>
    </div>
</div>
</template>

<script>
/* jshint esversion: 6 */
/* eslint-disable */
import './iconfont.js';
import ListLoading from './listloading.js';
export default {
  name: 'listloading',
  components: {
  },
  data() {
    return {
      listData: [],
      listloading: null,
      cls: ['baby_food', 'carrycot', 'feeding_bottle', 'feeding_bottle2', 'tricycle', 'rattle', 'rattle6', 'mobile', 'pin', 'safety_seat', 'carrycot', 'feeding_bottle', 'feeding_bottle2', 'tricycle', 'rattle', 'rattle6', 'mobile', 'pin', 'safety_seat', 'pin']
    };
  },
  methods: {
    liClick (n, time) {
      this.listData.splice(n, 1);
      if (this.listloading != null) {
        // dom渲染完毕之后
        this.$nextTick(function() {
          console.log('删除当前点击li的时间是:' + time);
          // 改变dom节点高度需要重新刷新
          this.listloading.refresh();
        });
      }
    },
    getData () {
      let arr = [],
        cls = this.cls,
        clsLen = cls.length;
      
      for (let i = 0; i < clsLen; i++) {
        let now = new Date().getTime();
        now = new Date(now + i * 1000000);
        now = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        arr.push({cls: cls[i], time: now});
      }
      return arr;
    }
  },
  computed: {
  },
  mounted () {
    let m = 1;
    this.listloading = new ListLoading('#testListloading', {
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,h2,h3,h4,h5,h6{
    margin:0;
    font-size:100%;
}
p,dl,dd,form,figure{
    margin:0;
}
td,th{
    padding:0;
}
a,a:hover,time{
    text-decoration:none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color:transparent;
}
ol,ul{
    padding:0;
    margin:0;
    list-style:none;
}
li{
    list-style-type:none;
}
table{
    border-collapse:collapse;
}
img{
    border:none;
    vertical-align:middle;
}
em,i{
    font-style:normal;
}
textarea,input{
    padding:0;
    margin:0;
    resize:none;
    outline:none;
    font-family:"Arial", 'Microsoft YaHei';
    vertical-align:middle;
    -webkit-appearance:none;
    color:#333;
}
#testListloading{
  background: #e6e6e6;
  height: 100vh;
  overflow: hidden;
}
#order-list>li{
  height: 50px;
  line-height: 24px;
  padding: 10px 15px 10px 10px;
  margin: 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 2px #ccc;
  background: #fff;
}
.order-list > li > span.icon {
  float: left;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  background: #ffc107;
  text-align: center;
  font-size: 36px;
}
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.1em;
  fill: currentColor;
  overflow: hidden;
}

.order-list > li > .title {
  height:20px;
  font-size: 13px;
  color: #292929;
}
.order-list > li > .title > time.r {
  color: #666;
  font-size: 12px;
}
.order-list > li > .text {
  color: #ccc;
}
.listloadingClass {
  overflow: hidden;
}
</style>
