import React, {useState} from 'react';
import {View, Button, Image, TextInput, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {openCamera} from '../bridges/CameraModule';
import {useTranslation} from 'react-i18next';
import {requestCameraPermission} from '../utils/permissions';

const ProofOfDelivery = () => {
  const {t} = useTranslation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [condition, setCondition] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleCapture = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      try {
        const uri = await openCamera();
        setImageUri(uri);
      } catch (error) {
        console.error('Camera error:', error);
        Alert.alert('Error', 'Failed to open the camera. Please try again.');
      }
    } else {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to capture an image.',
      );
    }
  };

  const handleSubmit = () => {
    if (imageUri && condition && rating) {
      console.log({imageUri, condition, rating});
      navigation.navigate('Home');
    } else {
      Alert.alert(
        'Incomplete Details',
        'Please provide all required information.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button title={t('Capture Proof')} onPress={handleCapture} />
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      <TextInput
        placeholder={t('Describe condition')}
        value={condition}
        onChangeText={setCondition}
        style={styles.input}
      />
      <Text>Rating:</Text>
      <TextInput
        keyboardType="numeric"
        placeholder={t('Rate (1-5)')}
        value={rating ? String(rating) : ''}
        onChangeText={text => setRating(Number(text))}
        style={styles.input}
      />
      <Button
        title={t('Submit Proof')}
        onPress={() => {
          console.log({imageUri, condition, rating});
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  image: {width: 100, height: 100, marginVertical: 16},
  input: {borderWidth: 1, padding: 8, marginVertical: 8},
});

export default ProofOfDelivery;
