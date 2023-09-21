// https://docs.expo.dev/versions/latest/sdk/async-storage/
//npx expo install @react-native-async-storage/async-storage
import { StyleSheet, Button } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '../../../components/Themed';
import { Stack /* useRouter */ } from 'expo-router'; //useRouter -> access router from anywhere I pushed
import { useBirthdayStore } from '../../../store/useBirthdayStore'; // Zustand
import UpcomingAge from '../../../components/UpcomingAge';
import React, { useState } from 'react';

export default function Birthdays() {
  /*  const router = useRouter(); */
  const { data } = useBirthdayStore(); // Access data from zustand store

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

  const [showUpcoming, setShowUpcoming] = useState(true);

  return (
    <>
      <Stack.Screen options={{ title: 'Birthdays' }} />
      <View style={styles.pageContainer}>
        <Text>Upcoming Birthdays</Text>
        <Button
          title={showUpcoming ? 'Upcoming Birthdays' : 'Past Birthdays'}
          onPress={() => setShowUpcoming(!showUpcoming)}
          color={colours.lightBlue}
        />
        { showUpcoming ? (
          <FlashList
            data={upcomingBirthdays}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <View style={styles.dataContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.message}>{item.message}</Text>
                </View>
                <View style={styles.dataContainer}>
                  <Text style={styles.date}>
                    {/*  {item.date?.toLocaleDateString()} */}
                    {/* {item.date?.toLocaleDateString(undefined, {day: 'numeric', month: 'short'})} */}
                    {item.date
                      ? `${item.date.getDate()} ${item.date.toLocaleString(
                          'default',
                          { month: 'short' }
                        )}`
                      : ''}
                  </Text>
                  <UpcomingAge birthday={item.date} />
                </View>
              </View>
            )}
            estimatedItemSize={50}
          />
        ) : (
          <>
            <Text>Past Birthdays</Text>
            <FlashList
              data={pastBirthdays}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <View style={styles.dataContainer}>
                    <Text style={[styles.name, styles.pastBirthdays]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.message, styles.pastBirthdays]}>
                      {item.message}
                    </Text>
                  </View>
                  <View style={styles.dataContainer}>
                    <Text style={[styles.date, { color: colours.grey }]}>
                      {/*  {item.date?.toLocaleDateString()} */}
                      {/* {item.date?.toLocaleDateString(undefined, {day: 'numeric', month: 'short'})} */}
                      {item.date
                        ? `${item.date.getDate()} ${item.date.toLocaleString(
                            'default',
                            { month: 'short' }
                          )}`
                        : ''}
                    </Text>
                    <UpcomingAge birthday={item.date} />
                  </View>
                </View>
              )}
              estimatedItemSize={50}
            />
          </>
        )}
      </View>
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
});
