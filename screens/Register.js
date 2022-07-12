import { StyleSheet, View, KeyboardAvoidingView } from "react-native"
import React, { useState } from "react"
import { Input, Image, Button, Text } from "@rneui/themed"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

const Register = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [imageURL, setImageURL] = useState("")

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      await user.user.update({
        displayName: name,
        photoURL:
          imageURL ||
          "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text h3 style={styles.text}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <Input
          placeholder="Image URL (optional)"
          type="text"
          value={imageURL}
          onChangeText={(text) => setImageURL(text)}
          onSubmitEditing={register}
        />
        <Button
          title="Create Account"
          onPress={register}
          size="lg"
          buttonStyle={{
            backgroundColor: "#2c6bed",
            borderRadius: 5,
          }}
          titleStyle={{
            color: "white",
            fontSize: 20,
          }}
          containerStyle={styles.button}
        />
        <Button
          title="Login"
          type="outline"
          containerStyle={styles.button}
          color="primary"
          size="lg"
          // titleStyle={{
          //   fontSize: 14,
          // }}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  button: {
    width: "100%",
    marginTop: 20,
  },

  inputContainer: {
    width: "100%",
  },

  text: {
    marginBottom: 20,
  },
})
