import React from 'react';
import { View, Text, ToastAndroid, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';

function LoginScreen() {
    const dispatch = useDispatch();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = React.useCallback(async ()=>{
        try{
            if(!username){
                ToastAndroid.show("Enter username", ToastAndroid.SHORT);
                return;
            }
            if(!password){
                ToastAndroid.show("Enter password", ToastAndroid.SHORT);
                return;
            }
            
            const data = await AsyncStorage.getItem('users');
            const json = JSON.parse(data);
            const userData = json.find(x=> x.username === username);

            if(!userData){
                ToastAndroid.show("Invalid username", ToastAndroid.SHORT);
                return;
            }
            if(userData.password !== password){
                ToastAndroid.show("You have entered wrong password", ToastAndroid.SHORT);
                return;
            }

            dispatch({
                type: actions.SET_USER,
                payload: {
                    user: userData
                }
            });
        } catch (err){
            console.log(err);
            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        }
    }, [username, password]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Login</Text>
            <View style={styles.inputArea}>
                <TextInput
                    mode='outlined'
                    label={"Username"}
                    onChangeText={(text)=>{
                        setUsername(text);
                    }}
                />
                <TextInput
                    secureTextEntry
                    mode='outlined'
                    label={"Password"}
                    onChangeText={(text)=>{
                        setPassword(text);
                    }}
                />
                <Button style={styles.loginButton} mode="contained" onPress={() =>{
                    handleLogin()
                }}>
                    Login
                </Button>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        padding: 10
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    loginButton: {
        marginTop: 7,
        borderRadius: 5,
        height: 48,
        justifyContent: 'center'
    },
    inputArea: {
        marginTop: 50
    }
})

export default LoginScreen;