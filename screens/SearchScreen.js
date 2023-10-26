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
import { ScrollView } from 'react-native-gesture-handler';
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

const MARKERS_ARRAY = [
  {
    name: 'Porsche_Panamera_4_E-Hybrid_PHEV_2023_CA',
    rentalPrice: '320',
    type: 'passenger',
    licensePlate: 'AXS878',
    coordinates: {
      lat: 37.39307598185042,
      lng: -122.07068483025209,
    },
    photo:
      'https://assets.zappyride.com/img/vehicles/chromestyle/432740/style-set-1280/2023PRC130001_1280_01.png',
  },
  {
    name: 'Tesla_Model_3_Long_Range_AWD_BEV_2023_CA',
    rentalPrice: '200',
    type: 'passenger',
    licensePlate: 'LOP778',
    coordinates: {
      lat: 37.38965324014396,
      lng: -122.07986566136022,
    },
    photo:
      'https://assets.zappyride.com/img/vehicles/chromestyle/426158/style-set-1280/2022TSC030022_1280_01.png',
  },
];

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

  
  const [carCity, setCarCity] = useState('');
  const [carData, setCarData] = useState([]);
  const [carDataIsFetched, setCarDataIsFetched] = useState(false);

  const [cityLat, setCityLat] = useState(0); //37.7749;
  const [cityLng, setCityLng] = useState(0); //-122.4194;

  const [modalOpen, setModalOpen] = useState(false);

  const [carDetail, setCarDetail] = useState({});


  useEffect(() => {
    getCurrentLocation();
    doReverseGeocode();
    getAllData();
    // getCarDataFromDb();
  },[]);

  const getCarDataFromDb = async () => {
    console.log('ok');
    // 1. get the search key from the textbox
    // 2. Build a query using that search key
    const q = query(
      collection(db, 'Listings'),
      where('address', '==', carCity)
    );



    // 3. execute the query
    try {
      const querySnapshot = await getDocs(q);

      // 1. make temp array for this results
      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // 2. update the state variable with the contents of the temp array
      setCarData(temp);

      console.log(`====>>> ${JSON.stringify(temp)}`);

      // console.log('ok');
      // console.log(`+++++++++++++++++${temp}`);
    } catch (err) {}
  };

  const getAllData = async () => {
    // alert('OK!');

    // retrieve data from firestore
    try {
      const querySnapshot = await getDocs(collection(db, 'Listings'));

      const resultsFromFirestore = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        // make the object to add to the array
        const itemToAdd = {
          id: doc.id,
          ...doc.data(),
        };
        // append to array
        resultsFromFirestore.push(itemToAdd);
      });

      console.log('What is in our final array');
      console.log(resultsFromFirestore);
      setCarData(resultsFromFirestore);
    } catch (err) {
      console.log(err);
    }
  };

  const clickMe = (car) => {
    console.log('MAP MARKER CLICKED');
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
      // display success message
      console.log('Document written with ID: ', insertedDocument.id);
      console.log(`done! ${insertedDocument.id}`);
    } catch (err) {
      console.log(err);
    }

    alert('Request Submitted. The data will be updated in your Reservations');
    console.log(randomDate);
  };

  const getCurrentLocation = async () => {
    try {
      // 1. get permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert(`Permission to access location was denied`);
        return;
      }
      // 2. if permission granted, then get the location
      // - The first time, this can take 5-30 seconds to complete
      let location = await Location.getCurrentPositionAsync();

      console.log(`The current location is:`);
      console.log(location);
      setDeviceLocation(location);
      setLatFromUI(location.coords.latitude);
      setLngFromUI(location.coords.longitude);

      // alert(JSON.stringify(location));
    } catch (err) {
      console.log(err);
    }
  };

  // helper function to do reverse geocoding (coordinates to address)
  const doReverseGeocode = async () => {
    // alert('reverse geocode button clicked');
    try {
      // 0. on android, permissions must be granted
      // 1. do geocoding
      const coords = {
        latitude: parseFloat(latFromUI),
        longitude: parseFloat(lngFromUI),
      };
      // 2. check if result found
      const postalAddresses = await Location.reverseGeocodeAsync(coords, {});

      const result = postalAddresses[0];
      if (result === undefined) {
        // alert('No results found.');
        return;
      }
      console.log(result.city);
      setCarCity(result.city);
      // alert(JSON.stringify(result));

      // 3. do something with results

      // output the street address and number to the user interace
      const output = `${result.streetNumber} ${result.street}, ${result.city}, ${result.region}`;
      // save it to a state variable to display on screen
      setCurrAddress(output);
    } catch (err) {
      console.log(err);
    }
  };

  // button click handler

  return (
    <View style={styles.container}>
      <View>
        <Text>{latFromUI}</Text>

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
              // currItemInArray == the current item we are iterating over
              // pos = position in the array
              (currItem, pos) => {
                // for each item in the array, execute this function code
                // - build a marker element
                // DEBUG
                console.log(`Loop iteration: ${pos}`);
                console.log(currItem);

                const coords = {
                  latitude: currItem.coordinates.lat,
                  longitude: currItem.coordinates.lng,
                };
                return (
                  <Marker
                    key={pos}
                    coordinate={coords}
                    // title={currItem.price}
                    // description={currItem.city}
                    onPress={() => {
                      clickMe(currItem);
                    }}
                  >
                    {/* // UI for your customer marker */}
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
                              marginBottom: 30,
                              padding: 10,
                              alignSelf: 'center',
                            }}
                          />
                          <Image
                            source={{ uri: carDetail.photo }}
                            style={{
                              width: '100%',
                              height: 275,
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
                              Book Now
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
