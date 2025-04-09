import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert("Permission denied!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    try {
      await axios.post('http://10.0.134.197:8080/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200, marginVertical: 20 },
});
