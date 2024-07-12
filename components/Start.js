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
} from 'react-native';
import PersonSvg from './PersonSvg'; // symbol used in input box for the user name

const Start = ({ navigation }) => {
  const [colors, setColors] = useState([
    '#757083',
    '#090C08',
    '#474056',
    '#8A95A5',
    '#B9C6AE',
  ]); // all colors used in the app, starting with font color, followed by background colors
  const [selectedColor, setSelectedColor] = useState('#090C08'); // color selected by the user, starting with the second color
  const [name, setName] = useState(''); // name typed in by the user

  {
    /* leave styling before return statement, otherwise state of colors cannot be read in styles */
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    appTitle: {
      fontSize: 45,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 300,
    },
    chatChoice: {
      height: '44%',
      width: '88%',
      backgroundColor: 'white',
      borderRadius: 3,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    participantBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '88%',
      borderColor: colors[0],
      borderWidth: 1,
      borderRadius: 3,
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
      marginBottom: 10,
    },
    colorPresentationBorder: {
      height: 56,
      width: 56,
      borderColor: colors[0],
      borderRadius: 28,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorPresentation: {
      height: 50,
      width: 50,
      borderRadius: 25,
    },
    startChatButton: {
      backgroundColor: colors[0],
      padding: 10,
      borderRadius: 3,
      width: '88%',
      height: 50,
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
      style={styles.container}
    >
      <Text style={styles.appTitle}>CHAT APP</Text>
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
            {// colors are mapped to create color presentation
            colors.slice(1).map((color) => (
              // border is added to the selected color
              <View
                key={color + 'Border'}
                style={[
                  styles.colorPresentationBorder,
                  selectedColor === color
                    ? { borderWidth: 2, borderColor: colors[0] }
                    : null,
                ]}
              >
                {/* color presentation without border */}
                <TouchableOpacity
                  key={color}
                  style={[{ backgroundColor: color }, styles.colorPresentation]}
                  onPress={() => setSelectedColor(color)}
                />
              </View>
            ))}
          </View>
        </View>
        {/* Start Chat Button */}
        <TouchableOpacity
          style={styles.startChatButton}
          title="Enter chat"
          onPress={() =>
            navigation.navigate('Chat', {
              name: name,
              colors: colors,
              selectedColor: selectedColor,
            })
          }
        >
          <Text style={styles.startChatText}>Start Chatting</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' ? 
          <KeyboardAvoidingView behavior="padding" />
         : null}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        
      </View>
    </ImageBackground>
  );
};

export default Start;
