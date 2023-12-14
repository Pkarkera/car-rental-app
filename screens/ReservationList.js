// Import necessary components and functions
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Image, Alert } from 'react-native';
import PaymentForm from './PaymentForm'; 
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const ReservationList = () => {
  const [carBookingList, setCarBookingList] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getUserCarBooking();
      console.log('Screen is focused');
      return () => {

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

      const updatedCarBookingList = resultsFromFirestore.filter((car) => car.bookingStatus !== 'green');
      setCarBookingList(updatedCarBookingList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookNow = (bookingId) => {
    setSelectedBooking(bookingId);
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      const userDocRef = doc(db, 'user', selectedBooking);
      await updateDoc(userDocRef, {
        bookingStatus: 'green',
        paymentDetails: {
          
        },
      });

      Alert.alert('Success', 'Car booked successfully!');
      getUserCarBooking();
      setSelectedBooking(null);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to book the car. Please try again.');
    }
  };

  const handlePaymentCancel = () => {
    setSelectedBooking(null);
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
                  <Text style={{ marginVertical: 10 }}>
                    <Pressable
                      style={{
                        borderColor: '#141D21',
                        borderRadius: 8,
                        borderWidth: 1,
                        paddingVertical: 4,
                        paddingHorizontal: 8,
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

      {selectedBooking && (
        <PaymentForm onSuccess={handlePaymentSuccess} onCancel={handlePaymentCancel} />
      )}
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
