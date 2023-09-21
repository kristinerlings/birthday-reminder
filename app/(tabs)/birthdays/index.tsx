// https://docs.expo.dev/versions/latest/sdk/async-storage/
//npx expo install @react-native-async-storage/async-storage
//https://www.npmjs.com/package/react-native-swipe-list-view
import { StyleSheet, Button } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '../../../components/Themed';
import { Stack /* useRouter */ } from 'expo-router'; //useRouter -> access router from anywhere I pushed
import {
  useBirthdayStore,
  BirthdayData,
} from '../../../store/useBirthdayStore'; // Zustand
import UpcomingAge from '../../../components/UpcomingAge';
import React, { useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
//SwipeListView = Is built on top of FlashList !

export default function Birthdays() {
  /*  const router = useRouter(); */
  const { data, setData } = useBirthdayStore(); // Access data from zustand store

  const sortedData = [...data].sort((a, b) => {
    if (a.date && b.date) {
      if (a.date.getMonth() !== b.date.getMonth()) {
        return a.date.getMonth() - b.date.getMonth();
      }
      return a.date.getDate() - b.date.getDate();
    } else if (a.date) {
      return -1; // a has a date but b doesn't
    } else if (b.date) {
      return 1; // b has a date but a doesn't
    }
    return 0; // neither has a date
  });

  const today = new Date();
  const pastBirthdays = sortedData.filter(
    (birthday) =>
      birthday.date &&
      (birthday.date.getMonth() < today.getMonth() ||
        (birthday.date.getMonth() === today.getMonth() &&
          birthday.date.getDate() <= today.getDate()))
  );

  const upcomingBirthdays = sortedData.filter(
    (birthday) =>
      birthday.date &&
      (birthday.date.getMonth() > today.getMonth() ||
        (birthday.date.getMonth() === today.getMonth() &&
          birthday.date.getDate() > today.getDate()))
  );

  const [activeButton, setActiveButton] = useState('upcoming');

  //swipe list view
  /*    const swipeHidden = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Delete</Text>
    </View>
  ); */

  //swipe list view starts here
  const [lastOpenedRowKey, setLastOpenedRowKey] = useState<string | null>(null);

  const closeLastOpenedRow = (rowMap: any) => {
    if (lastOpenedRowKey && rowMap && rowMap[lastOpenedRowKey]) {
      rowMap[lastOpenedRowKey].closeRow();
      setLastOpenedRowKey(null);
    }
  };

  const displayListBeforeSwipe = ({ item }: { item: BirthdayData }) => (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.date}>
            {item.date
              ? `${item.date.getDate()} ${item.date.toLocaleString('default', {
                  month: 'short',
                })}`
              : ''}
          </Text>
          <UpcomingAge birthday={item.date} />
        </View>
      </View>
    </View>
  );

  //rowMap = object with keys of row data, and values of ref to row hidden component
  const displaySwipeHidden = (data: { item: BirthdayData }, rowMap: any) => (
    /*  <View> */
    <View style={styles.rowBack}>
      <View style={styles.editContainer}>
        <Text style={styles.edit}>Edit</Text>
      </View>
      <View style={styles.deleteContainer}>
        <Text onPress={() => handleDelete(data.item)}>Delete</Text>
      </View>
    </View>
    /* </View> */
  );

  const handleDelete = (itemToDelete: BirthdayData) => {
    const updatedData = data.filter((item) => item !== itemToDelete);
    setData(updatedData); // Using `setData` from `useBirthdayStore` to update the store
  };

  

  return (
    <>
      <Stack.Screen options={{ title: 'Birthdays' }} />
      <View style={styles.pageContainer}>
        {activeButton === 'upcoming' && (
          <>
            <Text>Upcoming Birthdays</Text>
            <SwipeListView<BirthdayData>
              data={upcomingBirthdays}
              renderItem={displayListBeforeSwipe}
              renderHiddenItem={displaySwipeHidden}
              // leftOpenValue={75}
              rightOpenValue={-150}
              /*  onRowDidOpen={(rowKey, rowMap) => {
                closeLastOpenedRow(rowMap);
                setLastOpenedRowKey(rowKey);
              }} */
            />
          </>
        )}
        {activeButton === 'past' && (
          <>
            <Text>Past Birthdays</Text>
            <SwipeListView
              data={pastBirthdays}
              renderItem={displayListBeforeSwipe}
              renderHiddenItem={displaySwipeHidden}
              //leftOpenValue={75}
              rightOpenValue={-150}
              /*  onRowDidOpen={(rowKey, rowMap) => {
                closeLastOpenedRow(rowMap);
                setLastOpenedRowKey(rowKey);
              }} */
            />
          </>
        )}
      </View>
      <Button
        title="Upcoming Birthdays"
        color={activeButton === 'upcoming' ? colours.yellow : colours.lightBlue}
        onPress={() => setActiveButton('upcoming')}
      />
      <Button
        title="Past Birthdays"
        color={activeButton === 'past' ? colours.yellow : colours.lightBlue}
        onPress={() => setActiveButton('past')}
      />
    </>
  );
}
const colours = {
  white: '#E4E4E4',
  grey: '#B7B7B7',
  darkGrey: '#ABABAB',
  lightBlue: '#D1E2E2',
  darkBlue: '#00262C',
  darkBlueTransp: 'rgba(0, 38, 44, 0.8)',
  yellow: '#FFD45A',
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: colours.darkBlue,
    flex: 1,
  },
  containerWrapper: {
    backgroundColor: colours.darkBlue,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    margin: 30,
  },
  dataContainer: {
    backgroundColor: 'transparent',
    marginVertical: 5,
  },
  name: {
    color: colours.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    color: colours.white,
  },
  date: {
    color: colours.yellow,
    textAlign: 'right',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    /*  marginVertical: 30, */
    height: 1,
    width: '80%',
  },
  pastBirthdays: {
    color: colours.darkGrey,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 0,
    backgroundColor: 'transparent', // For demonstration purposes
  },
  editContainer: {
    backgroundColor: colours.yellow,
    /* marginRight: 30, */
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    textAlign: 'center',
  },
  deleteContainer: {
    backgroundColor: 'red',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
