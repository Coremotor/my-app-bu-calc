import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import {useDispatch} from "react-redux";
import {removeProduct} from "../store/modules/product/reducer";
import {TProduct} from "../store/modules/product/types";
import {colors} from "../styles/styles";

type TProps = {
  card: TProduct;
};

export default function App(props: TProps) {
  const dispatch = useDispatch();

  const removeProductOnPress = () => {
    dispatch(removeProduct(props.card.id));
  };
  return (
    <View style={styles.card}>
      <View style={styles.currentValues}>
        <Text style={styles.currentValueText}>{props.card.inOneXE}&nbsp;уг.</Text>
        <Text style={styles.currentValueText}>{props.card.inOneHundredGrams}&nbsp;уг.</Text>
        <Text style={styles.currentValueText}>{props.card.totalWeightProduct}&nbsp;г.</Text>
      </View>
      <View style={styles.removeResultWrapper}>
        <TouchableOpacity style={styles.remove} onPress={removeProductOnPress}>
          <Image style={styles.img} source={require('../assets/delete4x.png')}/>
        </TouchableOpacity>
        <View style={styles.result}>
          <Text style={styles.resultText}>{props.card.XEInAddedProduct}&nbsp;XE</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    width: 154,
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.borderColor,
    backgroundColor: colors.secondBlue,
    padding: 10,
    marginBottom: 10,
  },
  currentValues: {
    display: "flex",
    width: "40%",
    justifyContent: "center",
  },
  currentValueText: {
    fontWeight: "bold",
    fontSize: 22,
    color: colors.mainText,
  },
  removeResultWrapper: {
    width: '60%',
    display: "flex",
  },
  remove: {
    display: 'flex',
  },
  img: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
  },
  result: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontWeight: "bold",
    fontSize: 28,
    color: colors.secondText,
  },
});
