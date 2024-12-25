import {
  Text,
  View,
  FlatList,
  ScrollView,
  Platform,
  RefreshControl,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import MagazinesItem from '../../../components/component-parts/magazinesItem';
import EmptyItem from '../../../components/component-parts/emptyItem';
import {getAuth} from '../../../utils/apicalls/getApi';
import {API} from '../../../utils/endpoints';
import Loader from '../../../components/loader';
import {setPdf} from '../../../redux/reducers/Pdf';
import {useSelector, useDispatch} from 'react-redux';

const IEC = ({navigation}) => {
  const list = useSelector(state => state.pdf?.data);

  const [filteredDataSource, setFilteredDataSource] = useState(list);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const getDataHandle = async () => {
    setIsLoading(true);
    getAuth(API.GET_PDF)
      .then(data => {
        dispatch(setPdf(data));
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
    filterRecords(search)
  }, [list]);

  const renderItem_magazines = ({item, index}) => {
    return (
      <MagazinesItem
        item={item}
        onClickPdf={() => navigation.navigate('ViewPdf', {url: item.Url})}
      />
    );
  };

  const ListEmptyComponent = () => {
    return !isLoading && <EmptyItem title={'Data not found'} />;
  };

  const searchFilterFunction = text => {
    setSearch(text);
    filterRecords(text)
  };

  const filterRecords = searchText => {
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
        renderItem={renderItem_magazines}
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

export default IEC;
