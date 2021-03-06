import React, {useState} from "react";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger} from "react-native-popup-menu";
import {StyleSheet, Text, View, Image} from "react-native";

import Second from "./screens/Second";
import BUCalculator from "./screens/BUCalculator";

import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";
import {SimpleLineIcons} from '@expo/vector-icons';

import {colors} from './styles/styles'


// async function loadApp() {
//   await Font.loadAsync({
//     'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
//     'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
//   })
// }

export default function App() {

  // const [ready, setReady] = useState(false)
  // if (!ready) {
  //   return <AppLoading startAsync={loadApp} onFinish={() => setReady(true)} onError={()=> console.log('Error')}/>
  // }
  const screens = {
    BUCalculator: 'BUCalculator',
    Second: 'Second',
  }
  const [screen, setScreen] = useState(screens.BUCalculator)
  return (
    <Provider store={store}>
      <MenuProvider>
        <View style={styles.titleWrapper}>
          {screen === screens.BUCalculator && <Text style={styles.title}>Калькулятор ХЕ</Text>}
          {screen === screens.Second && <Text style={styles.title}>Другой калькулятор </Text>}

          <Menu>
            <MenuTrigger>
              <Image style={styles.img} source={require('./assets/menu4x.png')}/>
            </MenuTrigger>
            <MenuOptions customStyles={{
              optionsContainer: {
                width: '80%',
                backgroundColor: colors.mainBackground,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: colors.borderColor,
              }
            }}>
              <MenuOption onSelect={() => setScreen(screens.BUCalculator)}>
                <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5, color: colors.secondText}}>Калькулятор
                  ХЕ</Text>
              </MenuOption>
              <MenuOption onSelect={() => setScreen(screens.Second)}>
                <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5, color: colors.secondText}}>Другой
                  калькулятор</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>

        </View>
        {screen === screens.BUCalculator && <BUCalculator/>}
        {screen === screens.Second && <Second/>}
      </MenuProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.secondBlue,
  },
  img: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.mainBlue,
  },
});
