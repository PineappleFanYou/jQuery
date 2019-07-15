/**
 *  目的：
 *    仿照jquery，封装一个js文件
 *    该js文件具备哪些功能
 *      1.获取元素
 *      2.css方法
 *      3.操作类名 addClass/removeClass/toggleClass
 *      4....
 *
 *  jq中获取元素
 *    $(css选择器)
 * */

// 自调用函数的目的是：形成一个局部作用域，把我们自己的代码保护起来，不会被别人的代码影响
;
(function () {
    // 第一个要做的是：模仿jq里面获取元素
    // $(css选择器)
    function jQuery(selector) {
        // document.querySelectorAll 返回值是一个伪数组 - 是NodeList构造函数的实例对象
        return new Init(selector);
    }
    // 我们要给原型加方法，就需要自己写一个构造函数
    function Init(selector) {
        let nodeList = document.querySelectorAll(selector);
        // 遍历nodeList伪数组，把里面的每一个都拿出来，作为我自己的伪数组的元素
        for (let i = 0; i < nodeList.length; i++) {
            this[i] = nodeList[i];
        }
        // 给伪数组加一个长度属性
        this.length = nodeList.length;
    }
    /**
     * jq的css方法，有两个功能
     *    设置css样式
     *      jq对象.css(属性名,属性值)
     *    获取css样式
     *      jq对象.css(属性名)
     * 
     *  */
    // 设置css样式的时候，需要两个值，传参数进去
    Init.prototype.css = function (property, value) {
        // 如果没有传入第二个参数，那就是获取，所以要判断用户到底是传入几个参数
        //因为 value是第二个参数，如果没有第二个参数，那就是undefined
        if (value == undefined) {
            //这个只有一个参数的是获取
            //通常我们要获取背景颜色，肯定是精准的某个元素，通常情况下，我们在伪数组里面只拿出一个，所以它是第0个
            // getComputedStyle 获取任意样式，返回一个对象，对象我们通过键的方式获取
            return window.getComputedStyle(this[0])[property];
        } else {
            // 这个有两个参数的是设置
            // 有一个数组，里面存储了所有的需要带单位的属性名
            // 简单处理带单位的数组   
            let pxArr = ['width', 'height', 'top', 'left', 'right', 'buttom']
            // 元素对象.style.css属性 = 新的值;
            // 元素对象是哪个 ？我们用console.log()打印一下
            // 把伪数组中的每一个都遍历，设置它的css样式属性
            for (let i = 0; i < this.length; i++) {
                // console.log(this[i])  /* 这里的this[i] 代表了每个div的盒子 */
                //由于我们还不确定用户是要设置哪一个css的属性，所以我们需要用参数的形式在表示，用参数传进来
                // 把要带单位的属性和不带单位的属性区分开,主要是我们不知道用户是设置长宽高还是设置其他颜色之类的，所以我们要区分开了，除了长宽高有单位，其他的都没有
                if (pxArr.indexOf(property) !== -1) {
                    // 不等于 -1的情况下，那就是传入参数是我呢吧简单处理的数组里面的几个字符串
                    //我们这里需要判断，有些用户可能在输入时候就写了单位，所以我们要判断用户是否写了单位，如果写了，那我们就不加单位
                    // 字符串的indexOf方法  如果用户在字符串里面输入的没有px，那么就是 -1
                    // console.log('abcdef'.indexOf('g'));
                    if (value.toString().indexOf('px') === -1) {
                        // 如果没有带单位，那么我们就给加上
                        this[i].style[property] = value + 'px';
                    } else {
                        //如果有带单位，我们就不管
                        this[i].style[property] = value;
                    }
                } else {
                    //如果不是那几个，那么久全部不需要带单位
                    this[i].style[property] = value;
                }
            }
            //最后返回this，用于实现链式编程
            //其实是返回给函数，然后函数赋值给css
            return this;
        }

    }

    /* 
        实现addClass功能
        jq对象.addClass(类名)
    */
    Init.prototype.addClass = function (className) {
        // 循环遍历伪数组，把里面的每个元素都实现添加类名
        for (let i = 0; i < this.length; i++) {
            this[i].classList.add(className);
        }
        return this;
    }

    // 移除类名 jq对象.removeClass(类名)
    Init.prototype.removeClass = function (className) {
        //循环遍历伪数组，让每个元素都实现类名的移除
        for (let i = 0; i < this.length; i++) {
            this[i].classList.remove(className);
        }
        return this;
    }

    // 切换类名  jq对象.toggleClass
    Init.prototype.toggleClass = function (className) {
        //循环遍历，让每个元素都可以实现类名的切换
        for (let i = 0; i < this.length; i++) {
            this[i].classList.toggle(className);
        }
        return this;
    }
    window.$ = window.jQuery = jQuery;
})();