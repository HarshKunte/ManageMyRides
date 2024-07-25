export const googleMapsApiData ={
    id:'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  }


export const config = {
  REACT_APP_DB_API : process.env.REACT_APP_DB_API || "http://localhost:4000/api/"
}