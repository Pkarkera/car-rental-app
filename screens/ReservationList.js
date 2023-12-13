// Import necessary components and functions
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Image, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const ReservationList = () => {
  const [carBookingList, setCarBookingList] = useState([]);

  // useEffect(() => {
  //   getUserCarBooking();
  //   console.log('component render')
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserCarBooking();
      console.log('Screen is focused');
      return () => {
        // Cleanup or additional logic when the screen loses focus
      };
    }, [])
  );

  const getUserCarBooking = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const resultsFromFirestore = [];

      querySnapshot.forEach((doc) => {
        const itemToAdd = {
          id: doc.id,
          ...doc.data(),
        };
        resultsFromFirestore.push(itemToAdd);
      });

      //setCarBookingList(resultsFromFirestore);
      // console.log('resultsFromFirestore', resultsFromFirestore)
      const updatedCarBookingList = resultsFromFirestore.filter((car) => car.bookingStatus !== 'green');
      setCarBookingList(updatedCarBookingList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookNow = async (bookingId) => {
    try {
      const userDocRef = doc(db, 'user', bookingId);
      await updateDoc(userDocRef, {
        bookingStatus: 'green', // Update to the desired status
      });

      Alert.alert('Success', 'Car booked successfully!');
      getUserCarBooking();
      // Filter out the booked car from the list
      setCarBookingList((prevList) => prevList.filter((car) => car.id !== bookingId));
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to book the car. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carBookingList}
        renderItem={({ item }) => {
          return (
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', gap: 7 }}>
              <View>
                <Image
                  source={{ uri: item.photo }}
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
                  {item.name}
                </Text>
                <Text>Price: ${item.price}</Text>
                <Text>License Plate: {item.licensePlate}</Text>
                <Text>Type: {item.type}</Text>
                <Text>Date: {item.bookingDate}</Text>
                {item.bookingStatus === 'yellow' && (
                  <Text style={{marginVertical: 10}}>
                    <Pressable
                      style={{
                        // borderWidth: 1,
                        borderColor: '#141D21',
                        borderRadius: 8,
                        paddingVertical: 4,
                        paddingHorizontal: 8, 
                        // marginVertical: 10,
                        backgroundColor: 'green',
                        justifyContent: 'center', 
                        alignItems: 'center',
                      }}
                      onPress={() => handleBookNow(item.id)}
                    >
                      <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '700', color: 'white' }}>
                        Book Now
                      </Text>
                    </Pressable>
                  </Text>
                )}
              </View>
            </View>
          );
        }}
       keyExtractor={(item) => item.id.toString()}
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
