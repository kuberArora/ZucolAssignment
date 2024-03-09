
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';

import RootNavigator from './src/RootNavigator';
import { PERMISSIONS, check, requestMultiple } from 'react-native-permissions';


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
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


const App = () => {

  const requestLocationPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
        if (
          granted["android.permission.ACCESS_FINE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.ACCESS_COARSE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Location permissions granted");
        } else {
          console.log("Some location permissions are denied");
        }
      } else if (Platform.OS === "ios") {
        const locationStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); // or PERMISSIONS.IOS.LOCATION_ALWAYS
        if (locationStatus === "granted") {
          console.log("Location permissions granted");
        } else {
          const requestedPermissions = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]; // or [PERMISSIONS.IOS.LOCATION_ALWAYS]
          const results = await requestMultiple(requestedPermissions);
          if (results[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === "granted") {
            console.log("Location permissions granted");
          } else {
            console.log("Some location permissions are denied");
          }
        }
      }
    } catch (error) {
      console.log("Error requesting location permissions: ", error);
    }
  };

  useEffect(() => {
    requestLocationPermissions()
  }, [])

  return (
    <RootNavigator />
  )
}

export default App;