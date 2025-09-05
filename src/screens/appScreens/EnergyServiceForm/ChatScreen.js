import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header} from '../../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, SIZES, icons} from '../../../constants';
import {IconButton} from 'react-native-paper';

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem('chat_messages');
        if (savedMessages !== null) {
          setMessages(JSON.parse(savedMessages));
        } else {
          const adminMessage = {
            id: 1,
            text: 'مرحبا بكم في التطبيق! يرجى التواصل معنا لأي استفسار على الرقم 01024443678.',
            timestamp: new Date().getTime(),
          };
          setMessages([adminMessage]);
          await AsyncStorage.setItem(
            'chat_messages',
            JSON.stringify([adminMessage]),
          );
        }
      } catch (error) {
        console.error('Error loading messages from AsyncStorage: ', error);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('chat_messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages to AsyncStorage: ', error);
      }
    };

    saveMessages();
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      timestamp: new Date().getTime(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const renderChatItem = ({item}) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
    </View>
  );

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const options = {hour: '2-digit', minute: '2-digit', hour12: true};
    const formattedTime = date.toLocaleTimeString('ar-EG', options);
    return formattedTime;
  };

  function renderHeader() {
    return (
      <Header
        title={'طلب خدمة الطاقة'}
        containerStyle={{
          height: RFValue(65),
          alignItems: 'center',
          paddingHorizontal: SIZES.base,
        }}
        twoRight={true}
        fill={true}
        rightComponent={
          <IconButton
            icon={icons.back}
            containerStyle={styles.backButton}
            iconStyle={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
        }
        leftComponent={<View style={{width: 40}} />}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={messages.slice().reverse()} 
        renderItem={renderChatItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="اكتب رسالتك..."
        />
        <Button title="ارسال" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray2,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  flatListContainer: {
    padding: RFValue(10),
  },
});

export default ChatScreen;
