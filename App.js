import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';


export default function App() {

  const [apiData,setApiData] = useState([]);

  const url = "https://ci.nii.ac.jp/books/opensearch/search?";
  const params = {
    title:"ポケモン",
    format:"json",
    count:"30",
  }

  async function getData() {
    try {
      const response = await axios.get(url,{params});
      console.log(response.data['@graph'][0].items);
      setApiData(response.data['@graph'][0].items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <View style={styles.container}>
      <FlatList
        data = {apiData}
        renderItem = {({item})=>(
          <Text style={styles.flatListitem} >{item.title}</Text>
        )}
        keyExtractor={item => item['@id']}
      >
      </FlatList>
      {console.log("レンダリング完了")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccccff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListitem:{
    color:"white",
    paddingVertical:20,
    paddingHorizontal:10,
    marginVertical:5,
    marginHorizontal:5,
    backgroundColor:"#333399",
  }
});
