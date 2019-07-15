/* 



*/


;
(function () {
    function jQuery(selector) {
        return new Init(selector);
    }
    //我们虽然可以直接返回一个选择器，但是如果是这样的话，我们的方法就返回不了了
    function Init(selector) {
        let dom = document.querySelectorAll(selector);
        // 用for 循环找出每一个 元素
        for (let i = 0; i < dom.length; i++) {
            //把dom里面的每个元素都存到 this 里面去， this 在这里指向的是实例对象， 就是说存到 我们创建的实例对象里面，然后返回给用户,因为我们在使用别人的jQuery时候，会发现，我们在选择选择器的时候，给我们返回始终是一个伪数组，记住，始终是一个伪数组，所以我们模仿他们的话，也要在用户输入选择器的时候，遍历所有的选择器，找到合适的，把合适的都给用户，让用户自己用索引筛选
            for (let i = 0; i < dom.length; i++) {
                // 把dom 里面的所有的选择器存入到实例对象里面
                this[i] = dom[i];
            }
            // 既然是伪数组，那就有长度
            this.length = dom.length;
        }
    }
    //原型对象.prototype.方法 = function() {}
    Init.prototype.css = function (property, value) {
        //既然我们的选择器都不止一个，那么我们在设置样式的时候也一样，不能只给一个设置，或者分不清楚给哪个设置，所以我们把所有的样式都给用户，让用户自己选择
        for (let i = 0; i < this.length; i++) {
            //this.style属性名 = value + 'px'  属性有很多，属性不一样，value也不一样，所以我们把不确定的东西可以当成参数传进来
            //我们这样来看就很明显了， this 指向的是我们要设置 的box 盒子
            this[i].style[property] = value + 'px';
        }
    }
    window.$ = window.jQuery = jQuery;
})();