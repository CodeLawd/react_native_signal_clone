import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native"
import { Input, Image, Button } from "@rneui/themed"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
// import { auth } from "../firebase"

const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const auth = getAuth()

  const signIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Signed in successful 👋",
          position: "bottom",
        })
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message,
          position: "bottom",
        })
      })
    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user)
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.main}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/2048px-Signal-Logo.svg.png",
        }}
        style={styles.image}
      />
      <Input
        placeholder="Email"
        type="email"
        // autoFocus
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        placeholder="Password"
        type="password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button
        title="Login"
        onPress={signIn}
        containerStyle={styles.button}
        size="lg"
        buttonStyle={{
          backgroundColor: "#2c6bed",
          borderRadius: 5,
        }}
        titleStyle={{
          color: "white",
          fontSize: 20,
        }}
        loading={loading}
      />
      <Button
        title="Register"
        type="outline"
        containerStyle={styles.button}
        color="primary"
        size="lg"
        // titleStyle={{
        //   fontSize: 14,
        // }}
        onPress={() => navigation.navigate("Register")}
      />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  main: {
    margin: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    marginHorizontal: 40,
    marginTop: 20,
  },
})
