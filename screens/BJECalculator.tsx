import React, {useEffect, useState} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import uuid from "react-native-uuid";
import {colors, globalStyles} from '../styles/styles'
import {addBjeProduct} from "../store/modules/bje/reducer";
import {getBjeProducts} from "../store/modules/bje/selectors";
import CardBJE from "../components/CardBJE";

type TFormState = {
  caloriesInProduct: string;
  carbohydratesInProduct: string;
};

export default function BJECalculator() {
  const dispatch = useDispatch();

  const onPressAddProduct = () => {
    if (!formState.caloriesInProduct || !formState.carbohydratesInProduct) {
      return
    }

    setFormState({
      ...formState,
      caloriesInProduct: '',
      carbohydratesInProduct: '',
    })

    dispatch(
      addBjeProduct({
        id: uuid.v1(),
        BJEInAddedProduct: Number(BJEInProduct.toFixed(2)),
        ...formState,
      })
    );
  };

  const bjeProductsList = useSelector(getBjeProducts);

  const [formState, setFormState] = useState<TFormState>({
    carbohydratesInProduct: "",
    caloriesInProduct: "",
  });

  const BJEInProduct = (Number(formState.caloriesInProduct) - (Number(formState.carbohydratesInProduct) * 4)) / 100

  const BJEInAddedProducts = bjeProductsList.reduce((total, item) => {
    return total + item.BJEInAddedProduct;
  }, 0);

  const onChangeCaloriesInProduct = (text: string) => {
    setFormState({
      ...formState,
      caloriesInProduct: text,
    });
  };

  const onChangeCarbohydratesInProduct = (text: string) => {
    setFormState({
      ...formState,
      carbohydratesInProduct: text,
    });
  };

  const [showProductList, setShowProductList] = useState(true)

  const keyboardDidShow = () => {
    setShowProductList(false)
  }
  const keyboardDidHide = () => {
    setShowProductList(true)
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    };
  }, []);

  return (
    <View style={globalStyles.container}>

      {showProductList && <ScrollView style={styles.scrollWrapper}>
        {bjeProductsList.length === 0 ?
          <Text style={styles.emptyProductListText}>Список продуктов...</Text> :
          <View style={styles.listContainer}>
            {bjeProductsList.map((product) => {
              return <CardBJE key={product.id} card={product}/>;
            })}
          </View>
        }
      </ScrollView>}

      <View style={styles.resultWrapper}>
        <Text style={styles.resultText}>
          Всего БЖЕ:&nbsp;&nbsp;
          <Text style={styles.resultNumber}>
            {BJEInAddedProducts.toFixed(2)}
          </Text>
        </Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.label}>Калораж продукта:</Text>
        <TextInput
          value={formState.caloriesInProduct}
          onChangeText={onChangeCaloriesInProduct}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Введите кол-во ккалл. в продукте"
        />

        <Text style={styles.label}>Кол-во г. углеводов в продукте :</Text>
        <TextInput
          value={formState.carbohydratesInProduct}
          onChangeText={onChangeCarbohydratesInProduct}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Введите кол-во г. углеводов в продукте"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onPressAddProduct}
        >
          <Text style={styles.btnText}>Добавить</Text>
        </TouchableOpacity>

        <View style={styles.resultNowWrapper}>
          <Text style={styles.resultNowText}>
            Текущее количество БЖЕ:&nbsp;&nbsp;
            <Text style={styles.resultNowNumber}>{BJEInProduct.toFixed(2)}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.borderColor,
    backgroundColor: colors.secondBackground,
    marginTop: 10,
    elevation: 5,
  },
  emptyProductListText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.mainText,
    marginTop: 60,
  },
  listContainer: {
    width: "100%",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: "wrap",
    padding: 5,
  },
  form: {
    width: "100%",
    backgroundColor: colors.secondBlue,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    elevation: 4,
  },
  label: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.mainText
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.borderColor,
    backgroundColor: colors.secondBackground,
    fontSize: 16,
    padding: 5,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.mainBlue,
    borderRadius: 8,
    paddingHorizontal: 80,
    paddingVertical: 8,
    elevation: 3,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondBackground,
  },
  resultWrapper: {
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondText,
  },
  resultNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  resultNowWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: 5,
  },
  resultNowText: {
    color: colors.mainText,
    fontSize: 18,
    fontWeight: "bold",
  },
  resultNowNumber: {
    color: colors.mainText,
    fontSize: 18,
    fontWeight: "bold",
  },
});

