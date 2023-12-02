import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

// import the auth variable
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onLoginClicked = async () => {
    //verify credentials
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      // who is the current user?
      console.log('Who is the currently logged in user');
      // console.log(auth.currentUser);
      // alert(`Login success! ${auth.currentUser.uid}`);
      navigation.navigate('Cars Found');
      setUsername('')
      setPassword('')
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
      <Text style={styles.headerText}>Welcome, Please login here to continue</Text>

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
        <Text style={styles.btnLabel} onPress={onLoginClicked}>
          Login
        </Text>
      </Pressable>
      <Pressable style={styles.btn}>
        <Text style={styles.btnLabel} onPress={() => navigation.navigate('Register to rent a car')}>
          Create an account
        </Text>
      </Pressable>
      {<Pressable style={styles.btn}>
        <Text style={styles.btnLabel} onPress={onLogoutClicked}>
          Logout
        </Text>
      </Pressable> }
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
