import * as Location from 'expo-location';
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Fontisto } from '@expo/vector-icons'

const { width: SCREEN_WIDTH } = Dimensions.get("window");


export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [date, setDate] = useState([]);

  const API_KEY = "9cada3532028b5953c67de4742964ac0";

  const icons ={
    "Clear" : "day-sunny",
    "Clouds" : "cloudy",
    "Snow" : "snow",
    "Rain" : "rain",
  }

  const ask = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }

    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps:false});
    setCity(location[0].city);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
    setDate(toStringByFormatting());
  }

  const toStringByFormatting = () => {
    
    let date = new Date();
    let dateArr = [];
    const DAY = 1000 * 60 * 60 * 24;
    let i;
    for (i = 0; i < 8; i++) {
        date.setTime(date.getTime() + DAY);
        dateArr.push(date.toString().substring(0,10));
    }
    return dateArr;
   }

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>  
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.weather}>
          { days.length === 0 ? (
          <View style={{...styles.day, alignItems:"center"}}>
            <ActivityIndicator
             color="white"
             style={{ marginTop: 10}}
             size="large" />
          </View>
          ) : (
          days.map((day, index) =>
          <View key={index} style={styles.day}>
            <View style={{  flexDirection: "row", alignItems:"flex-end", width:"80%", justifyContent:"space-between" }}>
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Fontisto name={icons[day.weather[0].main]} size={80} color="white" />
            </View>
            <Text style={styles.description}>{day.weather[0].main}</Text>
            {/* <Text style={styles.textNomal}>{day.weather[0].description}</Text> */}
            <Text style={styles.textNomal}>{date[index]}</Text>
          </View>
          )
          )}
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
    alignItems: "flex-start",
  },
  temp:{
    marginTop: 50,
    fontSize: 150,
    color: "white",
  },
  description:{
    fontSize: 60,
    marginTop:-30,
    color: "white",
  },
  textNomal:{
    color:"white",
    fontSize: 20,
  }
})
