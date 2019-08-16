import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const icon = user => {
  return { url: user.image, scaledSize: new window.google.maps.Size(30, 30) }
}
let users = [], currentUser, handleMarkerClick;


function Map(latLng) {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleClick = user => {
    setSelectedProfile(user);
    handleMarkerClick(selectedProfile);
  }

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: latLng.lat, lng: latLng.lng }}
    >
      <Marker key="user-location" position={{ lat: latLng.lat, lng: latLng.lng }} icon={icon(currentUser)} onClick={() => handleClick(currentUser)} />
      {users.map(user => {
        return user === currentUser ? null : (
        <Marker
          key={user.username}
          position={{ lat: user.user_location.latitude, lng: user.user_location.longitude }}
          icon={icon(user)}
          onClick={() => handleClick(user)}
        />
        )
      })}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap((lat, lng) => Map(lat, lng)));

export default class MapDisplay extends React.Component {
  state = {
    lat: this.props.currentUser.user_location.latitude,
    lng: this.props.currentUser.user_location.longitude,
    users: this.props.users
  }

  render() {
    users = this.state.users;
    currentUser = this.props.currentUser;
    handleMarkerClick = this.props.handleMarkerClick;

    return (
      <div className="main-display-child map-display">
        <WrappedMap
          lat={this.state.lat} lng={this.state.lng}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{height: "100%"}} />}
          containerElement={<div style={{height: "100%"}} />}
          mapElement={<div style={{height: "100%"}} />}
        />
      </div>
    );
  }
}
