import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

// import the auth variable
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const SignInScreen = ({ navigation }) => {
  const [usernameFromUI, setUsernameFromUI] = useState('user@gmail.com');
  const [passwordFromUI, setPasswordFromUI] = useState('user123');

  const onLoginClicked = async () => {
    //verify credentials
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        usernameFromUI,
        passwordFromUI
      );
      // who is the current user?
      console.log('Who is the currently logged in user');
      console.log(auth.currentUser);
      // alert(`Login success! ${auth.currentUser.uid}`);
      navigation.navigate('Cars Found');
    } catch (err) {
      console.log(err);
    }
  };

  const onLogoutClicked = async () => {
    try {
      // 1. check if a user is currently logged in
      if (auth.currentUser === null) {
        alert('Sorry, no user is logged in.');
      } else {
        await signOut(auth);
        alert('Logout complete!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hi, Login here!</Text>

      <TextInput
        style={styles.tb}
        placeholder="Enter your email"
        textContentType="emailAddress"
        autoCapitalize="none"
        value={usernameFromUI}
        onChangeText={setUsernameFromUI}
      />
      <TextInput
        style={styles.tb}
        placeholder="Enter your password"
        secureTextEntry={true}
        autoCapitalize="none"
        value={passwordFromUI}
        onChangeText={setPasswordFromUI}
      />

      <Pressable style={styles.btn}>
        <Text style={styles.btnLabel} onPress={onLoginClicked}>
          Login
        </Text>
      </Pressable>
      {/* <Pressable style={styles.btn}>
        <Text style={styles.btnLabel} onPress={onLogoutClicked}>
          Logout
        </Text>
      </Pressable> */}
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

export default SignInScreen;
