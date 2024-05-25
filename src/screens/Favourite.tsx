import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Favourite = () => {


  const favourite = useSelector((state: any) => state.favourite.favourite);
  console.log(favourite);
  return (
    <View>
      <Text>Favourite</Text>
    </View>
  )
}


const styles = StyleSheet.create({})
export default Favourite
