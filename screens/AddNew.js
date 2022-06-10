import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddNew = (props) => {
  const baseURL = 'https://whatshotapp.herokuapp.com/api/dis';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const [author, setAuthor] = useState(props.route.params.username);
  const [authorAvatar, setAvatar] = useState(props.route.params.authorAvatar);

  const addArticle = async () => {
    try {
      if (title != '' && content != '' && author != '') {
        const data = await fetch(baseURL + '/uploadDisccusionSub/', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            content: content,
            author: author,
            postImage: postImage,
            authorAvatar: authorAvatar,
          }),
        });
        const discussions = await data.json();
        console.log(JSON.stringify(data));
      } else {
        console.log('Error');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.AddNewText}>Add New Discussion</Text>
        <View>
          <Text style={styles.titleText}>Title</Text>
          <TextInput
            placeholder="Enter title here"
            style={styles.textAreaContainer}
            onChangeText={(val) => setTitle(val)}
          />
          <Text style={styles.titleText}>Content</Text>
          <TextInput
            style={styles.textAreaContainer}
            underlineColorAndroid="transparent"
            placeholder="Enter content here"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            onChangeText={(val) => setContent(val)}
          />
          <Text style={styles.titleText}>Image</Text>
          <TextInput
            placeholder="Enter image link here"
            style={styles.textAreaContainer}
            onChangeText={(val) => setPostImage(val)}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={addArticle}>
          <Text style={styles.addBtn}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  form: {
    marginTop: 50,
  },
  AddNewText: {
    fontSize: 34,
    color: '#CD2D4E',
  },
  textAreaContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  titleText: {
    marginTop: 20,
    fontSize: 24,
    color: '#2680A4',
  },
  addBtn: {
    padding: 10,
    borderWidth: 1,
    fontSize: 24,
    marginTop: 10,
    backgroundColor: '#CD2D4E',
    color:'#ffffff'
  },
});

export default AddNew;
