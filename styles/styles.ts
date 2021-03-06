import {StyleSheet} from "react-native";

export const colors = {
  mainBackground: '#E5E5E5',
  secondBackground: '#FFFCF6',
  mainBlue: '#034488',
  secondBlue: '#CCDDE8',
  red: '#DD1C1C',
  mainText: 'rgba(0, 0, 0, 0.6)',
  secondText: 'rgba(0, 0, 0, 0.8)',
  borderColor: '#178FD6',
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.mainBackground,
    paddingHorizontal: 10,
    paddingBottom: 10,
  }
})