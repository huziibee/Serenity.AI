import React, { useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! How's it going?", sender: "other" },
    { id: 2, text: "All good here! What about you?", sender: "self" },
    { id: 3, text: "Doing great! Just finished a project.", sender: "other" },
    { id: 4, text: "That's awesome! Let's catch up soon.", sender: "self" },
  ]);
  
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1, // Generate a new ID
        text: input,
        sender: "self",
      };
      
      // Add the new message to the list
      setMessages([...messages, newMessage]);
      
      // Clear the input field
      setInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>Chat</Text>

        <View style={styles.chatContainer}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === "self" ? styles.selfBubble : styles.otherBubble,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Input field and send button */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          placeholder="Type a message..."
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'JakartaBold',
    marginVertical: 20,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '75%',
  },
  selfBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
