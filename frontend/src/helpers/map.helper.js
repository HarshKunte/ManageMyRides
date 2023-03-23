
export const getDirectionsResponse = async (address1, address2) =>{
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService({});

    const result = await directionsService.route({
      origin: address1,
      destination: address2,

      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    return result

}

export const getGeoCode = (lat, lng) =>{
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    return geocoder.geocode({ location: { lat, lng } })
}
