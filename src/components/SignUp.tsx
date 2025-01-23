import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

type SignUpProps = {
  navigation: any;
};

export default function SignUp({navigation}: SignUpProps) {
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email.trim());
  };

  const isValidPassword = (password: string): boolean => {
    const trimmedPassword = password.trim();
    return trimmedPassword.length >= 8;
  };

  const handleSignUp = () => {
    if (!name.trim()) {
      Alert.alert(t('error'), t('nameRequired'));
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert(t('error'), t('invalidEmail'));
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(t('error'), t('passwordTooShort'));
      return;
    }

    console.log('Signing up with', name, email, password);
    Alert.alert(t('success'), t('accountCreated'));
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signUp')}</Text>
      <TextInput
        placeholder={t('name')}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
      <Button title={t('signUp')} onPress={handleSignUp} />
      <Text style={styles.footer}>
        {t('alreadyHaveAccount')}{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          {t('login')}
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
