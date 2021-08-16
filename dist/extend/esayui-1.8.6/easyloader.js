/**
 * EasyUI for jQuery 1.8.6
 * 
 * Copyright (c) 2009-2019 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
/**
 * easyloader - EasyUI for jQuery
 * 
 */
(function () {
  var modules = {
    draggable: {
      js: 'jquery.draggable.js'
    },
    droppable: {
      js: 'jquery.droppable.js'
    },
    resizable: {
      js: 'jquery.resizable.js'
    },
    linkbutton: {
      js: 'jquery.linkbutton.js',
    },
    progressbar: {
      js: 'jquery.progressbar.js',
    },
    panel: {
      js: 'jquery.panel.js',
    },
    window: {
      js: 'jquery.window.js',
      dependencies: ['resizable', 'draggable', 'panel']
    },
    dialog: {
      js: 'jquery.dialog.js',
      dependencies: ['linkbutton', 'window']
    },
    messager: {
      js: 'jquery.messager.js',
      dependencies: ['linkbutton', 'dialog', 'progressbar']
    },
    parser: {
      js: 'jquery.parser.js'
    },
  };

  var locales = {
    'zh_CN': 'easyui-lang-zh_CN.js'
  };

  var queues = {};

  function loadJs(url, callback) {
    var done = false;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.src = url;
    script.onload = script.onreadystatechange = function () {
      if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
        done = true;
        script.onload = script.onreadystatechange = null;
        if (callback) {
          callback.call(script);
        }
      }
    }
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function runJs(url, callback) {
    loadJs(url, function () {
      document.getElementsByTagName("head")[0].removeChild(this);
      if (callback) {
        callback();
      }
    });
  }

  function loadCss(url, callback) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'screen';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
    if (callback) {
      callback.call(link);
    }
  }

  function loadSingle(name, callback) {
    queues[name] = 'loading';

    var module = modules[name];
    var jsStatus = 'loading';
    var cssStatus = (easyloader.css && module['css']) ? 'loading' : 'loaded';

    if (easyloader.css && module['css']) {
      if (/^http/i.test(module['css'])) {
        var url = module['css'];
      } else {
        var url = easyloader.base + 'themes/' + easyloader.theme + '/' + module['css'];
      }
      loadCss(url, function () {
        cssStatus = 'loaded';
        if (jsStatus == 'loaded' && cssStatus == 'loaded') {
          finish();
        }
      });
    }

    if (/^http/i.test(module['js'])) {
      var url = module['js'];
    } else {
      var url = easyloader.base + 'plugins/' + module['js'];
    }
    loadJs(url, function () {
      jsStatus = 'loaded';
      if (jsStatus == 'loaded' && cssStatus == 'loaded') {
        finish();
      }
    });

    function finish() {
      queues[name] = 'loaded';
      easyloader.onProgress(name);
      if (callback) {
        callback();
      }
    }
  }

  function loadModule(name, callback) {
    var mm = [];
    var doLoad = false;

    if (typeof name == 'string') {
      add(name);
    } else {
      for (var i = 0; i < name.length; i++) {
        add(name[i]);
      }
    }

    function add(name) {
      if (!modules[name]) return;
      var d = modules[name]['dependencies'];
      if (d) {
        for (var i = 0; i < d.length; i++) {
          add(d[i]);
        }
      }
      mm.push(name);
    }

    function finish() {
      if (callback) {
        callback();
      }
      easyloader.onLoad(name);
    }

    var time = 0;
    function loadMm() {
      if (mm.length) {
        var m = mm[0];	// the first module
        if (!queues[m]) {
          doLoad = true;
          loadSingle(m, function () {
            mm.shift();
            loadMm();
          });
        } else if (queues[m] == 'loaded') {
          mm.shift();
          loadMm();
        } else {
          if (time < easyloader.timeout) {
            time += 10;
            setTimeout(arguments.callee, 10);
          }
        }
      } else {
        if (easyloader.locale && doLoad == true && locales[easyloader.locale]) {
          var url = easyloader.base + 'locale/' + locales[easyloader.locale];
          runJs(url, function () {
            finish();
          });
        } else {
          finish();
        }
      }
    }

    loadMm();
  }

  easyloader = {
    modules: modules,
    locales: locales,

    base: '.',
    theme: 'material-teal',
    css: true,
    locale: "zh_CN",
    timeout: 2000,

    load: function (name, callback) {
      if (/\.css$/i.test(name)) {
        if (/^http/i.test(name)) {
          loadCss(name, callback);
        } else {
          loadCss(easyloader.base + name, callback);
        }
      } else if (/\.js$/i.test(name)) {
        if (/^http/i.test(name)) {
          loadJs(name, callback);
        } else {
          loadJs(easyloader.base + name, callback);
        }
      } else {
        loadModule(name, callback);
      }
    },

    onProgress: function (name) { },
    onLoad: function (name) {
      if (name == "validatebox") {
        $.fn.validatebox.defaults = $.extend({}, $.fn.validatebox.defaults, { tipPosition: "bottom" })
      }
    }
  };

  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].src;
    if (!src) continue;
    var m = src.match(/easyloader\.js(\W|$)/i);
    if (m) {
      easyloader.base = src.substring(0, m.index);
    }
  }

  window.using = easyloader.load;

  if (window.jQuery) {
    jQuery(function () {
      easyloader.load('parser', function () {
        jQuery.parser.parse();
      });
    });
  }

})();
