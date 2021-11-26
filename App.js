import { StatusBar} from "expo-status-bar"
import React from 'react';
import { View, Text, Dimensions,  StyleSheet, ScrollView } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="light"/>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "black",
  },
  city:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName:{
    color: "white",
    fontSize: 68,
    fontWeight: "500",
  },
  weather:{
  },
  day:{
    width: SCREEN_WIDTH, 
    flex:1,
    alignItems: "center",
  },
  temp:{
    marginTop: 50,
    fontSize: 188,
    color: "white",
  },
  description:{
    fontSize: 60,
    marginTop:-30,
    color: "white",
  },
})
