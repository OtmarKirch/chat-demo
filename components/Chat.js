import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, selectedColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    // Chat screen with the selected background color
    <View style={[styles.container, {backgroundColor: selectedColor}]}>
      <Text>Chat Screen</Text>
      <Text>Welcome to the chat {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Chat;
