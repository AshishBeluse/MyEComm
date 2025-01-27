import React, {useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Cart() {
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();

  const initialCartItems = route.params?.cartItems || [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    Alert.alert(t('Checkout'), `${t('Total amount:')} $${total.toFixed(2)}`);

    setCartItems([]);
  };

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>
        ${item.price} x {item.quantity}
      </Text>
      <Button
        title="POD"
        onPress={() => navigation.navigate('ProofOfDelivery')}
      />
      <Button title={t('Remove')} onPress={() => handleRemoveItem(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Cart')}</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.list}
          />
          <Button title={t('Checkout')} onPress={handleCheckout} />
        </>
      ) : (
        <Text style={styles.emptyMessage}>{t('Your cart is empty!')}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, textAlign: 'center', marginBottom: 16},
  list: {marginBottom: 16},
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  itemName: {fontSize: 16},
  itemPrice: {fontSize: 16},
  emptyMessage: {fontSize: 18, textAlign: 'center', marginTop: 32},
});
