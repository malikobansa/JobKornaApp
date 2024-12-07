import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';

const Welcome = () => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <View style={styles.text}>
        <Text style={styles.come}>Welcome 👋</Text>
        <Text style={styles.log}>Please Enter Your Login Details</Text>
      </View>
      <View style={styles.form}>
        <View>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            onChangeText={onChangeEmail}
            value={email}
          />
        </View>
        <View>
          <Text>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Password"
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={!isPasswordVisible} // Toggle visibility
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Entypo
                name={isPasswordVisible ? 'eye-with-line' : 'eye'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  text: {
    marginLeft: 100,
    marginTop: 50,
    textAlign: 'center',
  },
  come: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  log: {
    fontSize: 20,
    marginLeft: -50,
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
});
