import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Màn hình Đăng nhập
const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

    if (phoneRegex.test(phone)) {
      setErrorMessage('Số điện thoại hợp lệ!');
      setIsValidPhone(true);
    } else {
      setErrorMessage('Số điện thoại không đúng định dạng. Vui lòng nhập lại!');
      setIsValidPhone(false);
    }
  };

  const handleContinue = () => {
    if (isValidPhone) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <View style={styles.line} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nhập số điện thoại</Text>
      <Text style={styles.subtitle}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        onChangeText={(text) => {
          setPhone(text);
          validatePhoneNumber(text);
        }}
      />
      {errorMessage ? (
        <Text style={[styles.errorText, { color: isValidPhone ? 'green' : 'red' }]}>
          {errorMessage}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

// Màn hình Trang chủ
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>Chào mừng bạn đến với HomeScreen!</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// **Styles**
const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    borderRadius: 8,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  homeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
