// 弹出框
;
(function (window, document) {
  window.mimeTip = {
    timeout: 3000,
    timer: null,
    open: function (params) {
      if (typeof (params) === "string") {
        params = {
          "text": params
        };
      }
      this.timeout = isNaN(+params.timeout) ? 3000 : +params.timeout;

      var self = this;
      var masks$ = document.getElementsByClassName("ui-tips-mask");
      var tips$ = document.getElementsByClassName("ui-tips");
      for (var i = 0; i < masks$.length; i++) {
        _dom.removeDom(masks$[i]);
      }
      for (var i = 0; i < tips$.length; i++) {
        _dom.removeDom(tips$[i]);
      }
      clearTimeout(this.timer);

      var $maskDiv = document.createElement("div");
      var $tipDiv = document.createElement("div");
      var $tipWrapper = document.createElement("div");
      var $tipsText = document.createElement("div");
      _dom.appendToBody($maskDiv);
      _dom.appendToBody($tipDiv);

      _dom.addClass($maskDiv, 'ui-tips-mask');
      _dom.addClass($tipDiv, 'ui-tips');
      _dom.addClass($tipWrapper, 'ui-tips-wrapper');
      _dom.addClass($tipsText, 'ui-tips-text');

      $tipsText.innerText = params.text || '';

      _dom.appendDom($tipWrapper, $tipsText);
      _dom.appendDom($tipDiv, $tipWrapper);

      setTimeout(function () {
        _dom.addClass($maskDiv, 'visible');
        _dom.addClass($tipDiv, 'visible');
      }, 0);

      if (this.timeout > 0) {
        this.timer = setTimeout(function () {
          self.close();
        }, this.timeout);
      }
    },
    close: function () {
      var masks$ = document.getElementsByClassName("ui-tips-mask");
      var tips$ = document.getElementsByClassName("ui-tips");
      for (var i = 0; i < masks$.length; i++) {
        (function (index) {
          _dom.removeClass(masks$[index], 'visible');
          setTimeout(function () {
            _dom.removeDom(masks$[index]);
          }, 300);
        }(i));
      }
      for (var i = 0; i < tips$.length; i++) {
        (function (index) {
          _dom.removeClass(tips$[index], 'visible');
          setTimeout(function () {
            _dom.removeDom(tips$[index]);
          }, 200);
        }(i));
      }
    }
  }
})(window, document);
