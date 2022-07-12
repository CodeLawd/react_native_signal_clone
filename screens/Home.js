import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { CustomListItem } from "../components"
import { Avatar } from "@rneui/base"
import { auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import Toast from "react-native-toast-message"
import { Icon } from "@rneui/themed"
import { collection, getDocs } from "firebase/firestore"

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([])
  const signOutAction = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login")
        Toast.show({
          type: "success",
          text1: "Successfully signed out 👋",
          position: "bottom",
        })
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTintColor: "brlack",
      headerTitleStyle: { color: "#000" },
      headerLeft: () => (
        <View stylw={{ marginLeft: 10 }}>
          <TouchableOpacity>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
              containerStyle={{ marginRight: 20 }}
              onPress={signOutAction}
              // containerStyle={{ marginRight: 10, width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 5,
            width: 80,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Icon
              name="camerao"
              type="antdesign"
              onPress={() => console.log("hello")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <Icon name="addusergroup" type="antdesign" />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    async function fetchChats() {
      await getDocs(collection(db, "chats"))
        .then((snapshot) => {
          setChats(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              chatName: doc.data().chatName,
            }))
          )
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
    fetchChats()
  }, [chats])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {chats.length > 0 ? (
        <ScrollView style={styles.scrollContainer}>
          {chats?.map(({ id, chatName }) => (
            <CustomListItem
              key={id}
              id={id}
              chatName={chatName}
              enterChat={enterChat}
            />
          ))}
        </ScrollView>
      ) : (
        <Text> Loading chats...</Text>
      )}
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
  },
})
