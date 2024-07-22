import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import PersonSvg from './PersonSvg'; // symbol used in input box for the user name


const StartTest = ({ navigation }) => {
    const [colors, setColors] = useState([
        '#757083',
        '#090C08',
        '#474056',
        '#8A95A5',
        '#B9C6AE',
      ]); // all colors used in the app, starting with font color, followed by background colors
      const [selectedColor, setSelectedColor] = useState('#090C08'); // color selected by the user, starting with the second color
      const [name, setName] = useState(''); // name typed in by the user
  
  
  // State to hold the chosen background color
  const [background, setBackground] = useState("");

  const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    flex: 1,
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
    justifyContent: "center",
    marginTop: 80,
  },
  container: {
    width: "88%",
    height: "44%",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-evenly",
    borderRadius: 4,
  },

  textInput: {
    width: "84%",
    padding: 10,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.7,
    borderColor: "#757083",
    borderRadius: 4,
  },
  button: {
    width: "84%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#757083",
    padding: 10,
    marginTop: 5,
    borderRadius: 4,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  chooseColorBox: {
    width: "84%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colorButtonsContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  chooseColor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    border: 3,
    marginRight: 15,
    borderColor: "white",
  },
  selectedColor: {
    borderColor: "#FCD95B",
    borderWidth: 3,
  },

  chooseColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  colorPresentationBorder: {
    height: 35,
    width: 35,
    borderColor: colors[0],
    borderRadius: 28,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

  return (
    <ImageBackground
      source={require("../assets/chatbot.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <Text style={styles.appTitle}>Test</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        ></TextInput>

        <View style={styles.chooseColorBox}>
          <Text style={styles.chooseColorText}>Choose Background Color:</Text>
          <View style={styles.colorButtonsContainer}>
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
                  style={[{ backgroundColor: color }, styles.chooseColor]}
                  onPress={() => setBackground(color)}
                />
              </View>
            ))}
          </View>
          
        </View>

        {/* Render a TouchableOpacity for starting the chat */}
        <TouchableOpacity style={styles.button} onPress={() =>
            navigation.navigate('Chat', {
              name: name,
              colors: colors,
              selectedColor: selectedColor,
            })
          }>
          <Text style={styles.textButton}>Start Chatting</Text>
        </TouchableOpacity>



      </View>
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </ImageBackground>
  );
};



export default StartTest;