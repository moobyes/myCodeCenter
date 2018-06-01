var Lazy = {
    $: function(arg, context) {
        var tagAll, n, eles = [],
            i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Lazy.$('*');
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },
    getPos: function(node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return { top: pos.top + scrollt, right: pos.right + scrollx, bottom: pos.bottom + scrollt, left: pos.left + scrollx }
    },
    bind: function(node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },
    unbind: function(node, type, handler) {
        node.removeEventListener ? node.removeEventListener(type, handler, false) : node.detachEvent('on' + type, handler);
    },
    toArray: function(eles) {
        var arr = [];
        for (var i = 0, n = eles.length; i < n; i++) {
            arr.push(eles[i]);
        }
        return arr;
    }
};

function imgLazyLoad() {
    var timer, screenHeight = document.documentElement.clientHeight;
    // 选择所有图片
    var allimg = Lazy.$('img');
    // 筛选CLASS为lazyload的图片
    var elems = Lazy.$('.lazyload', allimg);
    // 转换为真正的数组
    elems = Lazy.toArray(elems);
    if (!elems.length) return;
    // 没有发生滚动事件时如果图片在可视范围之内，也显示
    for (var i = 0; i < elems.length; i++) {
        // 获取图像的父元素即包裹图像的元素，判断图像是否在可视区域即直接判断父元素是否可视
        var parent = elems[i].parentNode;
        var pos = Lazy.getPos(parent);
        var posT = pos.top;
        var posB = pos.bottom;
        // 没有滚动条情况如果距离顶部的距离小于屏幕的高度则赋值SRC
        if (posT < screenHeight) {
            if (elems[i].src === '') {
                elems[i].src = '';
            } else {
                elems[i].src = elems[i].getAttribute('data-img');
            }
            // 移除后，数组的长度减一，下一个下标需减一
            elems.splice(i--, 1);
        }
    }
    // 绑定scroll事件
    Lazy.bind(window, 'scroll', loading);
    Lazy.bind(window, 'resize', loading);

    function loading() {
        timer && clearTimeout(timer);
        timer = setTimeout(function() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            screenHeight = document.documentElement.clientHeight;
            for (var i = 0; i < elems.length; i++) {
                var parent = elems[i].parentNode;
                var pos = Lazy.getPos(parent);
                var posT = pos.top;
                var posB = pos.bottom;
                var screenTop = screenHeight + scrollTop;
                // 元素顶部出现在可视区  或者  元素底部出现在可视区
                if ((posT > scrollTop && posT < screenTop) || (posB > scrollTop && posB < screenTop)) {
                    // elems[i].src = elems[i].getAttribute('data-img');
                    if (elems[i].src === '') {
                        elems[i].src = '';
                    } else {
                        elems[i].src = elems[i].getAttribute('data-img');
                    }
                    elems.splice(i--, 1);
                } else {
                    // 去掉以下注释开启图片预加载
                    // new Image().src = elems[i].getAttribute('data-img');
                }
            }
            if (!elems.length) {
                Lazy.unbind(window, 'scroll', loading);
                Lazy.unbind(window, 'resize', loading);
            }
        }, 300);
    }
}