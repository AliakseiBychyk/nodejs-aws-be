# Weather Info Service

This project levereges OpenWeather API and AWS Lambda for weather information

Endpoint:
```
https://yc1l5bo831.execute-api.eu-west-1.amazonaws.com/dev/weather-info?city={city}
```

Query Parameters:

`city` `required`  City name, state code and country code divided by comma.

Examples:
```
https://yc1l5bo831.execute-api.eu-west-1.amazonaws.com/dev/weather-info?city=Minsk
https://yc1l5bo831.execute-api.eu-west-1.amazonaws.com/dev/weather-info?city=Brest,BY
https://yc1l5bo831.execute-api.eu-west-1.amazonaws.com/dev/weather-info?city=Brest,FR
```