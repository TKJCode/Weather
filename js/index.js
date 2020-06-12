$(function () {

    // 获取下标
    let index = 0;

    // 保存天气数据
    let weatherData = {};

    // 切换标签
    $('.title-item').on('click', function () {
        // 获取当前点击下划线的下标
        let currentIndex = $(this).index();
        console.log('index =>', currentIndex);

        // 如果当前已经选中,拦截返回
        if (index == currentIndex) {
            console.log('当前已选中!');
            return;
        }

        // 获取 html的 font-size
        let fontSize = parseFloat($('html').css('font-size'));
        console.log('fontSize =>', fontSize);

        // 获取当前元素的宽度
        let currentWidth = $(this).width();
        console.log('currentWidth =>', currentWidth);

        // 将 currentWidth的 px值转成 rem值
        // 0.4rem是 margin-left值
        let distance = currentWidth / fontSize + 0.4;
        console.log('distance =>', distance);

        // 移动下划线
        $('.move-line').animate({
            left: currentIndex * distance + 'rem'
        }, 200)

        index = currentIndex;

        // 打印输出保存的天气数据
        console.log('weatherData =>', weatherData);

        // 获取data-type属性,方便动态获取数据
        let type = $(this).data('type');
        console.log(type);

        // 获取天气数据
        let weadata = weatherData.HeWeather6[0][type];
        console.log(weadata);

        // 获取逐日逐小时天气数据
        dailyHourly(weadata, type);
    })


    // 搜索
    $('.search-icon').on('click', function () {
        // 获取输入框的内容
        let city = $('.search-ipt').val();
        console.log('city =>', city);

        getWeatherByCity(city);
    })

    setBackground();
    // 根据不同时间段设置不同背景
    function setBackground() {
        // 获取时间
        let time = new Date().getHours();
        console.log('time =>', time);

        let $weatherBox = $('.weather-box');

        let setbg = '';

        if (time >= 6 && time <= 12) {
            // 添加 morning属性
            setbg = 'morning';
        } else if (time > 12 && time < 19) {
            // 添加 day属性
            setbg = 'day';
        } else {
            // 添加 night属性
            setbg = 'night';
        }

        $weatherBox.addClass(setbg);
    }

    // ===================================

    // 腾讯定位 API 定位
    function locationIP() {
        $.ajax({
            type: 'GET',
            url: 'https://apis.map.qq.com/ws/location/v1/ip',
            data: {
                key: 'ZL5BZ-2RPC3-KXZ3K-3FQAU-NAI5Q-FVFBU',
                output: 'jsonp'
            },
            dataType: 'jsonp', //响应数据类型
            success: function (res) {
                console.log('腾讯定位res =>', res);

                // 获取城市数据
                $(".location-text").text(res.result.ad_info.city);

                // 调用
                getWeatherByCity(res.result.ad_info.city);
                // console.log(res.result.ad_info.city);
            },
            error: function (err) {
                console.log('腾讯定位err =>', err);
            }
        })
    }

    // ===================================

    // 和风天气 API(获取城市实况天气数据)
    function getWeatherByCity(city) { // city: 城市
        // 判断
        if (city == "") {
            // 拦截
            alert('暂无天气数据');
            return;
        }

        $.ajax({
            type: 'GET',
            url: 'https://api.heweather.net/s6/weather',
            data: {
                location: city,
                key: '2114e9806a4b45f5892f3e6ee020d183'
            },
            success: function (res) {
                console.log('实况天气res =>', res);

                // 判断如果城市不存在
                if (res.HeWeather6[0].status == 'unknown location') {
                    alert('不存在该城市天气');
                    return;
                } else {
                    $('.location-text').text(city);
                    $('.search-ipt').val('');
                }

                weatherData = res;

                // 获取天气数据
                let weather = res.HeWeather6[0];
                // let nowWeather = res.HeWeather6[0].daily_forecast;
                // let dailyForecast = res.HeWeather6[0].daily_forecast;
                // console.log(nowWeather);
                // console.log(dailyForecast);

                // 获取要传参的元素
                // 实况天气数据
                $(".Heweather_now").each(function () {
                    // console.log(this);

                    // 获取元素的 id
                    let now_id = $(this).attr('id');
                    // $(this).text(nowWeather[id]);
                    $(this).text(weather.now[now_id]);
                })

                // 获取温度区间值(最低温和最高温)
                let minTmp = weather.daily_forecast[0].tmp_min;
                let maxTmp = weather.daily_forecast[0].tmp_max;
                let tmpRange = `${minTmp}°~${maxTmp}°`;
                $('#tmp-range').text(tmpRange);


                dailyHourly(weather.daily_forecast, 'daily_forecast');
            },
            error: function (err) {
                console.log('实况天气err =>', err);
            }
        })
    }

    // 逐日、逐小时预报
    function dailyHourly(data, type) {

        // 移除 weather-list子元素
        // empty() 移除子元素
        $('.weather-list').empty();

        // data：逐日和逐小时的天气数据(类型是 Array数组)
        for (let i = 0; i < data.length; i++) {
            // 定义空字符串
            let str = '';

            if (type == 'daily_forecast') {
                let date = data[i].date.slice(5);
                let tmp = `${data[i].tmp_min}°~${data[i].tmp_max}°`;

                str = `
                <div class="fl weather-item">
                    <div class="weather-date">
                        <div>${date}</div>
                        <div>${data[i].cond_txt_d}</div>
                    </div>
                    <div class="weather-icon">
                        <img class="auto-img" src="./images/icons/${data[i].cond_code_d}.png" />
                    </div>
                    <div class="weather-temp">${tmp}</div>
                </div>`;
            } else {
                let date = data[i].time.split(' ')[1];

                str = `
                <div class="fl weather-item">
                    <div class="weather-date">
                        <div>${date}</div>
                        <div>${data[i].cond_txt}</div>
                    </div>
                    <div class="weather-icon">
                        <img class="auto-img" src="./images/icons/${data[i].cond_code}.png" />
                    </div>
                    <div class="weather-temp">${data[i].tmp}°</div>
                </div>`;
            }

            // 页面渲染
            $('.weather-list').append(str);
        }

        $('.weather-list').css({
            width: 0.92 * data.length + 'rem'
        })
    }

    // 调用
    locationIP();
})