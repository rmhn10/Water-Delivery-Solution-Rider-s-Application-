import React, { useEffect } from 'react'
import {
  View, 
  StyleSheet, 
  Text, 
  Dimensions, 
  TouchableOpacity, 
} from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import {getRiderUri} from '../../Apis/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Riderprofile({route}) {
  const [Response, setresponse] = useState("");
  const [firstName, setFName] = useState([]);
  const [lastName, setlName] = useState([]);
  const [UserEmail, setUserEmail] = useState([]);
  const [UserPhone, setUserPhone] = useState([]);
  const navigation = useNavigation();
  const getRiderData = async () => {
    console.log(getRiderUri);
    const value = await AsyncStorage.getItem('token');
    
    //console.log(token+" rider token");
      
      if(value != null){
        console.log(value+"value");
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
          //console.log(response.data+"RESPONSE");
       const final=(response, JSON.stringify(response.data.data));
       const abc = JSON.stringify(response.data.data);
       setresponse(final);
       const fname = JSON.stringify(response.data.data.firstname);
       const Fname=JSON.parse(fname);
       setFName(Fname);
       const lname = JSON.stringify(response.data.data.lastname);
       const Lname=JSON.parse(lname)
       setlName(Lname);
       const mail = JSON.stringify(response.data.data.email);
       const Mail=JSON.parse(mail)
       setUserEmail(Mail);
       const address = JSON.stringify(response.data.data.address);
       const add=JSON.parse(address)
       setUserPhone(add);
       //const firstname =JSON.parse(abc);
       //const name = abc.toString();
       console.log(final);
       
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
    }
  useEffect(() => {
    getRiderData();
  
}, [])

  

  const doUserLogOut = async function () {
    
      try {
          await AsyncStorage.removeItem('token');
          console.log("User Signed out");
          alert("Signed Out..!");
          navigation.navigate('LoginScreen');
          return true;

      }
      catch(exception) {
          return false;
      }
  
  };


    return (
      <View style={{backgroundColor:'#0A6376'}}>
          <View style={{marginTop:10,width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}>
          <View style={{width:200,height:200,borderRadius:100,alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'grey'}}></View>
          <View style={{marginTop:10,width:Dimensions.get('screen').width,height:80,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#000000',fontSize:30,fontWeight:'bold'}}>{firstName} {lastName}</Text>
          </View>
          <View style={{flexDirection:'row',marginBottom:5,height:50,width:'90%',alignItems:'center',alignSelf:'center',backgroundColor:'white',borderRadius:20}}>
            <Icon name='phone' size={25} color={'#0c1229'} style={{paddingLeft:15,textAlign:'left'}} />
            <Text style={{width:'80%',paddingLeft:10,fontSize:20,color:'#0c1229',textAlign:'left'}}>{UserPhone}</Text>
          </View>
          <View style={{flexDirection:'row', margin:5,height:50,width:'90%',alignItems:'center',alignSelf:'center',backgroundColor:'white',borderRadius:20}}>
            <Entypo name='mail' size={25} color={'#0c1229'} style={{paddingLeft:10,textAlign:'left'}} />
            <Text style={{width:'80%',paddingLeft:10,fontSize:20,color:'#000000',textAlign:'left'}}>{UserEmail}</Text>
          </View>
          <View style={{justifyContent:'center',alignItems:'center',marginTop:20,width:'100%',bottom:1,height:100}}>
            <TouchableOpacity 
            onPress={()=>{
              doUserLogOut();
            }}
            style={{bottom:5,position:'absolute',backgroundColor:'#000000', width:'80%',height:50,borderRadius:15,justifyContent:'center'}}>
              <Text style={{textAlign:'center',fontSize:18,color:'white'}}>Log Out</Text>
              </TouchableOpacity>
              </View>
          </View>

      </View>
  );
}

const styles = StyleSheet.create({
    inpStyle:{
        margin:5,
        alignSelf:"center",
        alignItems:"center",
        height:50,
        width:"90%",
        color:"black",
        backgroundColor:Colors.white,
        borderRadius:50,
        borderColor:'#e0edf5',
        //padding:4,
        paddingHorizontal:20,
        borderWidth:1,
        
        flexDirection:'row'
    },
})


