import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import {useDispatch} from "react-redux";
import {removeProduct} from "../store/modules/xe/reducer";
import {TProduct} from "../store/modules/xe/types";
import {colors} from "../styles/styles";
import {TBJEProduct} from "../store/modules/bje/types";
import {removeBjeProduct} from "../store/modules/bje/reducer";

type TProps = {
  card: TBJEProduct;
};

export default function CardBJE(props: TProps) {
  const dispatch = useDispatch();

  const removeProductOnPress = () => {
    dispatch(removeBjeProduct(props.card.id));
  };
  return (
    <View style={styles.card}>
      <View style={styles.currentValues}>
        <Text style={styles.currentValueText}>{props.card.caloriesInProduct}&nbsp;ккал.</Text>
        <Text style={styles.currentValueText}>{props.card.carbohydratesInProduct}&nbsp;г.</Text>
      </View>

      <View style={styles.result}>
        <Text style={styles.resultText}>{props.card.BJEInAddedProduct}&nbsp;БЖE</Text>
      </View>

      <TouchableOpacity style={styles.remove} onPress={removeProductOnPress}>
        <Image style={styles.img} source={require('../assets/delete4x.png')}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.borderColor,
    backgroundColor: colors.secondBlue,
    padding: 5,
    marginBottom: 5,
  },
  currentValues: {
    display: "flex",
    width: "40%",
    justifyContent: "center",
  },
  currentValueText: {
    fontWeight: "bold",
    fontSize: 16,
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
    fontSize: 20,
    color: colors.secondText,
  },
});
