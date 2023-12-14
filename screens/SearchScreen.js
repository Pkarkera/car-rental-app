import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import * as Location from 'expo-location';
//import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';


// import the db variable from firebaseConfig.js
import { db } from '../firebaseConfig';

import { FontAwesome } from '@expo/vector-icons';

// importing the firestore functions that you need
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  initializeFirestore,
} from 'firebase/firestore';

const SearchScreen = () => {
  // state variables to store results of geocoding
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [currAddress, setCurrAddress] = useState(null);
  const [geocodedCoordinates, setGeocodedCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const [latFromUI, setLatFromUI] = useState(0);
  const [lngFromUI, setLngFromUI] = useState(0);

  // state variable to store students
  const [carCity, setCarCity] = useState('');
  const [carData, setCarData] = useState([]);
  const [carDataIsFetched, setCarDataIsFetched] = useState(false);

  // const [cityLat, setCityLat] = useState(0); //37.7749;
  // const [cityLng, setCityLng] = useState(0); //-122.4194;

  const [modalOpen, setModalOpen] = useState(false);

  const [carDetail, setCarDetail] = useState({});

  useEffect(() => {
    getCurrentLocation();
    //doReverseGeocode();
    getAllData();
    // getCarDataFromDb();
  }, []);

  const getAllData = async () => {
    // alert('OK!');

    // retrieve data from firestore
    try {
      const querySnapshot = await getDocs(collection(db, 'Listings'));

      const resultsFromFirestore = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        // make the object to add to the array
        const itemToAdd = {
          id: doc.id,
          ...doc.data(),
        };
        // append to array
        resultsFromFirestore.push(itemToAdd);
      });

      //console.log('What is in our final array');
      // console.log(resultsFromFirestore);
      setCarData(resultsFromFirestore);
    } catch (err) {
      console.log(err);
    }
  };

  const clickMe = (car) => {
    // console.log('MAP MARKER CLICKED');
    console.log(car.name);
    setCarDetail(car);

    setModalOpen(true);
  };

     function getRandomDate(startDate, endDate) {
     const timeDiff = endDate.getTime() - startDate.getTime();
     const randomTime = Math.random() * timeDiff;
     const randomDate = new Date(startDate.getTime() + randomTime);
     return randomDate.toISOString().slice(0, 10);
   }

  const bookCarToRent = async () => {
    // yyyy-mm-dd
    const startDate = new Date('2023-08-12');
    const endDate = new Date('2024-12-31');
    const randomDate = getRandomDate(startDate, endDate);

    const saveCarInUserDb = {
      name: carDetail.name,
      licencePlate: carDetail.licencePlate,
      photo: carDetail.photo,
      price: carDetail.rentalPrice,
      type: carDetail.type,
      bookingDate: randomDate,
      bookingStatus: 'yellow',
    };

    try {
      // insert into database
      // Add a new document with a generated id.
      const insertedDocument = await addDoc(
        collection(db, 'user'),
        saveCarInUserDb
      );
      
    } catch (err) {
      console.log(err);
    }

    alert('Booking Request Submitted.');
    // console.log(randomDate);
    //setSelectedCar(null);
  };



  const getCurrentLocation = async () => {
    try {
      // 1. get permissions
      // console.log("sss")
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert(`Permission to access location was denied`);
        return;
      }
      // 2. if permission granted, then get the location
      // - The first time, this can take 5-30 seconds to complete
      let location = await Location.getCurrentPositionAsync();

      // console.log(`The current location is:`);
      // console.log(location);
      setDeviceLocation(location);
      setLatFromUI(location.coords.latitude);
      setLngFromUI(location.coords.longitude);

      // alert(JSON.stringify(location));
    } catch (err) {
      console.log(err);
    }
  };

  // button click handler

  return (
    <View style={styles.container}>
      <View>
        <MapView
          style={{ height: '100%', width: '100%' }}
          region={{
            latitude: latFromUI,
            longitude: lngFromUI,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {
            // loop through the markers array
            carData.map(
              (currItem, pos) => {
                const coords = {
                  latitude: currItem.coordinates.lat,
                  longitude: currItem.coordinates.lng,
                };
                return (
                  <Marker
                    key={pos}
                    coordinate={coords}
                    onPress={() => {
                      clickMe(currItem);
                    }}
                  >
                    <View
                      style={{
                        borderColor: 'black',
                        backgroundColor: 'red',
                        height: 30,
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold' }}>
                        ${currItem.rentalPrice}
                      </Text>
                      <Modal visible={modalOpen} animationType="slide">
                        <View style={{ paddingHorizontal: 20 }}>
                          <FontAwesome
                            name="close"
                            size={24}
                            color="black"
                            onPress={() => {
                              setModalOpen(false);
                            }}
                            style={{
                              // marginBottom: 30,
                              marginTop: 50,
                              padding: 10,
                              alignSelf: 'flex-start',
                            }}
                          />
                          <Image
                            source={{ uri: carDetail.photo }}
                            style={{
                              width: '100%',
                              height: 230,
                              resizeMode: 'contain',
                              marginVertical: 10,
                            }}
                          />
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 24,
                              paddingBottom: 20,
                            }}
                          >
                            {carDetail.name}
                          </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            Price: ${carDetail.rentalPrice}
                          </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            Type: {carDetail.type}
                          </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                            License PLate:{carDetail.licencePlate}
                          </Text>
                          
                          <Pressable
                            style={{
                              borderWidth: 1,
                              borderColor: '#141D21',
                              borderRadius: 8,
                              paddingVertical: 16,
                              marginVertical: 10,
                              backgroundColor: '#18ffa1',
                            }}
                            onPress={bookCarToRent}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                textAlign: 'center',
                                fontWeight: '700',
                              }}
                            >
                              Reserve Now
                            </Text>
                          </Pressable>

                          
                        </View>
                      </Modal>
                    </View>
                  </Marker>
                );
              }
            )
          }
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnLabel: {
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#141D21',
    borderRadius: 8,
    paddingVertical: 16,
    marginVertical: 10,
  },
});

export default SearchScreen;
