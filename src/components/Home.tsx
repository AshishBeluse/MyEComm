import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const products = [
  {
    id: '1',
    name: 'Product 1',
    price: '$10',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Product 2',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
];

type HomeProps = {
  toggleTheme: () => void;
};

export default function Home({toggleTheme}: HomeProps) {
  const {t} = useTranslation();
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const renderProduct = ({item}: {item: (typeof products)[0]}) => (
    <View style={[styles.product, {borderColor: theme.colors.primary}]}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={[styles.text, {color: theme.colors.text}]}>{item.name}</Text>
      <Text style={[styles.text, {color: theme.colors.text}]}>
        {item.price}
      </Text>
      <Button
        title={t('Add to Cart')}
        onPress={() => {
          console.log(`${t('Added')} ${item.name} ${t('to cart')}`);
          navigation.navigate('Cart');
        }}
        color={theme.colors.primary}
      />
    </View>
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          {t('Product List')}
        </Text>
        <Button
          title={t(
            colorScheme === 'dark'
              ? 'Switch to Light Theme'
              : 'Switch to Dark Theme',
          )}
          onPress={toggleTheme}
        />
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  header: {marginBottom: 16, alignItems: 'center'},
  title: {fontSize: 24, fontWeight: 'bold'},
  list: {paddingBottom: 16},
  product: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
  },
  image: {width: 100, height: 100, marginBottom: 8},
  text: {fontSize: 16},
});
