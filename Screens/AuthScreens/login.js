import { 
    View, 
    Text, 
    Dimensions, 
    StyleSheet, 
    TextInput,
    TouchableOpacity 
} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import NavStack from '../../Stack/navStack';
import Home from '../AppScreens/home';
import { loginURI } from '../../Apis/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function Login({navigation,route}) {
    const[response,setresponse]=useState([]);     
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
// const login=useContext(AuthContext);

    const Login = async () => {
        const storetoken=async(abc) => {
            try {
              await AsyncStorage.setItem('token', abc);
              console.log(abc+"Token Stored");
              getToken();
              //navigation.navigate('E-Shopping');
                
            } catch (e) {
              // saving 
              console.log("error in store");
            }
          }
          const getToken = async () => {
            try {
              const value = await AsyncStorage.getItem('token');
              console.log(value+"Token recieved");
              if(value !== null) {
                console.log(value+"User Code");
                navigation.navigate('HomeScreen');
                // value previously stored
                
              }
              
            } catch(e) {
              console.log("Sorry cant retrieved key"+e);
            }
        }
        axios({
            method: 'Post',
            url: loginURI,
            data:{
                email: email,
                password: password,
            },
            Headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                'Authorization': "Bearer ${token}"
            }
          })
          .then((response) => {
            setresponse(response);
            console.log(response.data);
            const success = JSON.stringify(response.data.success);
            const abc = JSON.stringify(response.data.activate_code);
          if(success==0)
            {
                console.log(response.data.message);
                alert(response.data.message);

            }
            else
            {
                //abc = JSON.stringify(response.data.token);
                console.log(response.data.message);
                console.log("token"+abc);
                storetoken(abc);
                //storeData(abc);
                
                  //storeData(abc);
               
               // console.log(storeData);

                  
                  //}
                  //console.log(getData());
                //if( save !== null){
                    
                  //  navigation.navigate('Welcome');
                //}
                //else{
                  //  console.log("Sorry wrong credentials")
               // }
                //console.log(response, ); 
                

            }
            
        }
          
          ).catch(error => console.log(error))
    }
return(
<View style={styles.container}>
    <Animated.View style={styles.header}>
    <Animated.Image
            animation="bounceIn"
            duration ="1500"
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            ></Animated.Image>
            
            </Animated.View>
    <View style={styles.footer}>
        <View style={styles.TitT}>
    <Text style={styles.title}>LOGIN</Text>
    </View>
    <Text style={styles.text}>Enter Email or username</Text> 
    <View style={styles.inpStyle}>
      <Icon name='user' size={20} color='#0c1229'/>
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
        <Icon1 name='star-of-life'size={15} color='#0c1229'/>
        <TextInput 
        style={styles.textIn}
  
            autoCompleteType="password"
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor="black"
            autoCapitalize="none"
            autoCorrect={false}
             value={password}
             onChangeText={setPassword}

          
        />
       
    </View>
    
    <View style={styles.button}>

        <TouchableOpacity  
            style={styles.signIn}
            onPress={()=>{ Login() }}
        >
           
                <Text style={styles.textSign}>Log In  </Text>
                <AntDesign name='login' size={25} style={{textAlign:'right'}} color='white'/>
                
        </TouchableOpacity>
    </View>
    
    <View style={styles.sigT}>
    <Text style={{color:'#0c1229'}}> Dont have an Account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SignupScreen')}
        //style={styles.signIn}
        >
            <Text style={styles.logt}>SignUp</Text>
        </TouchableOpacity>
    </View>
    </View>
</View>


);
}
    
const {height}=Dimensions.get("screen");
const height_logo=height*0.5;

const styles = StyleSheet.create({
valid:{
    alignItems:'flex-end',
    paddingRight:30,
    color:'red',
    
},
sigT:{
    padding:10,
    marginTop:5,
    flexDirection:'row',
    justifyContent:'center'
},
logt:{
    justifyContent:'center',
    alignItems:'center',
    fontStyle:'italic',
    fontWeight:'bold',
    color:'#0c1229',
    paddingLeft:5
    
},
TitT:{
    justifyContent:'center',
    alignItems:'center'
},
textIn:{
    flex:1,
    paddingLeft:10,
    color:'black',
    fontSize:15
},
container:{
    flex:1,
    backgroundColor:'#FFFF',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
},
header:{
    height:Dimensions.get('screen').height*0.3,
    justifyContent:"center",
    alignItems:"center",
    //marginTop:40
},
footer:{
    height:Dimensions.get('screen').height/1.8,
    backgroundColor:"#FFFF",
    
    
},
logo:{
    width:height_logo,
    height: height_logo
},
title:{
    flexDirection:'row',
    color:'#0c1229',
    fontSize:30,
    fontWeight:"bold",
    alignItems:'center',
    justifyContent:'center'
    
},
text:{
    
        color:'#0c1229',
        marginTop:10,
        marginBottom:5,
        fontSize:15,
    paddingLeft:25
},
button:{
    justifyContent:'center',
    marginTop:20,
    
   
},
signIn:{
     
    width:'60%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    flexDirection:'row',
    alignSelf:'center',
    backgroundColor:'#000000'
},
textSign:{
    textAlign:'center',
    color:'#FFFF',
    fontWeight:'bold',
    fontSize:20,
    },

inpStyle:{
    margin:5,
    alignSelf:"center",
    alignItems:"center",
    height:50,
    width:"90%",
    color:"black",
    backgroundColor:'#FFFF',
    borderRadius:50,
    borderColor:'#0A6377',
    //padding:4,
    paddingHorizontal:20,
    borderWidth:1,
    flexDirection:'row'
},
action:{
    flexDirection:'row',
    marginTop:5,
    paddingBottom:5
}

});
