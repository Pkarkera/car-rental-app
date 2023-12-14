import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, TextInput } from 'react-native';

const PaymentForm = ({ onSuccess, onCancel }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  const handleCardChange = (field, value) => {
    setCardDetails({
      ...cardDetails,
      [field]: value,
    });
  };

  const handlePayment = async () => {
    // Validate card details
    if (!cardDetails.number || !cardDetails.expMonth || !cardDetails.expYear || !cardDetails.cvc) {
      Alert.alert('Error', 'Please enter valid card details.');
      return;
    }

    try {
      
      onSuccess();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          onChangeText={(text) => handleCardChange('number', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Expiry Month"
          keyboardType="numeric"
          onChangeText={(text) => handleCardChange('expMonth', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Expiry Year"
          keyboardType="numeric"
          onChangeText={(text) => handleCardChange('expYear', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="CVC"
          keyboardType="numeric"
          onChangeText={(text) => handleCardChange('cvc', text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#2E3A59' : '#334155',
            },
          ]}
          onPress={handlePayment}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#2E3A59' : '#334155',
            },
          ]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PaymentForm;
