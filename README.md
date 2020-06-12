和风天气
key: '2114e9806a4b45f5892f3e6ee020d183'
url: 'https://free-api.heweather.net/s6/weather/{weather-type}?{parameters}'

weather-type:

| weather-type |            |
| ------------ | ---------- |
| now          | 实况天气   |
| forecast     | 3-10天预报 |
| hourly       | 逐小时预报 |
| lifestyle    | 生活指数   |

请求URL实例:

```
# 获取广州实况天气
https://api.heweather.net/s6/weather/now?location=guangzhou&key=xxx
```



腾讯定位

key: 'ZL5BZ-2RPC3-KXZ3K-3FQAU-NAI5Q-FVFBU'

url: 'https://apis.map.qq.com/ws/location/v1/ip'

```
data: {

	key: 'ZL5BZ-2RPC3-KXZ3K-3FQAU-NAI5Q-FVFBU',

	output: 'jsonp'

}
```