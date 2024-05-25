import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import { addToFavoriteList } from '../redux/reducers/favouriteSlice';
import PaymentFooter from '../components/PaymentFooter';
import { addToCart } from '../redux/reducers/CartSlice';

const DetailScreen = ({ navigation, route }: any) => {

  const { type, index } = route.params;
  const dispatch = useDispatch();
  const dataFromRedux = useSelector((state: any) =>
    type === 'Coffee' ? state.coffee.coffee[index] : state.beans.beans[index]
  );
  const [fullDescription, setFullDescription] = React.useState(false);
  const [price, setPrice] = useState(dataFromRedux.prices[0]);

  const BackHandler = () => {
    navigation.pop();
  }

  const toggleFavourite = (favourite: boolean, type: string, id: string) => {
    dispatch(addToFavoriteList({ type, id }));
  };

 const addItemToCart = () => {
  const { id, index, name, roasted, imagelink_square, special_ingredient, type } = dataFromRedux;
  
  dispatch(addToCart({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
    quantity: 1,
    size: price.size,
  }));

  navigation.navigate('Cart');
};

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={dataFromRedux.imagelink_portrait}
          type={dataFromRedux.type}
          id={dataFromRedux.id}
          favourite={dataFromRedux.favourite}
          name={dataFromRedux.name}
          special_ingredient={dataFromRedux.special_ingredient}
          ingredients={dataFromRedux.ingredients}
          average_rating={dataFromRedux.average_rating}
          ratings_count={dataFromRedux.ratings_count}
          roasted={dataFromRedux.roasted}
          BackHandler={BackHandler}
          toggleFavourite={toggleFavourite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {
            fullDescription ? (
              <TouchableWithoutFeedback onPress={() => { setFullDescription(prev => !prev) }}>
                <Text style={styles.DescriptionText}>{dataFromRedux.description}</Text>
              </TouchableWithoutFeedback>
            ) :
              (
                <TouchableWithoutFeedback onPress={() => {
                  setFullDescription(prev => !prev)
                }}>
                  <Text numberOfLines={3} style={styles.DescriptionText}>{dataFromRedux.description}</Text>
                </TouchableWithoutFeedback>
              )
          }

          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {
              dataFromRedux.prices.map((data: any) => (
                <TouchableOpacity
                  key={data.size}
                  onPress={() => setPrice(data)}
                  style={[styles.SizeBox, {
                    borderColor: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex,
                  }]}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize: dataFromRedux.type == "bean" ? FONTSIZE.size_14 : FONTSIZE.size_16,
                        color: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex,
                      }
                    ]}>{data.size}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle='Add to Cart'
          buttonPressHandler={() => {
            addItemToCart();
          }
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_10,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  }
});

export default DetailScreen;
