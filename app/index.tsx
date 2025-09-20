import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { aICall } from '@/ai/resume_builder'
import { ThemedText } from '@/components/themed-text'

const index = () => {
    const [key, setKey] = useState("")
   const fetchApiKey = async() => {
    const data = await aICall()
    setKey(data)
   }
  return (
    <View>
     {key&&<ThemedText>{key}</ThemedText>}

     <TouchableOpacity onPress={fetchApiKey}>
        <ThemedText>Generate</ThemedText>
     </TouchableOpacity>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})