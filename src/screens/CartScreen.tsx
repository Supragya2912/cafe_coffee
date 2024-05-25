import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const CartScreen = () => {

  const cart = useSelector((state: any) => state.cart.cart);
  console.log(cart);
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}



const styles = StyleSheet.create({})
export default CartScreen