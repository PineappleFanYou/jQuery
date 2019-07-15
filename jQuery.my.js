/* 
模仿jQuery 封装函数
*/

;
(function () {
    // 实现简单的jq - 小demo，可能不会太全面，会有不少考虑不周全的地方，如果自己想要把他改周全，可以自己研究
    //实现基本的选择器
    //$(css的选择器)
    //为了可以让代码重复使用，所以我们这里要自定义一个构造函数
    //selector 是选择器的意思，我们现在就是想要实现基本选择器的功能
    // 我们这里封装一个函数，是因为到时候可以直接调用，比如： jQuery('.box'),这样的话就可以直接调用方法了
    function jQuery(selector) {
        // 为了使用的时候更加简单一点，在new的基础上在包一层
        //我们获取选择器的时候是：document.querySelectorAll(选择器); 现在选择器是一个参数，把它返回，就可以直接调用jQuery
        // return document.querySelectorAll(selector);
        return new Init(selector);
    }
    // 我们需要把所有的方法放在原型对象身上,那么我们什么时候有原型对象？ 有构造函数的时候
    function Init(selector) {
        // jq对象要求是一个伪数组，什么是伪数组 ： 使用数字作为属性名的对象
        let dom = document.querySelectorAll(selector);
        for (let i = 0; i < dom.length; i++) {
            //构造函数逇this指向实例对象
            //我们遍历的时候，把每一个元素取出来，遍历一次去一个，然后存入的实例对象里面，形成一个自己新建的伪数组
            this[i] = dom[i];
        }
        // 伪数组是有长度的
        this.length = dom.length;
    }
    //原型对象.prototype.方法 = function() {}
    Init.prototype.css = function (property, value) {
        //原型对象身上的方法里面的this，指向调用方法的实例对象，或者可以理解成，谁调用的就指向谁
        // console.log(this);
        // 需要遍历this伪数组，把里面的每个元素的样式都进行修改
        //this 指向的是每一个box
        for (let i = 0; i < this.length; i++) {
            // console.log(this[i]); /* 指向的是每一个div box 的盒子 */
            // this[i].style.属性名   属性名是会变的，所以我们应该把属性名当成一个参数传进来
            this[i].style[property] = value + 'px';
        }
    }
    //这样就可以调用了
    // 把封装的jQuery函数变成window的一个属性，让外面可以使用
    //如果我们不这样，那么当我们在外面引入的时候，是没有办法使用的
    window.$ = window.jQuery = jQuery;
})();