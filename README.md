# imgCompress
图片压缩小插件

##使用示意

1. 引入js文件，例如

``` html
<script src="imgCompress.js"></script>
```

2. 使用方法
``` javascript
	调用ImgCompress(file, options)
	1.file:是文件
	2.options:配置选项，可以是回调方法
```

##配置

以下默认配置
``` options
ImgCompress(file, {
  sizeConstrained: 10240,//限制压缩大小(单位kb，可选)
  scale: 0.6,//压缩比例(范围0~1，可选)
  onSize: 500,//大于500kb启动压缩(可选)
  w_scale: 640,//宽度大于640px进行裁剪(可选)
  type: "image/jpeg",//文件类型(默认根据文件判断，可选)
  callback: function () {},//回调方法,包含一个参数base64(文件的base64编码字符串，可选)
})
```
如果option是方法，赋值给options的callback方法

##说明
有问题，欢迎提出
