import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

type LoginProps = {
  navigation: any;
};

export default function Login({navigation}: LoginProps) {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email: string) => {
    const emailPattern = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email.trim());
  };

  const isValidPassword = (password: string) => {
    const trimmedPassword = password.trim();
    return trimmedPassword.length >= 8;
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(t('error'), t('fillCredentials'));
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert(t('error'), t('invalidEmail'));
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(t('error'), t('invalidPassword'));
      return;
    }

    console.log('Logging in with', email, password);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login')}</Text>
      <TextInput
        placeholder={t('email')}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title={t('login')} onPress={handleLogin} />
      <Text style={styles.footer}>
        {t('noAccount')}{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          {t('signUp')}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
