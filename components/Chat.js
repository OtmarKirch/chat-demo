import { onSnapshot, collection, addDoc, query, where, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation, db }) => {
  const { name, colors, selectedColor, userID } = route.params;

  const [messages, setMessages] = useState([]);

  // background colors for the chat bubbles, using colors except the selected color
  const colorsReverse = [...colors].reverse();
  const backgroundColors = colorsReverse.filter(
    (color) => color !== selectedColor
  );

  const onSend = (newMessages) => {
    //setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: backgroundColors[0],
          },
          left: {
            backgroundColor: backgroundColors[1],
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'white',
          },
        }}
      />
    );
  };

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: 'This is a system message',
  //       createdAt: new Date(),
  //       system: true,
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubChat = onSnapshot(q, (documentsSnapshot) => {
      let allMessages = [];
      documentsSnapshot.forEach(doc => {
        allMessages.push({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      })
      });
      setMessages(allMessages);
    });

    // Clean up code
    return () => {
      if (unsubChat) unsubChat();
    }
  }, []);


  return (
    // Chat screen with the selected background color
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
