import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import VideoItem from '../../../components/component-parts/videoItem';
import EmptyItem from '../../../components/component-parts/emptyItem';
import {getAuth} from '../../../utils/apicalls/getApi';
import {API} from '../../../utils/endpoints';
import Loader from '../../../components/loader';
import {setVideo} from '../../../redux/reducers/Video';
import {useSelector, useDispatch} from 'react-redux';

const AwarenessVdo = ({navigation}) => {
  const list = useSelector(state => state.video?.data);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(list);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const getDataHandle = async () => {
    setIsLoading(true);
    getAuth(API.GET_VIDEO)
      .then(data => {
        dispatch(setVideo(data));
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getDataHandle();
  }, []);

  useEffect(() => {
    filterRecords(search);
  }, [list]);

  const searchFilterFunction = text => {
    setSearch(text);
    filterRecords(text);
  };

  const filterRecords = (searchText) => {
    console.log('filterRecords', searchText)
    if (searchText) {
      const newData = list.filter(function (item) {
        const itemData = item.Title
          ? item.Title.toUpperCase()
          : ''.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(list);
    }
  };

  const renderItem_vdo = ({item, index}) => {
    return (
      <VideoItem
        item={item}
        index={index}
        onPress={() => navigation.navigate('ViewVdo', {item: item})}
      />
    );
  };

  const ListEmptyComponent = () => {
    return !isLoading && <EmptyItem title={'Data not found'} />;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataHandle();
  }, []);

  return (
    <View style={st.container}>
      <View style={[st.mt_t10, st.pd_H10]}>
        <TextInput
          style={st.inputsty}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder={'Search'}
        />
      </View>
      <FlatList
        contentContainerStyle={st.pd10}
        data={filteredDataSource}
        renderItem={renderItem_vdo}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {isLoading && <Loader />}
    </View>
  );
};

export default AwarenessVdo;
