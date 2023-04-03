import React from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { getGeoCode } from "../helpers/map.helper";

const google = window.google
//intial position of map
const center = { lat: 48.8584, lng: 2.2945 };

function Map({
  directionsResponse,
  marker1,
  marker2,
  draggableMap,
  onMarkerUpdate,
}) {
  const onDragFromMarkerEnd = (res) => {
    console.log(res);
    getGeoCode(res.latLng.lat(), res.latLng.lng())
      .then((response) => {
        onMarkerUpdate("marker1", response.results[0].formatted_address);
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  };
  const onDragToMarkerEnd = (res) => {
    console.log(res);
    getGeoCode(res.latLng.lat(), res.latLng.lng())
      .then((response) => {
        onMarkerUpdate("marker2", response.results[0].formatted_address);
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  };

  return (
    <>
     {/* // eslint-disable-next-line no-undef */}
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {directionsResponse && (
        <DirectionsRenderer
          options={{ suppressMarkers: draggableMap }}
          directions={directionsResponse}
          routeIndex={0}
        />
      )}
      {marker1 && draggableMap && (
        <Marker
          visible={true}
          position={marker1}
          draggable={true}
          onDragEnd={onDragFromMarkerEnd}
        />
      )}
      {marker2 && draggableMap && (
        <Marker
          visible={true}
          position={marker2}
          draggable={true}
          onDragEnd={onDragToMarkerEnd}
        />
      )}
    </GoogleMap>
    </>
  );
}

export default Map;
