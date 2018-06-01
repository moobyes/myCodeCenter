/*
 * 一些公共的工具
 */
// _dom
; (function (window, document) {
  window._dom = {
    // dom show
    show: function ($dom) {
      $dom && ($dom.style.display = "block");
    },
    // dom hide
    hide: function ($dom) {
      $dom && ($dom.style.display = "none");
    },
    // append dom
    appendDom: function ($parent, $el) {
      $parent.appendChild($el);
    },
    // remove dom
    removeDom: function ($el) {
      $el.parentNode.removeChild($el);
    },
    // append dom to body
    appendToBody: function ($el) {
      document.body.appendChild($el);
    },
    // add class
    addClass: function ($el, className) {
      if ($el.classList) {
        $el.classList.add(className);
      } else {
        $el.className += ' ' + className;
      }
    },
    // remove class
    removeClass: function ($el, className) {
      if ($el.classList) {
        $el.classList.remove(className);
      } else {
        $el.className = $el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    },
    //判断中文字符
    isChinese: function (str) {
      var strGroup = /[u00-uFF]/;
      return !strGroup.test(str);
    },
    strlen: function (str) {
      var strlength = 0;
      for (i = 0; i < str.length; i++) {
        if (_dom.isChinese(str.charAt(i)) == true) {
          strlength = strlength + 2;
        } else {
          strlength = strlength + 1;
        }
      }
      return strlength;
    }
  }
})(window, document);

// _device
; (function (window) {
  "use strict";
  var ua = navigator.userAgent;
  var device = {
    version: function () {
      return {
        mobile: /applewebkit.*mobile.*/i.test(ua),
        ios: /\(i[^;]+;( u;)? cpu.+mac os x/i.test(ua),
        android: /android/i.test(ua) || /linux/i.test(ua),
        windowsphone: /windows phone/i.test(ua),
        iPhone: /iphone/i.test(ua),
        iPad: /ipad/i.test(ua),
        webApp: !/safari/i.test(ua),
        MicroMessenger: /micromessenger/i.test(ua),
        weibo: /weibo/i.test(ua),
        uc: /ucbrowser/i.test(ua),
        qqBrowser: /mqqbrowser/i.test(ua),
        qq: /qq\//i.test(ua),
        baidu: /baidu/i.test(ua),
        memeWallet: /memewallet/i.test(ua)
      }
    }()
  };

  var android = ua.match(/(android);?[\s\/]+([\d.]+)?/);
  var ipad = ua.match(/(ipad).*os\s([\d_]+)/);
  var ipod = ua.match(/(ipod)(.*os\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iphone\sos)\s([\d_]+)/);
  var memeWallet = ua.match(/(memewallet)\/([\d+.]+)/);

  device.ios = false;
  device.android = false;
  device.iphone = false;
  device.ipad = false;
  device.androidChrome = false;
  device.memeWallet = false;

  // Android
  if (android) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.split('version/')[1].split(' ')[0];
    }
  }

  // 么么钱包
  if (memeWallet) {
    device.memeWallet = true;
    device.memeWalletVersion = memeWallet[2];
  }

  window._device = device;
})(window);

