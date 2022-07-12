import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddChat, Chat, Home, Login, Register } from "./screens"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

const Stack = createNativeStackNavigator()

export default function App() {
  const globalOptions = {
    headerStyle: { backgroundColor: "#045D5D" },
    headerTitleStyle: { color: "#fff" },
    headerTintColor: "#fff",
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <Stack.Navigator screenOptions={globalOptions} initialRouteName="Login"> */}
        <Stack.Navigator screenOptions={globalOptions}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Let's Get Started" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "Register" }}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddChat" component={AddChat} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
