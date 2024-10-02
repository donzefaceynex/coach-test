import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';

// Contact List Component
const ContactList = ({ contacts, onDelete }) => {
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.contactItem}>
          <Text style={styles.contactText}>{item.name}</Text>
          <Text style={styles.contactText}>{item.phone}</Text>
          <Button title="Delete" onPress={() => onDelete(item.id)} />
        </View>
      )}
    />
  );
};

// Main App Component
export default function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = () => {
    if (name && phone) {
      const newContact = { id: Date.now(), name, phone };
      setContacts([...contacts, newContact]);
      setName('');  // Clear input
      setPhone(''); // Clear input
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Simple Contact List</Text>

      {/* Input fields for adding contacts */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        keyboardType="numeric"
        onChangeText={setPhone}
      />

      {/* Button to add contact */}
      <Button title="Add Contact" onPress={addContact} />

      {/* Contact List */}
      <ContactList contacts={contacts} onDelete={deleteContact} />
    </SafeAreaView>
  );
}

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contactItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  contactText: {
    fontSize: 16,
  },
});
