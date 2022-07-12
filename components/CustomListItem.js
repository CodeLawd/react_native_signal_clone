import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { ListItem, Avatar } from "@rneui/themed"

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem bottomDivider key={id} onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold", fontSize: 18 }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor qui
          assumenda eaque earum voluptatum hic in cum quia voluptates, aliquam
          dignissimos nam amet, ea sed illum quisquam tempore incidunt dicta!{" "}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
