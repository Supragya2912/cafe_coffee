import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import HeaderBar from '../components/HeaderBar'
import { COLORS, SPACING } from '../theme/theme'
import { ScreenContainer } from 'react-native-screens'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PaymentFooter from '../components/PaymentFooter'
import CartItem from '../components/CartItem'
import {increaseQuantity, decrementCartItemQuantity} from '../redux/reducers/CartSlice'

const CartScreen = ({ navigation, route }: any) => {

  const cart = useSelector((state: any) => state.cart.cart);
  console.log(cart.length);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment');
  }


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Cart' />
            {
              cart.length == 0 ? <EmptyListAnimation title={'Cart is empty'} /> : (
                <View style={styles.ListItemContainer}>
                  {
                    cart.map((data: any) => (
                      <TouchableOpacity onPress={() => {
                      }} key={data.id}>
                        <CartItem 
                           id={data.id}
                            name={data.name}
                           roasted={data.roasted}
                           prices={data.prices}
                           type={data.type}
                           incrementCartItemQuantityHandler={
                            increaseQuantity
                          }
                          decrementCartItemQuantityHandler={
                            decrementCartItemQuantity
                          }
                           imagelink_square={data.imagelink_square}
                           special_ingredient={data.special_ingredient}
                        />
                      </TouchableOpacity>
                    ))
                  }
                </View>
              )
            }
          </View>
          {
            cart.length != 0 ? <PaymentFooter
              buttonTitle='Pay'
              price={{ price: '200', currency: '₹' }}
              buttonPressHandler={() => {
                buttonPressHandler();
              }}
            /> : <></>
          }
        </View>
      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },

  ScrollViewFlex: {
    flexGrow: 1,

  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  }
})
export default CartScreen