import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import 'source-map-support/register';

export const getWeatherInfo: APIGatewayProxyHandler = async (event) => {
  console.log('lambda invocation with event:', event);
  console.log('multiValueQueryStringParameters:', event.multiValueQueryStringParameters)

  const city = event.multiValueQueryStringParameters.city[0];
  const APIKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // API Key has been hidden

  let weatherResponse;
  try {
    weatherResponse = await axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`) 
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