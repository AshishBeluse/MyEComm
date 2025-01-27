import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  useColorScheme,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

const products = [
  {
    id: '1',
    name: 'Apple iPhone 14',
    price: '$799',
    category: 'Electronics',
    image:
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-max-silver-select?wid=940&hei=1112&fmt=png-alpha&.v=1660755896846',
  },
  {
    id: '2',
    name: 'Head phone',
    price: '$999',
    category: 'Electronics',
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    price: '$349',
    category: 'Accessories',
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
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

  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    const matchesFilter = filter
      ? item.name.toLowerCase().includes(filter.toLowerCase())
      : true;

    return matchesCategory && matchesFilter;
  });

  const renderProduct = ({item}: {item: (typeof products)[0]}) => (
    <View style={[styles.product, {borderColor: theme.colors.primary}]}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="contain"
      />
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

      <View style={styles.filterContainer}>
        <TextInput
          style={[styles.input, {borderColor: theme.colors.primary}]}
          placeholder={t('Search products')}
          placeholderTextColor={theme.colors.placeholder}
          value={filter}
          onChangeText={setFilter}
        />

        <Picker
          selectedValue={selectedCategory}
          style={[styles.input, {color: theme.colors.text}]}
          onValueChange={setSelectedCategory}>
          <Picker.Item label={t('All Categories')} value={null} />
          <Picker.Item label={t('Category 1')} value="Category 1" />
          <Picker.Item label={t('Category 2')} value="Category 2" />
        </Picker>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
  filterContainer: {marginBottom: 16},
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    fontSize: 16,
  },
});
