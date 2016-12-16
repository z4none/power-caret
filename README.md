# power-caret

增强 HTML 页面中光标输入效果

styled HTML text input caret

inspired by [activate-power-mode](https://github.com/JoelBesada/activate-power-mode)

[Live demo](http://z4none.coding.me/power-caret/example.html)

files

 * dist/particles.js / 粒子效果 / fireworks particle effect
 
 * dist/power-caret.css / 文本框以及光标基本样式 / basic style of input and caret
 
 * dist/power-caret.js / jQuery 插件 / jQuery plugin of power-caret

dependence

* dep/caret-coordinates.js / 获取光标位置 / get caret coordinates

* dep/jquery-2.1.4.min.js / jQuery

* dep/sketch.min.js / 粒子系统 / particle system

usage

``` javascript
$(".test").powerCaret({
    onCaretMove: function(e, x, y){
        if(e.type != "input") return;

        // generate particle while typing
        for ( i = 0; i < random( 3, 7 ); i++ ) 
        {
            canvas.spawn(x, y);
        }
    }
});
```