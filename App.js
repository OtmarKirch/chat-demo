import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { getStorage } from "firebase/storage";
//import firebaseConfig from './secrets/firebaseConfig';
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";


export default function App() {
const connectionStatus = useNetInfo()

LogBox.ignoreLogs(['Async Storage has been extracted from']);

useEffect(()=>{
  if (connectionStatus.isConnected === false) {
    Alert.alert("Connection lost!")
    disableNetwork(db)
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db)
  }
}, [connectionStatus.isConnected])
// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT5XY85QIn1XBB8weJAvD3ItXQiOxwUVY",
  authDomain: "chat-demo-62ab1.firebaseapp.com",
  projectId: "chat-demo-62ab1",
  storageBucket: "chat-demo-62ab1.appspot.com",
  messagingSenderId: "951663853061",
  appId: "1:951663853061:web:4076039b5136367d76666c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        {/* Add the screens here */}
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat 
          {...props} 
          db={db}
          storage={storage}
          isConnected={connectionStatus.isConnected}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
