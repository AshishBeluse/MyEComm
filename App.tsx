import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-paper';
import {LightTheme, DarkThemeCustom} from './src/utils/themes';
import i18n from './src/utils/i18n';
import {useTranslation} from 'react-i18next';
import {I18nextProvider} from 'react-i18next';
import {store} from './src/core/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const {t} = useTranslation(); // Translation hook
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme switching

  const currentTheme = isDarkMode ? DarkThemeCustom : LightTheme;

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <NavigationContainer theme={currentTheme}>
          <ThemeProvider theme={currentTheme}>
            <SafeAreaView style={{flex: 1}}>
              <AppNavigator toggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </SafeAreaView>
          </ThemeProvider>
        </NavigationContainer>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
