import { onSnapshot, collection, addDoc, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import { Image } from 'react-native-expo-image-cache';
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected, storage}) => {
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

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

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
      
    }
  }, [isConnected]);

  const cacheMessages = async (allMessages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(allMessages));
    }
    catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  }

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    if (currentMessage.image) {
      return (
        <Image
          source={{ uri: currentMessage.image }}
          style={{ width: 200, height: 200 }}
        />
      );
    }
    return null;
  }

  return (
    // Chat screen with the selected background color
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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
