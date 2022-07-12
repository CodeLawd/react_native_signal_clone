import { StyleSheet, Text, View } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { Button, Icon, Input } from "@rneui/themed"
import { getFirestore } from "firebase/firestore"
import Toast from "react-native-toast-message"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

// const db = getFirestore()

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    })
  }, [navigation])

  const createChat = async () => {
    if (input.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Please add a chat name",
        position: "bottom",
      })
      return
    }

    let cancel = false
    try {
      setLoading(true)

      if (cancel) return
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: input,
      })
      Toast.show({
        type: "success",
        text1: "Successfully added chat",
        position: "bottom",
      })
      navigation.goBack()
      setLoading(false)
    } catch (e) {
      Toast.show({
        type: "error",
        text1: error.message,
        position: "bottom",
      })
      setLoading(false)
    }

    return () => {
      cancel = true
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        onChangeText={(text) => setInput(text)}
        value={input}
        leftIcon={<Icon name="chat" type="entypo" color="#777" />}
        onSubmitEditing={createChat}
      />
      <Button title="Create chat" onPress={createChat} loading={loading} />
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    height: "100%",
  },
})
