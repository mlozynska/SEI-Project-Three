import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Segment, Grid, Divider } from 'semantic-ui-react'
import moment from 'moment'

const Weather = ({ park }) => {
  const [weather, setWeather] = useState(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!park) return
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${park.latitude}&lon=${park.longitude}&units=metric&exclude=minutely,hourly&appid=${process.env.REACT_APP_APIkey}`
        )
        setWeather(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      <Segment id="weather-main">
        <Grid columns={3}>
          <Grid.Column>
            <Segment id="header-main" basic>
              Weather Forcast
            </Segment>
          </Grid.Column>
        </Grid>
        {weather ? (
          <Segment id="blue-segment">
            <Grid columns={3}>
              <Grid.Column id="weather-column">
                <p id="day">{moment().format('dddd')}</p>
                <p id="day">{moment().format('LL')}</p>
                <Segment id="description" basic>
                  {weather.current.weather[0].description.toUpperCase()}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <p id="day">
                  Temperature: {Math.round(weather.current.temp)} &deg;C
                </p>
                <p id="day">Humidity: {weather.current.humidity} %</p>
              </Grid.Column>
              <Grid.Column>
                <p id="day">
                  Sunrise:{' '}
                  {new Date(weather.current.sunrise * 1000).toLocaleTimeString(
                    'en-IN'
                  )}
                </p>
                <p id="day">
                  Sunset:{' '}
                  {new Date(weather.current.sunset * 1000).toLocaleTimeString(
                    'en-IN'
                  )}
                </p>
              </Grid.Column>
            </Grid>
            <Divider />
            <Grid columns={3}>
              <Grid.Column id="weather-column">
                <p id="day">{moment().add(1, 'days').format('dddd')}</p>
                <p id="day">{moment().add(1, 'days').format('LL')}</p>
                <Segment id="description" basic>
                  {weather.daily[1].weather[0].description.toUpperCase()}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <p id="day">
                  Temperature: {Math.round(weather.daily[1].temp.day)} &deg;C
                </p>
                <p id="day">Humidity: {weather.daily[1].humidity} %</p>
              </Grid.Column>
              <Grid.Column>
                <p id="day">
                  Sunrise:{' '}
                  {new Date(weather.daily[1].sunrise * 1000).toLocaleTimeString(
                    'en-IN'
                  )}
                </p>
                <p id="day">
                  Sunset:{' '}
                  {new Date(weather.daily[1].sunset * 1000).toLocaleTimeString(
                    'en-IN'
                  )}
                </p>
              </Grid.Column>
            </Grid>
            <Divider />
            <Grid columns={3}>
              <Grid.Column id="weather-column">
                <p id="day">{moment().add(2, 'days').format('dddd')}</p>
                <p id="day">{moment().add(2, 'days').format('LL')}</p>
                <Segment id="description" basic>
                  {weather.daily[2].weather[0].description.toUpperCase()}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <p id="day">
                  Temperature: {Math.round(weather.daily[2].temp.day)} &deg;C
                </p>
                <p id="day">Humidity: {weather.daily[2].humidity} %</p>
              </Grid.Column>
              <Grid.Column>
                <p id="day">
                  Sunrise:{' '}
                  {new Date(weather.daily[2].sunrise * 1000).toLocaleTimeString(
                    'en-IN'
                  )}
                </p>
                <p id="day">
                  Sunset:{' '}
                  {new Date(weather.daily[2].sunset * 1000).toLocaleTimeString(
                    'en-IN'
                  )}
                </p>
              </Grid.Column>
            </Grid>
          </Segment>
        ) : (
          <h2>
            {hasError ? 'Something has gone wrong!' : 'Weather is loading'}
          </h2>
        )}
      </Segment>
    </>
  )
}
export default Weather
