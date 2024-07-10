import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

const Screen1 = ({ navigation }) => {
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
        <Text>Hello Screen 1</Text>
        <TextInput 
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Enter your name'
        />
        <Button title='Go to Screen 2' onPress={() => navigation.navigate('Screen2', {name: name})} />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '88%',
        padding: 15,
        marginTop: 15,
        marginBottom: 15,
        borderColor: 'black',
        borderWidth: 1
    }
});

export default Screen1;