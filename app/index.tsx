import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Item = ({ users }) => {
  return (
    <View style={styles.containerItem}>
      {users.map((user, index) => (
        <View key={index} style={styles.itemDesc}>
          <Image source={require('../assets/images/react-logo.png')} />
          <Text>{user.name}</Text>
          <Text>{user.username}</Text>
          <Text>{user.email}</Text>
        </View>
      ))}
    </View>
  );
};

const Index = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]); // State untuk menyimpan data dari API

  // Fungsi untuk memanggil API POST
  const callAPI = () => {
    axios.post('http://192.168.1.16:3000/users', {
        name,
        username,
        email,
      })
      .then((res) => {
        console.log(res);
        setName("");
        setUsername("");
        setEmail("");
        fetchData(); // Memanggil ulang data setelah posting berhasil
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  // Fungsi untuk mengambil data dari API
  const fetchData = () => {
    axios.get('http://192.168.1.16:3000/users')
      .then((res) => {
        setUsers(res.data); // Simpan data dari server ke state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Menggunakan useEffect untuk mengambil data saat komponen dirender pertama kali
  useEffect(() => {
    fetchData(); // Memanggil data ketika komponen dimount
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text>TEST LOCAL DB JSON SERVER</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={setEmail}
          value={email}
        />

        <TouchableOpacity style={styles.btnSimpan} onPress={callAPI}>
          <Text style={styles.desc}>SIMPAN</Text>
        </TouchableOpacity>

        <Text style={styles.garis} />

        {/* Tampilkan data dinamis dengan komponen Item */}
        <Item users={users} />
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingLeft: 120,
    marginTop: 10,
  },
  btnSimpan: {
    marginTop: 10,
    borderWidth: 1,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'lightblue',
  },
  garis: {
    marginTop: 20,
    borderWidth: 1,
    width: 300,
    height: 1,
  },
  containerItem: {
    flexDirection: 'column',
  },
  itemDesc: {
    flexDirection: 'column',
    marginBottom: 10,
  },
});
