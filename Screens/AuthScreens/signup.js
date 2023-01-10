import React, { useContext, useState } from 'react';
import {
    View, 
    StyleSheet,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconEntypo from 'react-native-vector-icons/Entypo';

import { Axios } from 'axios';
import * as call from '../../Apis/apis';
const axios = require('axios').default;
import { registerURI } from '../../Apis/apis';

export default function Signup({navigation}) {

    const[firstname,setFname]=useState('');
    const[lastname,setLname]=useState('');
    const[address,setAddress]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[repassword,setrePassword]=useState('');

    //const register =useContext(AuthContext);

    const Register=()=>{
        axios({
            method:'Post',
            url:registerURI,
            data:{
                firstname:firstname,
                lastname:lastname,
                email:email,
                address:address,
                password:password
                },
            Headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
          })
          .then((response) => {
            console.log(response.data);
            const out=JSON.parse(response.data.success);
            const output=JSON.stringify(response.data.message);
            console.log("output"+out);
            if(out==0){
                console.log("User unable to register"+output);
                alert(output);

            }
            else{
                console.log("User Successfully Registered");
                alert("User Registered..!");
                navigation.navigate('LoginScreen');
            }
            
          }).catch(error=>console.log(error));
    }
    return (
        
        <View style={styles.container}>
        <Animated.View style={styles.header}>
        <Animated.Image
                
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode='stretch'
                
                />
        </Animated.View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={styles.footer}
           animation="fadeInUpBig"> 
        <Text style={styles.title}>Sign Up</Text>
        
      <Text style={styles.text}>First Name</Text>
      <View style={styles.inpStyle}>
      <Icon name='user-circle' size={20} color='#0c1229'/>
          <TextInput 
              style={styles.textIn}
              placeholder="Enter First Name"
              placeholderTextColor="black"
              autoCapitalize="none"
              
              autoCorrect={false}
              value={firstname}
              onChangeText={setFname}   
              />
              
              </View>
              <Text style={styles.text}>Last Name</Text>
      <View style={styles.inpStyle}>
      <Icon name='user-circle' size={20} color='#0c1229'/>
          <TextInput 
              style={styles.textIn}
              placeholder="Enter Last Name"
              placeholderTextColor="black"
              autoCapitalize="none"
              
              autoCorrect={false}
              value={lastname}
              onChangeText={setLname}   
              />
              
              </View>
          
            <Text style={styles.text}>Enter Home Address</Text>
              <View style={styles.inpStyle}>
      <Icon name='user-circle' size={20} color='#0c1229'/>
          <TextInput 
              style={styles.textIn}
              placeholder="Enter Home Address"
              placeholderTextColor="black"
              autoCapitalize="none"
              
              autoCorrect={false}
              value={address}
              onChangeText={setAddress}   
              />
              
              </View>     

              <Text style={styles.text}>Enter Email</Text> 
          <View style={styles.inpStyle}>
          <IconEntypo name='email' size={20} color='#0c1229'/>
          <TextInput 
              style={styles.textIn}
              placeholder="Enter Email Address"
              placeholderTextColor="black"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              />
          </View>    
       
            
      <Text style={styles.text}>Enter Password</Text> 
            <View style={styles.inpStyle}>
            <Icon name='asterisk' size={20} color='#0c1229'/>
            <TextInput style={styles.textIn}
                placeholder="Enter Password"
                placeholderTextColor="black"
                autoCapitalize="none"
                autoCorrect={false}
                
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            </View>
            <Text style={styles.text}>Enter Password</Text> 
            <View style={styles.inpStyle}>
            <Icon name='asterisk' size={20} color='#0c1229'/>
            <TextInput style={styles.textIn}
                placeholder="Enter Password"
                placeholderTextColor="black"
                autoCapitalize="none"
                autoCorrect={false}
                
                secureTextEntry={true}
                value={repassword}
                onChangeText={setrePassword}
            />
            </View>
           
      
      <View style={styles.wrapper}>
          
              <Text style={styles.wrappertext}>
                  I have read Terms n Conditions carefully
              </Text>
      </View>
      <View style={styles.button}>
          
          <TouchableOpacity 
              style={styles.signIn}
                onPress={()=>{
                    Register();
                }}
              >
           
              <Text style={styles.textSign}>Register </Text>
              <Icon name='sign-in' size={30} color='white'/>

          </TouchableOpacity>
      </View>
    
      </Animated.View>
      </ScrollView>
      </View>
      
    );
    }
const {height}=Dimensions.get("screen");
const height_logo=height*0.5;
        
const styles = StyleSheet.create({
          textIn:{
            flex:1,
            paddingLeft:10,
            color:'black',
            fontSize:15
        },
          valid:{
            
            alignItems:'flex-end',
            paddingRight:30
        },
            Vscroll:{
                height:'100%',
                width:'100%'
            },
            container:{
                flex:1,
                backgroundColor:'#FFFF',
                justifyContent:'center'
                
            },
            header:{
                
                justifyContent:"center",
                alignItems:"center",
                height:Dimensions.get('screen').height*0.3
                
            },
            footer:{
                backgroundColor:"#FFFFF",
                borderTopLeftRadius:30,
                borderTopRightRadius:30,
                paddingVertical:10,
                paddingTop:25,
            },
            logo:{
                width:height_logo,
                height: height_logo
            },
            title:{
                color:'black',
                fontSize:30,
                fontWeight:"bold",
                alignSelf:'center',
                marginTop:5
            },
            text:{
                color:'#0c1229',
                marginTop:5,
                fontSize:15,
                paddingLeft:25
            },
            button:{
                justifyContent:'space-evenly',
                marginTop:15,
                marginBottom:30
            },
            signIn:{
                 
                width:"60%",
                height:50,
                justifyContent:'space-evenly',
                alignItems:'center',
                borderRadius:50,
                flexDirection:'row',
                alignSelf:'center',
                backgroundColor:'#000'
            },
            textSign:{
                textAlign:'center',
                color:'white',
                fontWeight:'bold',
                fontSize:20,
                alignSelf:'center'
                },
          
        
          inpStyle:{
            margin:5,
                alignSelf:"center",
                alignItems:"center",
                height:50,
                width:"90%",
                color:"white",
                backgroundColor:Colors.white,
                borderRadius:50,
                borderColor:'#e0edf5',
                //padding:4,
                paddingHorizontal:20,
                borderWidth:1,
                
                flexDirection:'row'
        },
          wrapper:{
            paddingLeft:20,
           flexDirection:'row',
              color:"blue",  
          },
          wrappertext:{
              paddingLeft:10,
              fontSize:15,
              color:"grey",
              fontStyle:"italic",
          },
        });
