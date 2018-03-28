<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<title>listLoading</title>
<link rel="stylesheet" type="text/css" href="../src/css/base.css" />
<link rel="stylesheet" type="text/css" href="../dist/css/listloading.min.css" />
<script src="../src/jslib/require.js"></script>
<script src="iconfont.js"></script>
<script>

require(['zepto', 'iscroll', 'listloading'], function(){
    var Listloading = require('listloading');
    var m = 3;
    var n = 0;
    var hei = $(window).height();
    var arr = ['baby_food', 'carrycot', 'feeding_bottle', 'feeding_bottle2', 'tricycle', 'rattle', 'rattle6', 'mobile', 'pin', 'safety_seat', 'pin']
    // 创建iscroll之前必须要先设置父元素的高度，否则无法拖动iscroll
    $('#listloading, .listloadingClass').height(hei);

    // 模板
    var createHtml = function(){
        var __html = '', now, x;
        for(var i = 0; i < 15; i++){
            now = new Date().getTime();
            now = new Date(now + i*1000000);
            x = Math.random().toString().substring(2,3);
            __html += '<li><span class="icon">' + 
                '<svg class="svg-icon" aria-hidden="true">\
                  <use xlink:href="#icon-' + arr[x] + '"></use>\
                </svg>'
            +'</span><p class="title"><time class="r">' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '</time>listloading' + (n++) + '</p><p class="text">移动端上拉下拉刷新组件...</li>';
        }
        return __html;
    }
    // demo
    var listloading = new Listloading('#listloading', {
        disableTime: true,  // 是否需要显示时间
        pullUpAction : function(cb){   // 上拉加载更多
            m--;
            var flg = false;
            var __html = createHtml();
            if(m < 1){
                flg = true;
            }else{
                $('#order-list').append(__html);
            }
            // 数据加载完毕需要返回 end为true则为全部数据加载完毕
            cb(flg);
            
        },
        pullDownAction : function(cb, flg){  // 下拉刷新
            // true则为默认加载 false为下拉刷新
            if (flg) {
                console.log('默认加载');
            }
            m = 3;
            var __html = createHtml();
            $('#order-list').html(__html);
            // 执行完执行方法之后必须执行回调 回调的作用是通知默认加载已经全部执行完毕，程序需要去创建iscroll或者做下拉刷新动作
            cb();
        },
        Realtimetxt: '官人不要，请放开我！',
        loaderendtxt: '我是有底线的',
        // iscroll的API 
        iscrollOptions: {
            scrollbars: false   // 显示iscroll滚动条
        }
    });

    // 点击事件
    listloading.evt('li', 'click', function (dom) {
        dom.remove();
        // $('#order-list').append(createHtml());
        listloading.refresh();
    });
    
    // demo
    // var k = 3;
    // var listloadingClass = new Listloading('.listloadingClass', {
    //     pullUpAction : function(cb){   //上拉加载更多
    //         k--;
    //         var flg = false;
    //         var __html = createHtml();
    //         if(k < 1){
    //             flg = true;
    //         }else{
    //             $('#listloadingClass-order-list').append(__html);
    //         }
    //         // 数据加载完毕需要返回 end为true则为全部数据加载完毕
    //         cb(flg);
            
    //     },
    //     pullDownAction : function(cb, flag){  //下拉刷新
    //         // flag 为true 第一次加载
    //         if (flag) {
    //             // dosomething...
    //         }
    //         k = 3;
    //         var __html = createHtml();
    //         $('#listloadingClass-order-list').html(__html);
    //         // 执行完执行方法之后必须执行回调 回调的作用是通知默认加载已经全部执行完毕，程序需要去创建iscroll
    //         cb();
    //     }
    // });
    var li = document.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        li[i].onclick = (function(i) {
            return function () {
                console.log(i)
            }
        })(i);
    }

});
require.config({
    paths: {
        "zepto": "../src/jslib/zepto.min",
        "iscroll": "../src/jslib/iscroll.min",
        "listloading": "../dist/js/listloading.min"
    }
});
</script>
</head>
<body>
<style type="text/css">
body{
    background:#E6E6E6;
}
#listloading{
    overflow:hidden;
}
.order-list>li{
    height:50px;
    line-height:24px;
    padding:10px 15px 10px 10px;
    margin:10px;
    border-radius:3px;
    box-shadow:1px 1px 2px #ccc;
    background:#fff;
}
.order-list>li>span.icon{
    float:left;
    width:50px;
    height:50px;
    line-height:50px;
    margin-right:10px;
    border-radius:50%;
    background:#FFC107;
    text-align:center;
    font-size:36px;
}
.svg-icon{
    width: 1em; height: 1em;
    vertical-align: -0.1em;
    fill: currentColor;
    overflow: hidden;
}


.order-list>li>.title{
    font-size:16px;
    color:#292929;
}
.order-list>li>.title>time.r{
    color:#666;
    font-size:12px;
}
.order-list>li>.text{
    color:#7B7B7B;
}
.listloadingClass{
    overflow:hidden;
}
</style>
<div id="listloading">
    <div>
        <ul id="order-list" class="order-list"></ul>
    </div>
</div>
<!-- <div class="listloadingClass">
    <div>
        <ul id="listloadingClass-order-list" class="order-list"></ul>
    </div>
</div> -->
</body>
</html>
