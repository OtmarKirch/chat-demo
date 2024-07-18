import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import PersonSvg from './PersonSvg'; // graphic used in input box in front of user name

import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
    .then(result => {
      navigation.navigate('Chat', {
        userID: result.user.uid,
        name: name,
        colors: colors,
        selectedColor: selectedColor,
      });
      Alert.alert('Signed in successfully');
    }
    ).catch(error => {
      Alert.alert('Error signing in');
    })
  }

  const [colors, setColors] = useState([
    '#757083',
    '#090C08',
    '#474056',
    '#8A95A5',
    '#B9C6AE',
  ]); // all colors used in the app, starting with font color, followed by background colors
  const [selectedColor, setSelectedColor] = useState('#090C08'); // color selected by the user, starting with the second color
  const [name, setName] = useState(''); // name typed in by the user

  
  // leave styling before return statement, otherwise state of colors cannot be read in styles  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appTitle: {
      flex: 1,
      fontSize: 45,
      fontWeight: 'bold',
      color: 'white',
      marginTop: 80,
    },
    chatChoice: {
      height: '44%',
      width: '88%',
      backgroundColor: 'white',
      borderRadius: 3,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginBottom: 20,
    },
    participantBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '88%',
      borderColor: colors[0],
      borderWidth: 1,
      borderRadius: 3,
      marginTop: 15,
    },
    personSvg: {
      marginLeft: 10,
    },
    nameInput: {
      width: '88%',
      padding: 15,
      marginLeft: 0,
      borderColor: 'black',
      borderWidth: 0,
      color: colors[0],
      fontSize: 16,
      fontWeight: '600',
      opacity: 0.5,
    },
    chooseBackground: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chooseBackgroundText: {
      color: colors[0],
      fontSize: 16,
      fontWeight: '300',
      opacity: 1,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 0,
      padding: 0,
      width: '88%',
    },
    colorContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '88%',
      marginBottom: 15,
    },
    colorPresentationBorder: {
      height: 37,
      width: 37,
      borderColor: colors[0],
      borderRadius: 28,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorPresentation: {
      height: 30,
      width: 30,
      borderRadius: 25,
    },
    startChatButton: {
      backgroundColor: colors[0],
      padding: 10,
      borderRadius: 3,
      width: '88%',
      height: 50,
      marginBottom: 15,
    },
    startChatText: {
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
      alignSelf: 'center',
      margin: 0,
      padding: 0,
      lineHeight: 30,
    },
  });

  return (
    <ImageBackground
      source={require('../assets/chatbot.png')}
      style={styles.imageBackground}
    >
      <Text style={styles.appTitle}>Chat App</Text>

      <View style={styles.chatChoice}>
        <View style={styles.participantBox}>
          <View style={styles.personSvg}>
            <PersonSvg />
          </View>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
        </View>
        <View style={styles.chooseBackground}>
          <Text style={styles.chooseBackgroundText}>
            Choose Background Color:
          </Text>
          <View style={styles.colorContainer}>
            {
              // colors are mapped to create color presentation
              colors.slice(1).map((color) => (
                <View
                  key={color + 'Border'}
                  style={[
                    styles.colorPresentationBorder,
                    // border wrapping color only when selected
                    selectedColor === color
                      ? { borderWidth: 2, borderColor: colors[0] }
                      : null,
                  ]}
                >
                  {/* color presentation without border */}
                  <TouchableOpacity
                    key={color}
                    style={[
                      { backgroundColor: color },
                      styles.colorPresentation,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                </View>
              ))
            }
          </View>
        </View>
        <TouchableOpacity
          style={styles.startChatButton}
          title="Enter chat"
          onPress={() => signInUser()}
        >
          <Text style={styles.startChatText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </ImageBackground>
    
  );
};

export default Start;
