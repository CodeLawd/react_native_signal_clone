import { ImageBackground, StyleSheet, Text, View } from "react-native"
import React, { useLayoutEffect } from "react"
import { Avatar } from "@rneui/themed"

const Chat = ({ route, navigation }) => {
  const { chatName, id } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatName,
      headerTitle: () => (
        <View style={{ marginLeft: 10 }}>
          <Avatar
            rounded
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
            }}
            containerStyle={{ marginRight: 20 }}
            // onPress={signOutAction}
            // containerStyle={{ marginRight: 10, width: 30, height: 30 }}
          />
          <Text>{chatName}</Text>
        </View>
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <Text>This is the Chat screen for {chatName}</Text>
      </ImageBackground>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    // flex: 1,
    height: "100%",
    // justifyContent: "center",
    // opacity: "0.6",
  },
})
