
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    paddingBottom: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 8,
  },
  locationInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
  },
});


const Dashboard = ({ navigation }) => {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    if (locationData != null) {
      setTimeout(() => {

        navigation.navigate('Main', { locationData: locationData });
      }, 1000);
    }
  }, [locationData]);


  const requestLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const timestamp = position?.timestamp
        const {
          latitude,
          longitude,
          speed,
          accuracy,

        } = position.coords;

        setLocationData({
          latitude,
          longitude,
          speed,
          accuracy,
          timestamp: timestamp,
        });

      },
      (error) => {
        console.log('Error getting location: ', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )

  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, width: '100%', height: 300 }}
        initialRegion={{
          latitude: locationData?.latitude || 28.5406222,
          longitude: locationData?.longitude || 77.3412583,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
      >
        {locationData && (
          <Marker
            coordinate={{
              latitude: locationData.latitude,
              longitude: locationData.longitude,
            }}
            title={`Speed: ${locationData.speed}`}
            description={`Accuracy: ${locationData.accuracy}\nTimestamp: ${new Date(
              locationData.timestamp
            ).toLocaleTimeString()}`}
          />
        )}
      </MapView>
      <Button title="Get Location" onPress={requestLocation} />
    </View>
  );
}

export default Dashboard;