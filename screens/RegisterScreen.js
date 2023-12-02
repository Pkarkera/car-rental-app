import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

// import the auth variable
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');

  const onSignUpClicked = async () => {
    //verify credentials
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      // who is the current user?
      console.log('Who is the currently logged in user');
      console.log(auth.currentUser);
      // alert(`Login success! ${auth.currentUser.uid}`);
      navigation.navigate('Rent A Car');
    } catch (err) {
      console.log('ooohh')
      console.log(err);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome, Please Register here</Text>

      <TextInput
        style={styles.tb}
        placeholder="Enter your full name"
        textContentType="name"
        autoCapitalize="none"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.tb}
        placeholder="Enter your email"
        textContentType="emailAddress"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.tb}
        placeholder="Enter your password"
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.btn}>
        <Text style={styles.btnLabel} onPress={onSignUpClicked}>
          Register
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#18ffa1',
    borderRadius: 8,
    paddingVertical: 16,
    marginVertical: 10,
    backgroundColor: '#18ffa1',
  },
  btnLabel: {
    fontSize: 16,
    textAlign: 'center',
    color: '#112e3a',
    fontWeight:'bold'
  },
  tb: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#efefef',
    color: '#112e3a',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  formLabel: {
    fontSize: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#112e3a',
  },
});

export default RegisterScreen;
