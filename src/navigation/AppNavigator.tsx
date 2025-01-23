import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Home from '../components/Home';
import Cart from '../components/Cart';
import ProofOfDelivery from '../components/ProofOfDelivery';

const Stack = createNativeStackNavigator();

type AppNavigatorProps = {
  toggleTheme: () => void;
};

const AppNavigator: React.FC<AppNavigatorProps> = ({toggleTheme}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" options={{title: 'Home'}}>
        {props => <Home {...props} toggleTheme={toggleTheme} />}
      </Stack.Screen>
      <Stack.Screen name="Cart" component={Cart} options={{title: 'Cart'}} />
      <Stack.Screen
        name="ProofOfDelivery"
        component={ProofOfDelivery}
        options={{title: 'Proof of Delivery'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
