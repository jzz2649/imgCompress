/**
 * @ImgCompress.js
 * @author jiangzhognzheng
 * @version 1.0
 * @description 图片压缩
 */

 (function (global, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global.ImgCompress = factory();
    }
}(this, function(){
  'use strict';

  var ImgCompress = function (file, options) {
    var defaults = {
      sizeConstrained: 10240,
      scale: 0.6,
      onSize: 500,
      w_scale: 640,
      callback: function () {}
    };

    if (file === undefined && file === null) {
      return;
    }

    var params = {};
    options = options || {};

    if (typeof options === 'function') {
      for (var key in defaults) {
        params[key] = defaults[key];
      }
      params.callback = options;
    } else {
      for (var key in defaults) {
        if (typeof options[key] !== 'undefined') {
          params[key] = options[key];
        } else {
          params[key] = defaults[key];
        }
      }
    }

    if (typeof file !== 'object') {
      return;
    }

    var _zip = function (file, callback) {
      var size = file.size;
      var type = params.type || file.type;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var ObjectURL = null;

      if (size > params.sizeConstrained * 1024) {
        return;
      }

      var handle = function(base64){
        var img = new Image();

        img.onload = function () {
          var width = img.width;
          var height = img.height;

          if (width > params.w_scale) {
            canvas.width = params.w_scale;
            canvas.height = height * params.w_scale / width;
          } else {
            canvas.width = width;
            canvas.height = height;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          var dataURL;
          if (size > params.onSize * 1024) {
            dataURL = canvas.toDataURL(type, params.scale);
          } else {
            dataURL = canvas.toDataURL(type);
          }

          callback(dataURL);
          img = null;
          ObjectURL && URL.revokeObjectURL(ObjectURL); 
        }

        img.src = base64;
      }

      if (FileReader) {
        var render = new FileReader();
        render.onload = function(e) {
          var base64 = e.target.result;
          handle(base64)
        }

        render.readAsDataURL(file);
      } else {
        ObjectURL = URL.createObjectURL(file);
        handle(ObjectURL);
      }
    }


    _zip(file, params.callback);
  };

  return ImgCompress;
}));
