import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Translation strings for English
const en = {
  translation: {
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    cart: 'Cart',
    checkout: 'Checkout',
    proofOfDelivery: 'Proof of Delivery',
    themeSelection: 'Select Theme',
    languageSelection: 'Select Language',
    emptyCart: 'Your cart is empty!',
    error: 'Error',
    fillCredentials: 'Please fill in all fields.',
    login: 'Login',
    signUp: 'Sign Up',
    noAccount: "Don't have an account?",
  },
};

// Translation strings for Spanish
const es = {
  translation: {
    welcome: 'Bienvenido',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    cart: 'Carrito',
    checkout: 'Pagar',
    proofOfDelivery: 'Prueba de entrega',
    themeSelection: 'Seleccionar tema',
    languageSelection: 'Seleccionar idioma',
    emptyCart: '¡Tu carrito está vacío!',
    error: 'Error',
    fillCredentials: 'Por favor, complete todos los campos.',
    login: 'Iniciar sesión',
    signUp: 'Registrarse',
    noAccount: '¿No tienes una cuenta?',
  },
};

i18n.use(initReactI18next).init({
  resources: {en, es},
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {escapeValue: false},
});

export default i18n;
