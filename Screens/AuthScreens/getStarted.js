import React from 'react';
import {
    View, 
    StyleSheet, 
    Text, 
    SafeAreaView, 
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign'


const GetStarted = ({navigation}) => {
    
    return (
        
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
            
            <View style={{height:50,margin:5}}>
            <Text style={styles.title}>RIDER'S APP</Text>
            </View>
            <View style={styles.button}>
            
            <TouchableOpacity 
            style={styles.signIn}
            onPress={()=>{navigation.replace('LoginScreen')}}

           >
            <Text style={styles.textSign}>Get Started <Icon name='right' size={25} color={'white'}/></Text>
                
            </TouchableOpacity>
            </View>
            

    </View>
        
    );
}

const {height}=Dimensions.get("screen");
const height_logo=height*0.8;

const styles = StyleSheet.create({
    container:{
        
        backgroundColor:'#0A6376',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent:'center'
    },
    header:{
        justifyContent:"center",
        alignItems:"center",
        height:Dimensions.get('screen').height*0.3
    },
    logo:{
        width:height_logo,
        height: height_logo
    },
    title:{
        width:'100%',
        textAlign:'center',
        color:'#e0edf5',
        fontSize:30,
        fontWeight:"bold",
        marginTop:5
        
    },
    text:{
        color:'#e0edf5',
        marginTop:5,
        fontSize:15,
        margin:10,
        textAlign:'center'
    },
    button:{
        bottom:20,position:'absolute',justifyContent:'center',alignItems:'center',height:80,width:'100%',backgroundColor:'#0A6376'
    },
    signIn:{
        width:'90%',height:60,alignItems:'center',justifyContent:'center',backgroundColor:'#000',borderRadius:10
    },
    textSign:{
        color:'#FFFF',
        fontWeight:'bold',
        fontSize:25,
        textAlign:'center'
    }
});

export default GetStarted;
