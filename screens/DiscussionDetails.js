import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import moment from 'moment';

const DiscussionDetails = (props) => {
  const item = props.route.params.discussion;
  const baseURL = 'https://whatshotapp.herokuapp.com/api/dis';
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(props.route.params.username);
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const addComment = async () => {
    if (comment != '' && user != '') {
      const data = await fetch(baseURL + '/comment/' + item._id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment,
          commentAuthor: user,
        }),
      });
      const discussions = await data.json();
      console.log(JSON.stringify(discussions));
    } else {
      Alert.alert('Add Comment', 'Please enetr comment for this article');
    }
  };

  const addLike = async () => {
   
        const data = await fetch(baseURL + '/likePost/' + item._id, {
          method: 'put',
        });
        setIsLikeClicked(true);
    
  };

  const addLikeToComment = async (commentId) => {
    try {
      const data = await fetch(
        baseURL + '/likeComment/' + item._id + '/' + commentId,
        {
          method: 'put',
        }
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(item);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title} </Text>
        <View>
          <Image style={styles.avatar} source={{ uri: item.authorAvatar }} />
        </View>
        <Text style={{ fontSize: 20, marginLeft: 5 }}>{item.author}</Text>
      </View>

      <Text></Text>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          width: '100%',
        }}
      >
        <Text></Text>
      </View>

      <View>
        <Image style={styles.image} source={{ uri: item.postImage }} />
      </View>
      <Text style={styles.postContent}>
        {moment(item.Date).format('DD/MM/yyyy')}
      </Text>
      <View>

       
          <TouchableOpacity style={styles.btnLike} onPress={addLike}>
            <AntDesign name="like2" size={36} color="black" />{' '}
          </TouchableOpacity>
       
       
      
      </View>
      <View>
        <Text style={styles.content}>{item.content}</Text>
        <View
          style={{
            marginTop: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: '100%',
          }}
        >
          <Text></Text>
        </View>

        <Text style={styles.comment}>Comments : </Text>

        <View style={styles.addComment}>
          <Text></Text>
          <TextInput
            onChangeText={(text) => setComment(text)}
            placeholder="Enter comment here"
            style={styles.addCommentInput}
          />
          <TouchableOpacity style={styles.btnComment} onPress={addComment}>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', color: '#39C0F6' }}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>


        <FlatList
          data={item.comments}
          key={(item) => item._id}
          inverted={true}
          renderItem={({ item }) => (
            <View style={styles.comments}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ width: 47, height: 50 }}
                  source={{ uri: item.avatar }}
                />
                <Text style={{ fontSize: 18 }}>
                  {item.commentAuthor} <Text> </Text> {item.likes.length}{' '}
                  <AntDesign name="like2" size={18} color="black" />{' '}
                </Text>
              </View>

              <Text style={{ fontSize: 24 }}>{item.comment}</Text>
              <Text style={{ fontSize: 24 }}></Text>

              <TouchableOpacity
                style={styles.btnLike}
                onPress={() => addLikeToComment(item._id)}
              >
                <AntDesign name="like2" size={36} color="black" />{' '}
              </TouchableOpacity>
            </View>
          )}
        />
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
  title: {
    fontSize: 36,
    color: '#A251B0',
  },
  row: {
    marginTop: 40,
    flexDirection: 'row',
    margin: 10,
  },
  content: {
    margin: 20,
    marginTop: 30,
    fontSize: 28,
  },
  image: {
    marginTop: 20,
    width: 600,
    height: 400,
  },
  avatar: {
    padding: 5,
    width: 67,
    height: 70,
  },
  comment: {
    fontSize: 40,
    margin: 20,
  },
  comments: {
    margin: 20,
  },
  addComment: {
    flexDirection: 'row',
    margin: 20,
  },
  btnComment: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginLeft: 5,
    backgroundColor: '#CD2D4E',
  },
  addCommentInput: {
    borderWidth: 1,
    borderColor: '#CD2D4E',
    padding: 10,
    fontSize: 18,
  },
  postContent: {
    fontSize: 20,
  },
});

export default DiscussionDetails;
