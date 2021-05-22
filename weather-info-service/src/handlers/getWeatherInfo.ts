import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import 'source-map-support/register';

const { OPEN_WEATHER_API_KEY } = process.env;

export const getWeatherInfo: APIGatewayProxyHandler = async (event) => {
  console.log('lambda invocation with event:', event);
  console.log('multiValueQueryStringParameters:', event.multiValueQueryStringParameters)

  const city = event.multiValueQueryStringParameters.city[0];
  const APIKey = OPEN_WEATHER_API_KEY;

  let weatherResponse;
  try {
    weatherResponse = await axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`) 
    
    console.log('weatherResponse: ', weatherResponse);
  } catch (e) {
    console.error(e);
    return {
      statusCode: e.statusCode,
    };
  }

  console.log('response from OpenWeather', weatherResponse.data.weather);
  const { data } = weatherResponse;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      welcome: 'Sun is shining in the sky, there is no cloud in sight!',
      city,
      weatherInfo: data
    }),
  };
};
