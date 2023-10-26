import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  Image,
} from 'react-native';

import { useEffect, useState } from 'react';

// 1. Import the db variable from firebaseConfig
import { db } from '../firebaseConfig';

// 2. Import the relevant functions from firestore
import { collection, getDocs } from 'firebase/firestore';

const ReservationList = () => {
  const [carBookingList, setCarBookingList] = useState([]);

  useEffect(() => {
    getUserCarBooking();
  }, []);

  const getUserCarBooking = async () => {
    // retrieve data from firestore
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));

      const resultsFromFirestore = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        // make the object to add to the array
        const itemToAdd = {
          id: doc.id,
          ...doc.data(),
        };
        // append to array
        // resultsFromFirestore.push(itemToAdd)

        resultsFromFirestore.push(doc.data());
      });

      console.log('What is in our final array');
      console.log(resultsFromFirestore);

      // save data to a state variable
      // when the state variable updates, the list will auto update
      setCarBookingList(resultsFromFirestore);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* // List UI goes here */}
      <FlatList
        data={carBookingList}
        renderItem={(rowData) => {
          return (
            <View
              style={{ borderBottomWidth: 1, flexDirection: 'row', gap: 7 }}
            >
              <View>
                <Image
                  source={{ uri: rowData.item.photo }}
                  style={{
                    width: 75,
                    height: 75,
                    resizeMode: 'contain',
                    marginVertical: 2,
                  }}
                />
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                  {rowData.item.name}
                </Text>
                <Text>Price: ${rowData.item.price}</Text>
                <Text>License PLate: {rowData.item.licensePlate}</Text>
                <Text>Type: {rowData.item.type}</Text>
                <Text>Date: {rowData.item.bookingDate}</Text>
                {rowData.item.bookingStatus == 'yellow' && (
                  <Text>
                    Status:{' '}
                    <Text style={{ color: 'blue', fontSize: 20 }}>Pending</Text>
                  </Text>
                )}
                {rowData.item.bookingStatus == 'green' && (
                  <Text>
                    <Text style={{ color: 'green', fontSize: 20 }}>
                      Approve
                    </Text>
                  </Text>
                )}
                {rowData.item.bookingStatus == 'red' && (
                  <Text>
                    <Text style={{ color: 'red', fontSize: 20 }}>Decline</Text>
                  </Text>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ReservationList;
