import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation Schema for Contact Form
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string(),
});

// Contact List Component
const ContactList = ({ contacts, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact List</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContactItem contact={item} onEdit={onEdit} onDelete={onDelete} />
        )}
      />
    </View>
  );
};

// Contact Item Component
const ContactItem = ({ contact, onEdit, onDelete }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text>{contact.phone}</Text>
      <Text>{contact.email}</Text>
      <View style={styles.actions}>
        <Button title="Edit" onPress={() => onEdit(contact.id)} />
        <Button title="Delete" onPress={() => onDelete(contact.id)} />
      </View>
    </View>
  );
};

// Contact Form Component with Validation
const ContactForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '', phone: '', email: '', address: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="numeric"
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />
          {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Address"
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
          />

          <Button title="Add Contact" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

// Emergency Contacts Component
const EmergencyContacts = ({ emergencyContacts }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <FlatList
        data={emergencyContacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ContactItem contact={item} />}
      />
    </View>
  );
};

// Message Component (Extra)
const MessageComponent = ({ contact, onSendMessage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages with {contact.name}</Text>
      <Text>No messages yet.</Text>
      <Button title="Send Message" onPress={() => onSendMessage(contact.id)} />
    </View>
  );
};

// Main App Component
export default function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '1234567890', email: 'john@example.com', emergency: true },
  ]);

  const addContact = (newContact) => {
    setContacts([...contacts, { id: Date.now(), ...newContact, emergency: false }]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContact = (id) => {
    // Logic for editing contact
  };

  const emergencyContacts = contacts.filter((contact) => contact.emergency);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ContactForm onSubmit={addContact} />
        <EmergencyContacts emergencyContacts={emergencyContacts} />
        <ContactList contacts={contacts} onEdit={editContact} onDelete={deleteContact} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
