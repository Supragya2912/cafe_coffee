import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux'


const HomeScreen = () => {

  const beans = useSelector((state: RootState) => state.beans);
  const coffee = useSelector((state: RootState) => state.coffee);
  console.log(beans)
  console.log(coffee)
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}



const styles = StyleSheet.create({})
export default HomeScreen