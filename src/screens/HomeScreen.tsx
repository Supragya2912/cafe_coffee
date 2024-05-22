import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';

interface Price {
  size: string;
  price: string;
  currency: string;
}

interface CoffeeItem {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: any; // Typically, you'd use a more specific type here, like ImageSourcePropType from 'react-native'
  imagelink_portrait: any; // Same as above
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}

const getCategoriesFromData = (data: CoffeeItem[]): string[] => {
  let temp: Record<string, number> = {};

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};


const getCoffeeList = (category: string, data: CoffeeItem[]) => {

  if (category === "All") {
    return data;
  } else {
    return data.filter((item: any) => item.name === category);
  }
}



const HomeScreen = () => {

  const beans = useSelector((state: RootState) => state.beans);
  const coffee = useSelector((state: RootState) => state.coffee.coffee as CoffeeItem[]);
  const [categories, setCategories] = useState(
    getCategoriesFromData(coffee),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0]
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, coffee as CoffeeItem[]));
  const tabBarHeight = useBottomTabBarHeight();

  console.log("SO", sortedCoffee.length)

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewFlex}>

        <HeaderBar />

        <Text style={styles.ScreenTitle}>Find the best{'\n'}coffee for you</Text>

        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => { }}>
            <CustomIcon
              name="search"
              style={styles.InputIcon}
              color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_18}
            />
          </TouchableOpacity>
          <TextInput placeholder='Find Coffee' value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          ></TextInput>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CatergoryScrollViewStyle}
        >
          {
            categories.map((data, index) => (
              <View
                key={index.toString()}
                style={styles.CategoryScrollViewContainer}
              >
                <TouchableOpacity style={styles.CategoryScrollViewItem} onPress={() =>{
                  setCategoryIndex(
                    {
                      index: index,
                      category: categories[index]
                    }
                  )
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], coffee)
                  ]);
                }}>
                  <Text style={[styles.CategoryText, categoryIndex.index == index ? {color: COLORS.primaryOrangeHex}:{}]}>{data}</Text>
                  {categoryIndex.index === index && <View style={styles.ActiveCategory}></View>
                  }
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({

  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flex: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: 'white',
    paddingLeft: SPACING.space_30
  },
  InputContainerComponent: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CatergoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer:{
    paddingHorizontal: SPACING.space_15,
  },
  CategoryText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory:{
    height: SPACING.space_4,
    width: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryScrollViewItem:{
    alignItems: 'center',
  }


})
export default HomeScreen