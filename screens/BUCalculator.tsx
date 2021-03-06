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
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../store/modules/product/selectors";
import {addProduct} from "../store/modules/product/reducer";
import uuid from "react-native-uuid";
import {colors, globalStyles} from '../styles/styles'

export type TFormState = {
  inOneXE: string;
  inOneHundredGrams: string;
  totalWeightProduct: string;
};

export default function BUCalculator() {
  const dispatch = useDispatch();

  const onPressAddProduct = () => {
    if (!formState.inOneXE || !formState.inOneHundredGrams || !formState.totalWeightProduct) {
      return
    }

    setFormState({
      ...formState,
      inOneHundredGrams: '',
      totalWeightProduct: '',
    })

    dispatch(
      addProduct({
        id: uuid.v1(),
        XEInAddedProduct: Number(XEInProduct.toFixed(2)),
        ...formState,
      })
    );
  };

  const productsList = useSelector(getProducts);

  const [formState, setFormState] = useState<TFormState>({
    inOneXE: "12",
    inOneHundredGrams: "",
    totalWeightProduct: "",
  });

  const XEInProduct =
    ((Number(formState.inOneHundredGrams) / 100) *
      Number(formState.totalWeightProduct)) /
    Number(formState.inOneXE);

  const XEInAddedProducts = productsList.reduce((total, item) => {
    return total + item.XEInAddedProduct;
  }, 0);

  const onChangeInOneXEText = (text: string) => {
    setFormState({
      ...formState,
      inOneXE: text,
    });
  };

  const onChangeInOneHundredGrams = (text: string) => {
    setFormState({
      ...formState,
      inOneHundredGrams: text,
    });
  };

  const onChangeTotalWeightProduct = (text: string) => {
    setFormState({
      ...formState,
      totalWeightProduct: text,
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
        {productsList.length === 0 ?
          <Text style={styles.emptyProductListText}>Список продуктов...</Text> :
          <View style={styles.listContainer}>
            {productsList.map((product) => {
              return <Card key={product.id} card={product}/>;
            })}
          </View>
        }
      </ScrollView>}

      <View style={styles.resultWrapper}>
        <Text style={styles.resultText}>
          Всего ХЕ:&nbsp;&nbsp;
          <Text style={styles.resultNumber}>
            {XEInAddedProducts.toFixed(2)}
          </Text>
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Углеводы в одной хлебной единице, г. :</Text>
        <TextInput
          value={formState.inOneXE}
          onChangeText={onChangeInOneXEText}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Углеводы в одной хлебной единице"
        />

        <Text style={styles.label}>Углеводы в 100 граммах продукта г. :</Text>
        <TextInput
          value={formState.inOneHundredGrams}
          onChangeText={onChangeInOneHundredGrams}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Введите кол-во г. углеводов в 100 г. продукта"
        />

        <Text style={styles.label}>Общий вес продукта г. :</Text>
        <TextInput
          value={formState.totalWeightProduct}
          onChangeText={onChangeTotalWeightProduct}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Введите вес продукта"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onPressAddProduct}
        >
          <Text style={styles.btnText}>Добавить</Text>
        </TouchableOpacity>

        <View style={styles.resultNowWrapper}>
          <Text style={styles.resultNowText}>
            Текущее количество ХЕ:&nbsp;&nbsp;
            <Text style={styles.resultNowNumber}>{XEInProduct.toFixed(2)}</Text>
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
    padding: 10,
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
