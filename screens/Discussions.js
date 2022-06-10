import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import moment from 'moment';
import { EvilIcons } from '@expo/vector-icons';

const Discussions = (props) => {
  const baseURL = 'https://whatshotapp.herokuapp.com/api';
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(props.route.params.username);

  useEffect(() => {
    loadAllDiscussions();
  }, []);

  const loadAllDiscussions = async () => {
    setLoading(true);
    const data = await fetch(baseURL + '/dis/getAllDisccusions', {
      method: 'get',
    });
    const discussions = await data.json();
    setAllData(discussions);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          props.navigation.navigate('AddNew', { username: username });
        }}
      >
        <Text style={styles.addBtnText}>ADD</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator color="#F7567C" size="large" />
      ) : (
        <View style={{ width: '100%' }}>
          <FlatList
            data={allData.Disccusions}
            inverted={true}
            keyExtractor={(item) => item._id}
            renderItem={(itemRow) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('DiscussionDetails', {
                    discussion: itemRow.item,
                    username: username,
                  });
                }}
                style={styles.row}
              >
                {itemRow.item.postImage ? (
                  <Image
                    source={{ uri: itemRow.item.postImage }}
                    style={styles.avatar}
                  />
                ) : (
                  <Image
                    source={{ uri: itemRow.item.authorAvatar }}
                    style={styles.avatar}
                  />
                )}

                <View style={{ width: '60%', marginLeft: 12 }}>
                  <Text style={styles.postTitle}>
                    {itemRow.item.title} | {itemRow.item.author}
                  </Text>
                  <Text style={styles.postContent}>
                    {itemRow.item.content} |{' '}
                    {moment(itemRow.item.Date).format('DD/MM/yyyy')}
                  </Text>
                </View>
                <View style={{ width: '20%', marginLeft: 12 }}>
                  <Text style={styles.postContent}>
                    {itemRow.item.likes.length}{' '}
                    <EvilIcons name="like" size={24} color="black" />
                  </Text>
                </View>
                <View style={{ width: '20%', marginLeft: 12 }}>
                  <Text style={styles.postContent}>
                    {itemRow.item.comments.length}{' '}
                    <EvilIcons name="comment" size={24} color="black" />
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postAuthor: {
    fontSize: 12,
    fontWeight: '300',
  },
  postContent: {
    fontSize: 14,
    fontWeight: '300',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  row: {
    width: '100%',
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#5D576B',
    padding: 30,
  },
  addBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CD2D4E',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
  addBtnText: {
    fontSize: 24,
    color: '#ffffff',
  },
});

export default Discussions;
