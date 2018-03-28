# listloading.js  
listloading是一个移动端的上拉、下拉加载更多的组件。主要依赖于iscroll.js v5.1.2基础上开发的组件，基础库可以使用jquery.js或者zepto.js操作dom节点，目前我是使用了zepto.js作为基础库操作dom，以jquery插件的形式存在。如果不想以插件方式使用，则只需要把listloading直接移植你需要的库里面就ok啦。listloading主要针对移动端而生，在使用浏览器自带滚动，用户体验很不友好，与Android和ios差别甚远，所以选择iscroll.js，它实现方式是使用css3动画translate 3D 转换来实现滚动效果，transform属性使用硬件加速，性能方法得到很大提高。支持Node引入，require引入.

从2.0版本开始全面使用es6语法
