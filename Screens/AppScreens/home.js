import { View, Text, TouchableOpacity, Dimensions, Button, StyleSheet } from 'react-native'
import React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import {PermissionsAndroid} from "react-native"
import Geolocation from "react-native-geolocation-service"
import { getRiderUri, sendLocationURI, sendLastLocationURi } from '../../Apis/apis';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import database from '@react-native-firebase/database';

//const reference=database().ref('./riderApp/location'); //change config acc to your's

export default function Home({navigation,route}) {
  
  const [location, setlocation] = useState([]);  
      const [lats, setLats] = useState();
      const [longs, setLongs] = useState();
      const [time, setTime] = useState();
      const [locationToggle, setLocationToggle] = useState(false);
      const [lastError, setLastError] = useState();
      const [riderID, setRiderID] = useState();
      const [timestamp, settimestamp] = useState();
      const [lastlat, setlastLat] = useState("");
      const [lastlong, setlastong] = useState("");
      const watchId = useRef(null);
      
      
      useEffect(() => {
        database()
          .ref('/riderApp/location')
          .once('value')
                    .then(snapshot => {
                      for(key in snapshot.val()){
                        console.log(key+"Key");
                      }
                    //console.log(snapshot.val());
      });
      }, [])
      
      const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          console.log(value+"Token recieved");
          if(value != null){
            axios({
              method:'Post',
              url: getRiderUri,
              data:{
                'authorization':value,
                
              },
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json',
                  //'authorization':value
              }
            })
              .then(response => {
                console.log(response.data+"RESPONSE");
             const final=(response, JSON.stringify(response));
             
             const abc = JSON.stringify(response.data.data.id);
             const id=JSON.parse(response.data.data.id)
             console.log(id);
             setRiderID(id);
             console.log(response.data.data);
           if(response.data.success==0)
             {
                 
                 console.log(response.data.message);
               //  console.log(token);
             } 
             else{
                 console.log("Success");
                 //setresponse(userObj);
             }
            })
          }
          else{
            console.log("Dont Have Token");
          }
          
        } catch(e) {
          console.log("Sorry cant retrieved key"+e);
        }
    }
        
    
      
    
  const watchCurrentLocation = async (successCallback, errorCallback) => {
    if (!(await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))) {
      errorCallback("Permissions for location are not granted!")
    }
    
  return Geolocation.watchPosition(successCallback, errorCallback, {
    timeout: 10000,
    maximumAge: 500,
    enableHighAccuracy: true,
    distanceFilter: 0,
    useSignificantChanges: false,
  })}
    const stopWatchingLocation = (watchId) => {
      try{
        axios({
          method:'Post',
          url:sendLastLocationURi,
          data:{
              "rider_id":riderID,
              "latsEnd":lastlat,
              "longsEnd":lastlong
              },
          Headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
          }
        }).then((response)=>{
          console.log(JSON.stringify(response)+"last updated location");
        })
        
      }
      catch{
        console.log("cant update Last Location");
      }
      Geolocation.clearWatch(watchId);
      Geolocation.stopObserving(watchId);
    
    }
    
      const startLocationWatch = () => {
        /*watchId.current=Geolocation.getCurrentPosition(
          (position) => {
            console.log(location);
            setlocation(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 1500}
      );*/
      
      watchId.current = watchCurrentLocation(
          
        (position) => {

          //setlocation(position);
          const timestamp=JSON.stringify(position.timestamp);
          settimestamp(timestamp);
          const loc=JSON.stringify(position.coords);
          setlocation(loc);
          const lat=JSON.stringify(position.coords.latitude);
          setLats(lat);
          const lon=JSON.stringify(position.coords.longitude);
          setLongs(lon);
          const tim=JSON.stringify(position.timestamp);
          setTime(tim);

          console.log(loc+"Watch Position");
          
        setlastLat(lat);
        setlastong(lon)
        
              //const email = snapshot.val();
          
               
        /*  if(!database().ref('/riderApp/location/'+riderID)){
              database().ref('/riderApp/location/'+riderID).push({
                rider_id:riderID,
                lats: lats,
                longs: longs,
                current_time:timestamp

        })    
          }
          else{
          database().ref('/riderApp/location/'+riderID).update({
            rider_id:riderID,
            lats: lat,
            longs: lon,
            current_time:timestamp
  
          })
        }*/
        try{

        database().ref('/riderApp/location/'+riderID).update({
          rider_id:riderID,
          lats: lat,
          longs: lon,
          current_time:timestamp,
        });
      }
      catch{
        console.log("Error in firebase update");
      }
       },
       
        (error) => {
          setLastError(error)
        }
      ).then(()=>axios({
        method:'Post',
        url:sendLocationURI,
        data:{
            
            "rider_id":riderID,
            "lats":lats,
            "longs":longs
            },
        Headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
      }).then(()=>
      database().ref('/riderApp/location/'+riderID).once("value", snapshot => {
            if (snapshot.exists()){
              console.log("exists!");
              console.log(lats);
              console.log(JSON.stringify(snapshot.val())+"value")
              database().ref('/riderApp/location/'+riderID).update({
          rider_id:riderID,
          lats: lats,
          longs: longs,
          current_time:timestamp

        })
              //const email = snapshot.val();
                }
                else{
                  database().ref('/riderApp/location/'+riderID).push({
          rider_id:riderID,
          lats: lats,
          longs: longs,
          current_time:timestamp
        })
      }
            }))
        
      .then((response) => {
        
        const output1=JSON.stringify(response);
        console.log(output1+"api response");
        const out=JSON.parse(response.data.success);
        const output=JSON.stringify(out);
        
        if(output==0){
            console.log("unable to Update Location");
        }
        else{
            console.log("User Location Updated");

        }
        
      }).catch(error=>console.log(error)))
      .catch(error=>{console.log(error);})
        
      }
    
      const cancelLocationWatch = () => {
        stopWatchingLocation(watchId.current)
        
        setlocation(null)
        setLastError(null)
      }
    
      const setLocationWatch = (flag) => {
        setLocationToggle(flag)
      }
    
      // execution after render when locationToggle is changed
      useEffect(() => {
        if (locationToggle) {
          startLocationWatch()
        } else cancelLocationWatch()
        return cancelLocationWatch()
      }, [locationToggle])
    
      // mount / unmount
      useEffect(() => {
        cancelLocationWatch()
      }, [])
    
      useEffect(() => {
        getToken();
      }, [])
      
   
  
 
  //console.log(location+"Location")
  
  
  return (
    <View style={styles.mainContaier}>
      <View style={styles.container}>
     <MapView
     
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       
       initialRegion={{
         latitude: 24.8607, //Static Lats/longs just for the map View
         longitude: 67.0011,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
       zoomControlEnabled={true}
      
       
     />
   </View>
   <View>
   <Text>{lats}Lats</Text>
   <Text>{longs}Lats</Text> 
   </View>
      <View style={styles.bottomView}>
       
        <TouchableOpacity 
          onPress={() => {alert("Location Tracking Started"); 
          setLocationWatch(true)}}
        style={styles.touchOpacity}>
          <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>START RIDE</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => {alert("Location Tracking Stopped");
             setLocationWatch(false)}}
            style={styles.touchOpacity}>
          <Text style={{fontSize:20,color:'white', fontWeight:'bold'}}>STOP RIDE</Text>
        </TouchableOpacity>

      </View>
      
      </View>
 
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("screen").width*1.5,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mainContaier:{
    width:Dimensions.get('screen').width,
    height:Dimensions.get('screen').width*1.85,
    backgroundColor:'white'
  },
  bottomView:{
    bottom:1  ,
    position:'absolute',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    height:50,
    width:'100%',
    backgroundColor:'white'
  },
  touchOpacity:{
    width:180,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0A6376',
    borderRadius:5
  },
 });
 