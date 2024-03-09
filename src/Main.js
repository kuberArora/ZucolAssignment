import { useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";



const Main = ({ navigation, route }) => {
  const [openMap, setOpenMap] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={{ backgroundColor: '#2994ff', padding: 20 }}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text >Get Location</Text>
      </TouchableOpacity>

      {
        route?.params?.locationData && (
          <View style={styles.locationInfo}>
            <Text style={{ color: 'red' }}>Latitude: {route?.params?.locationData?.latitude}</Text>
            <Text style={{ color: 'red' }}>Longitude: {route?.params?.locationData?.longitude}</Text>
            <Text style={{ color: 'red' }}>Speed: {route?.params?.locationData?.speed}</Text>
            <Text style={{ color: 'red' }}>Accuracy: {route?.params?.locationData?.accuracy}</Text>
            <Text style={{ color: 'red' }}>
              Last Location Time:{' '}
              {new Date(route?.params?.locationData?.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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

export default Main;