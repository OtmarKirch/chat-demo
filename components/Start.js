import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import PersonSvg from './PersonSvg';

const Start = ({ navigation }) => {
  const [colors, setColors] = useState([
    '#757083',
    '#090C08',
    '#474056',
    '#8A95A5',
    '#B9C6AE',
  ]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [name, setName] = useState('');

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
      borderColor: 'black',
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
      fontWeight: 600,
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
      fontWeight: 300,
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
      fontWeight: 600,
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
          <Text style={styles.chooseBackgroundText}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            {colors.slice(1).map((color) => (
              <View
                style={[
                  styles.colorPresentationBorder,
                  selectedColor === color
                    ? { borderWidth: 2, borderColor: colors[0] }
                    : null,
                ]}
              >
                <TouchableOpacity
                  key={color}
                  style={[{ backgroundColor: color }, styles.colorPresentation]}
                  onPress={() => setSelectedColor(color)}
                />
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.startChatButton}
          title="Enter chat"
          onPress={() => navigation.navigate('Chat', { name: name })}
        >
          <Text style={styles.startChatText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Start;
