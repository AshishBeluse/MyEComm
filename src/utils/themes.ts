import {DefaultTheme, DarkTheme, Theme} from '@react-navigation/native';

// Define custom light theme
const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    background: '#ffffff',
    card: '#f8f9fa',
    text: '#000000',
    border: '#c7c7c7',
    notification: '#ff4081',
  },
};

// Define custom dark theme
const DarkThemeCustom: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#bb86fc',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    border: '#272727',
    notification: '#ff80ab',
  },
};

export {LightTheme, DarkThemeCustom};
