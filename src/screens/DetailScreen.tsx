import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { COLORS } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import { addFavourite, deleteFavourite } from '../redux/reducers/favouriteSlice';


const DetailScreen = ({navigation, route} : any) => {

  const { type, index } = route.params;
  const dispatch = useDispatch();
  const dataFromRedux = useSelector((state: any) =>
    type === 'Coffee' ? state.coffee.coffee[index] : state.beans.beans[index]
  );

 

  const BackHandler = () => {
    navigation.pop();
  }
  const toggleFavourite = (favourite: boolean, type: string, id: string) => {
    if (favourite) {
      dispatch(deleteFavourite(id));
    } else {
      dispatch(addFavourite({ id, type }));
    }
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
         special_ingredient = {dataFromRedux.special_ingredient}
         ingredients  = {dataFromRedux.ingredients}
         average_rating = {dataFromRedux.average_rating}
         ratings_count  = {dataFromRedux.ratings_count}
         roasted = {dataFromRedux.roasted}
         BackHandler={BackHandler}
         toggleFavourite={toggleFavourite}
         />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow: 1,
  }
})

export default DetailScreen