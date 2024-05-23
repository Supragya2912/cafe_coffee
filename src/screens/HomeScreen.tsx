import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

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

  const beans = useSelector((state: RootState) => state.beans.beans as CoffeeItem[]);
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
console.log(beans)

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
                <TouchableOpacity style={styles.CategoryScrollViewItem} onPress={() => {
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
                  <Text style={[styles.CategoryText, categoryIndex.index == index ? { color: COLORS.primaryOrangeHex } : {}]}>{data}</Text>
                  {categoryIndex.index === index && <View style={styles.ActiveCategory}></View>
                  }
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>

        {/* Coffee Flat List */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => { }}>
              <CoffeeCard
                name={item.name}
                id={item.id}
                index={item.index}
                type={item.type}
                rosted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={
                  () => { }
                } />
            </TouchableOpacity>
          }}
        />

        <Text style={styles.CoffeeBeansTitle} >Coffee Beans</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beans}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => { }}>
              <CoffeeCard
                name={item.name}
                id={item.id}
                index={item.index}
                type={item.type}
                rosted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={
                  () => { }
                } />
            </TouchableOpacity>
          }}
        />

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
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
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
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
})
export default HomeScreen