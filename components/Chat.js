import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route }) => {
<View style={styles.container}>
    <Text>Chat Screen</Text>
    <Text>{route.name}</Text>
</View>    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Chat;