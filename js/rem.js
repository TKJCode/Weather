(function () {
    // 定义
    function setRem() {
        // 获取屏幕宽度(页面宽度)
        let pageWidth = innerWidth;
        // console.log('pageWidth =>', pageWidth);

        // 以 iPhone6(375*667)为标准屏设置 rem
        // 设置 html的 font-size: 100px;(即在 iPhone6中, 1rem = 100px)
        let baseWidth = 375;
        let fontSize = pageWidth / baseWidth * 100;
        // console.log('fontSize =>', fontSize);

        // 获取页面上的元素
        document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
    }

    // 调用
    setRem();

    // 当窗口屏幕大小变动时,重新调用
    window.onresize = function() {
        setRem();
    }
})()