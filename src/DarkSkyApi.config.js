import DarkSkyApi from 'dark-sky-api'
DarkSkyApi.apiKey  =  '537cc276571ca8e3acdd444b808de49b';
const api = new DarkSkyApi(apiKey, proxy, units, language, processor);
api.units('us')
  .language('zh')
  .postProcessor(item => {
    item.newProp = val;
    return item;
  })
  .loadCurrent()
  .then(console.log);

// extend hourly available for forecasts
api.extendHourly(true)
  .loadForecast()
  .then(console.log);

// turn off extend hourly
api.extendHourly(false)
  .loadForecast()
  .then(console.log);

// change position
position = {
  latitude: 43.075284, 
  longitude: -89.384318
};
api.position(position)
  .loadCurrent()
  .then(console.log);

// change back
api.loadPositionAsync() // get current position
  .then(position => api.position(position));

// time machine request
api.loadTime('2000-04-06T12:20:05')
  .then(console.log)