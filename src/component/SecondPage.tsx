import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { getStorage } from '../utils/storageUtils';
import Status from './Status';
import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';

type FirstPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FirstPage'>;

interface FirstPageProps {
  navigation: FirstPageNavigationProp;
}

const SecondPage: React.FC<FirstPageProps> = ({ navigation }) => {
  const [formData, setFormData] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ship'); // State to track the active tab
  const [activeFilter, setActiveFilter] = useState(''); // State to track active filter
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRefer = useRef<BottomSheet>(null);

  useEffect(() => {
    const retrieveFormData = async () => {
      const namee = await getStorage('TheName');
      console.log('Retrieved form data:', namee);
      setFormData(namee);
    };
    retrieveFormData();
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const openBottomSheetFilter = () => {
    bottomSheetRefer.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const closeBottomSheetFilter = () => {
    bottomSheetRefer.current?.close();
  };

  const handleTabPress = (tabName: string) => {
    if (tabName === 'profile') {
      handleLogout();
    } else {
      setActiveTab(tabName);
    }
  };
  const handleLogout = async () => {
        // Navigate to FirstPage
    navigation.navigate('FirstPage');
  };

  const handleFilterPress = (filterName: string) => {
    setActiveFilter(filterName);
  };

  const onRefresh = async () => {
    setRefreshing(true);
  
    // Reset all state variables to their initial values
    setFormData(null);
    setSearch('');
    setActiveTab('ship');
    setActiveFilter('');
  
    // Simulate data fetching
    // You can replace this with actual data fetching logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Optionally, re-fetch the form data
    const namee = await getStorage('TheName');
    setFormData(namee);
  
    setRefreshing(false);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.containerOne}>
        <Image source={require('../../assets/face.png')} style={styles.icon} />
        <Image
          source={require('../../assets/shippexx.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image source={require('../../assets/bell.png')} style={styles.icon} />
      </View>

      <View style={styles.containerTwo}>
        <Text style={styles.greetingText}>Hello,</Text>
        <Text style={styles.userName}>{formData}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.input,
              { borderColor: searchFocused ? '#2F50C1' : '#ccc' }, // Blue border on focus
            ]}
            placeholder="Search"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <Image source={require('../../assets/surge.png')} style={styles.searchIcon} />

        </View>
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity style={{ width: '47%' }} onPress={openBottomSheetFilter}>
          <View style={styles.grayBox}>
            <Image source={require('../../assets/filter.png')} style={styles.filt} />
            <Text style={{ color: "#888" }}>Filter</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.blueBox}>
          <Image source={require('../../assets/scan.png')} style={styles.filt} />
          <Text style={{ color: "#fff" }}>Add Scan</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Status reset={refreshing}/>
      </ScrollView>

      {/* Custom Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handleTabPress('ship')}
        >
          <Image
            source={
              activeTab === 'ship'
                ? require('../../assets/ship.png')
                : require('../../assets/shipgray.png')
            }
            style={{ width: 54, height: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handleTabPress('scan')}
        >
          <Image
            source={
              activeTab === 'scan'
                ? require('../../assets/scann.png')
                : require('../../assets/scangray.png')
            }
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handleTabPress('wallet')}
        >
          <Image
            source={
              activeTab === 'wallet'
                ? require('../../assets/wallet.png')
                : require('../../assets/walletgray.png')
            }
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handleTabPress('profile')}
        >
          <Image
            source={
              activeTab === 'profile'
                ? require('../../assets/profile.png')
                : require('../../assets/profilegray.png')
            }
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>

      <BottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%']} index={-1}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={closeBottomSheet} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text>Bottom Sheet Content</Text>
        </View>
      </BottomSheet>

      <BottomSheet ref={bottomSheetRefer} snapPoints={['25%', '50%']} index={-1}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={closeBottomSheetFilter} style={styles.doneButton}>
            <Text style={styles.cancelButtonText}>Done</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Filter</Text>
          <TouchableOpacity onPress={closeBottomSheetFilter} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', height: 2, backgroundColor: '#F1F1F1', marginTop: 10 }} />
          <View style={styles.filters}>
            <TouchableOpacity
              style={[
                styles.filtitem,
                activeFilter === 'Received' && styles.activeFilterItem
              ]}
              onPress={() => handleFilterPress('Received')}
            >
              <Text
                style={[
                  { color: 'gray' },
                  activeFilter === 'Received' && styles.activeFilterText
                ]}
              >
                Received
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filtitem,
                activeFilter === 'Putaway' && styles.activeFilterItem
              ]}
              onPress={() => handleFilterPress('Putaway')}
            >
              <Text
                style={[
                  { color: 'gray' },
                  activeFilter === 'Putaway' && styles.activeFilterText
                ]}
              >
                Putaway
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filtitem,
                activeFilter === 'Delivered' && styles.activeFilterItem
              ]}
              onPress={() => handleFilterPress('Delivered')}
            >
              <Text
                style={[
                  { color: 'gray' },
                  activeFilter === 'Delivered' && styles.activeFilterText
                ]}
              >
                Delivered
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filtitem,
                activeFilter === 'Cancelled' && styles.activeFilterItem
              ]}
              onPress={() => handleFilterPress('Cancelled')}
            >
              <Text
                style={[
                  { color: 'gray' },
                  activeFilter === 'Cancelled' && styles.activeFilterText
                ]}
              >
                Cancelled
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filtitem,
                activeFilter === 'Rejected' && styles.activeFilterItem
              ]}
              onPress={() => handleFilterPress('Rejected')}
            >
              <Text
                style={[
                  { color: 'gray' },
                  activeFilter === 'Rejected' && styles.activeFilterText
                ]}
              >
                Rejected
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filtitem,
                activeFilter === 'Lost' && styles.activeFilterItem
              ]}
              onPress={() => handleFilterPress('Lost')}
            >
              <Text
                style={[
                  { color: 'gray' },
                  activeFilter === 'Lost' && styles.activeFilterText
                ]}
              >
                Lost
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filtitem,
                activeFilter === 'On Hold' && styles.activeFilterItem
              ]}
              onPress={() => handleFilterPress('On Hold')}
            >
              <Text
                style={[
                  { color: 'gray' },
                  activeFilter === 'On Hold' && styles.activeFilterText
                ]}
              >
                On Hold
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  containerOne: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filtitem: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent', // Default border color
    color: 'gray',
    margin: 4, // If gap isn't supported, use margin to create space 
  },
  activeFilterItem: {
    backgroundColor: '#2F50C1',
    borderColor: '#2F50C1',
  },
  activeFilterText: {
    color: '#fff',
  },
  containerTwo: {
    width: '100%',
    marginTop: 20,
  },
  filters: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  logo: {
    width: '70%',
    height: 24,
  },
  greetingText: {
    color: '#757281',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    left: 10,
  },
  filt: {
    width: 20,
    height: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 30,
    marginVertical: 10,
    backgroundColor: '#F1F1F1',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  grayBox: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    paddingHorizontal: 10,
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBox: {
    width: '47%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#2F50C1',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
  },
  bottomSheetContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
  doneButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#2F50C1',
    fontSize: 16,
  },
});

export default SecondPage;