// _utils
; (function (window, document) {
  window._utils = {
    // 加载自定义样式，Toast 样式什么的
    loadCSS: function () {
      var $style = document.createElement('style');
      $style.innerText += 'html,body{padding:0;border:0;margin:0;}iframe{display:none;}';
      $style.innerText += '[name="coupon"],[name="details"]{padding:0;font-size:0;}';
      $style.innerText += '[name="coupon"]{border:0;}';
      $style.innerText += '[name="coupon"] img,[name="details"] img{width:100%}';
      // $style.innerText += '.ui-tips-mask {position:fixed;z-index:99990;width:100%;height:100%;top:0;left:0;opacity:0;visibility:hidden;-webkit-transition-duration:.3s;transition-duration:.3s;background:transparent;}';
      // $style.innerText += '.ui-tips-mask.visible {opacity:1;visibility:visible;}';
      // $style.innerText += '.ui-tips {position:fixed;z-index:99995;width:auto;height:0;margin:0;left:50%;top:35%;opacity:0;visibility:hidden;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transform:scale(0.9);transform:scale(0.9);}';
      // $style.innerText += '.ui-tips.visible {opacity:1;visibility:visible;-webkit-transform:scale(1);transform:scale(1);}';
      // $style.innerText += '.ui-tips .ui-tips-wrapper {display:inline-block;font-size:10vw;border-radius:.16em;max-width:7.4667em;background-color:rgba(0, 0, 0, 0.6);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);text-align:center;}';
      // $style.innerText += '.ui-tips .ui-tips-wrapper .ui-tips-text {padding:.76923077em 1em;font-size:0.3467em;line-height:1.38461538em;color:#fff;word-wrap:break-word;word-break:break-all;}';
      // $style.innerText += '.open-sarari-tip{font-size:10vw;line-height:0;position:fixed;z-index:99999;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.8);background-size:6.5333em 2.5333em;background-position:2.88em .2667em;background-repeat:no-repeat;';
      document.getElementsByTagName('head')[0].appendChild($style);
    },
    // 从 url 中获取 query 参数
    getQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var search = window.location.search;

      if (!search) {
        var quesMark = +window.location.href.indexOf("?") + 1;
        search = window.location.href.substr(quesMark);
      } else {
        search = search.substr(1);
      }

      var r = search.match(reg);
      if (r !== null) {
        return unescape(r[2]);
      }
      return '';
    },

    // 通过 iframe 的方式打开私有协议
    openPrivaryLink: function (url) {
      if (!url || url.indexOf('mmd') === -1) {
        return;
      }

      var $iframe = document.createElement("iframe");
      $iframe.src = url;
      $iframe.height = 0;
      $iframe.width = 0;

      _dom.appendToBody($iframe);

      // 因为加载的是私有协议，所以没办法监听 onload 事件，所以通过定时器来移除这个 iframe
      setTimeout(function () {
        _dom.removeDom($iframe);
      }, 300);
    },

    // 提示在自带浏览器中打开
    openSafariTip: function () {
      if (document.getElementsByClassName("open-sarari-tip").length > 0) {
        return;
      }

      var $node = document.createElement("div");
      _dom.addClass($node, 'open-sarari-tip');

      $node.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        _dom.removeDom(document.getElementsByClassName("open-sarari-tip")[0]);
      };

      document.body.appendChild($node);
    },
    // 唤醒 APP
    jumpToApp: function (appUrl) {
      var timer = null;

      var preventPopup = function () {
        clearTimeout(timer);
        timer = null;
        window.removeEventListener('pagehide', preventPopup);
        document.removeEventListener('pagehide', preventPopup);
        document.removeEventListener('visibilitychange', preventPopup);
        document.removeEventListener('webkitvisibilitychange', preventPopup);
      };

      window.addEventListener('pagehide', preventPopup);
      document.addEventListener('pagehide', preventPopup);
      document.addEventListener('visibilitychange', preventPopup);
      document.addEventListener('webkitvisibilitychange', preventPopup);

      if (_device.version.MicroMessenger || _device.version.weibo || _device.version.qq) {
        if (_device.ios && (+(/\d+\.\d+/).exec(_device.osVersion)[0] >= 9)) {
          window.location.href = appUrl.replace("mmd://", _config.memeDownloadUrl + "#");
        } else {
          _utils.openSafariTip();
        }
      } else {
        // alert(navigator.userAgent)
        var time = 1000;
        var iframe = document.createElement('iframe');
        iframe.style.cssText = 'display:none;width=0;height=0';
        iframe.src = appUrl;
        document.body.appendChild(iframe);

        timer = setTimeout(function () {
          window.location.href = _config.memeDownloadUrl;
        }, time);
      }
    },
    
  };
})(window, document);