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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, colors, selectedColor, userID } = route.params;

  const [messages, setMessages] = useState([]);

  // background colors for the chat bubbles, using colors except the selected color
  const colorsReverse = [...colors].reverse();
  const backgroundColors = colorsReverse.filter(
    (color) => color !== selectedColor
  );

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || '[]';
    setMessages(JSON.parse(cachedMessages));
  }

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

  let unsubChat
  useEffect(() => {
    if (isConnected === true) {
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubChat = onSnapshot(q, (documentsSnapshot) => {
      let allMessages = [];
      documentsSnapshot.forEach(doc => {
        allMessages.push({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      })
      });
      cacheMessages(allMessages);
      setMessages(allMessages);
    });
    } else {
      loadCachedMessages();
    }

    // Clean up code
    return () => {
      if (unsubChat) unsubChat();
      unsubChat = null;
    }
  }, [isConnected]);

  const cacheMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    }
    catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


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
