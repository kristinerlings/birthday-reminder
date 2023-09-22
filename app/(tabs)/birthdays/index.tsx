//https://www.npmjs.com/package/react-native-swipe-list-view
//https://github.com/leecade/react-native-swiper
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, AppRegistry } from 'react-native'; //AppRegistry => tells which component should be the starting point/root
import { SwipeListView } from 'react-native-swipe-list-view'; //SwipeListView => Is built on top of FlashList !
import { Text, View } from '../../../components/Themed';
import UpcomingAge from '../../../components/UpcomingAge';
import Colors from '../../../constants/Colors';
import {
  BirthdayData,
  useBirthdayStore,
} from '../../../store/useBirthdayStore'; // Zustand
import Swiper from 'react-native-swiper'; //swipe data/screens

type RowMapEntry = {
    closeRow: () => void;
    isOpen: () => boolean;
    manuallySwipeRow: (toValue: number) => void;
  };

  


export default function Birthdays() {
  /*  const router = useRouter(); */
  const { data, setData } = useBirthdayStore(); // Access data from zustand store
  //swipe list view
  const [lastOpenedRowKey, setLastOpenedRowKey] = useState<string | null>(null);
  /* const rowMapRef = React.useRef({});//ref to row hidden component */
const rowMapRef = React.useRef<Record<string, RowMapEntry>>({});

  const sortedData = [...data].sort((a, b) => {
    if (a.date && b.date) {
      if (a.date.getMonth() !== b.date.getMonth()) {
        return a.date.getMonth() - b.date.getMonth();
      }
      return a.date.getDate() - b.date.getDate();
    } else if (a.date) {
      return -1; // a = contains date but not b
    } else if (b.date) {
      return 1; //b = contains date but not a
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

  /*  const [activeButton, setActiveButton] = useState('upcoming'); */



  type MonthImagesType = {
    january: any;
    february: any;
    march: any;
    april: any;
    may: any;
    june: any;
    july: any;
    august: any;
    september: any;
    october: any;
    november: any;
    december: any;
  };

  const zodiacImages: MonthImagesType = {
    january: require('../../../data/january.png'),
    february: require('../../../data/february.png'),
    march: require('../../../data/march.png'),
    april: require('../../../data/april.png'),
    may: require('../../../data/may.png'),
    june: require('../../../data/june.png'),
    july: require('../../../data/july.png'),
    august: require('../../../data/august.png'),
    september: require('../../../data/september.png'),
    october: require('../../../data/october.png'),
    november: require('../../../data/november.png'),
    december: require('../../../data/december.png'),
  };

  const displayListBeforeSwipe = ({ item }: { item: BirthdayData }) => {
    const zodiacMonthName: keyof MonthImagesType | null = item.date
      ? (item.date
          .toLocaleString('default', { month: 'long' })
          .toLowerCase() as keyof MonthImagesType)
      : null;

    const zodiacImageToShow = zodiacMonthName
      ? zodiacImages[zodiacMonthName]
      : null;

    return (
      <View style={styles.containerWrapper} onTouchEnd={() => toggleRow(item.key)}>
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.bdayDate}>
              {zodiacImageToShow && (
                <Image source={zodiacImageToShow} style={styles.zodiacImage} />
              )}

              <Text style={styles.date}>
                {item.date
                  ? `${item.date.getDate()} ${item.date.toLocaleString(
                      'default',
                      {
                        month: 'short',
                      }
                    )}`
                  : ''}
              </Text>
            </View>
            <UpcomingAge birthday={item.date} />
          </View>
        </View>
      </View>
    );
  };

  //rowMap = object with keys of row data, and values of ref to row hidden component
  const displaySwipeHidden = (data: { item: BirthdayData }, rowMap: any) => {
    rowMapRef.current = rowMap; // store rowMap
    return (
      <View style={styles.rowBack} onTouchEnd={()=> toggleRow(data.item.key)}>
        <View style={styles.deleteContainer}>
          <Text onPress={() => handleDelete(data.item)}>Delete</Text>
        </View>
      </View>
    );
  };

  const handleDelete = (itemToDelete: BirthdayData) => {
    const updatedData = data.filter((item) => item !== itemToDelete);
    setData(updatedData); //  update the store
  };

 //toggleRow = open/close row instead of rely only on swipe 
const toggleRow = (rowKey: string) => {
  if (rowMapRef.current[rowKey]) {
    if (lastOpenedRowKey && lastOpenedRowKey !== rowKey) {
      rowMapRef.current[lastOpenedRowKey]?.closeRow();
    }
    if (
      typeof rowMapRef.current[rowKey].isOpen === 'function' &&
      rowMapRef.current[rowKey].isOpen()
    ) {
      rowMapRef.current[rowKey].closeRow();
      setLastOpenedRowKey(null);
    } else {
      rowMapRef.current[rowKey].manuallySwipeRow(-80);
      setLastOpenedRowKey(rowKey);
    }
  }
};
console.log(toggleRow);

  return (
    <>
      <Stack.Screen options={{ title: 'Birthdays' }} />
      <View style={styles.pageContainer}>
        <Swiper
        /*   showsButtons={true}
          nextButton={
            <Text
              style={{ color: Colors.myCustomColours.lightGrey, fontSize: 16, paddingBottom: 13 }}
            >
              -›
            </Text>
          }
          prevButton={
            <Text
              style={{ color: Colors.myCustomColours.darkGrey, fontSize: 16, paddingBottom: 13 }}
            >
              ‹- 
            </Text>
          }
          buttonWrapperStyle={{
            alignItems: 'flex-end',
          }} */
          loop={false}
          style={styles.wrapper}
          activeDotColor={Colors.myCustomColours.yellow}
        >
          <View style={styles.slide1}>
            <Text style={styles.titleToggle}>Upcoming Birthdays</Text>
            <SwipeListView<BirthdayData>
              data={upcomingBirthdays}
              renderItem={displayListBeforeSwipe}
              renderHiddenItem={displaySwipeHidden}
              rightOpenValue={-80}
            />
          </View>
          <View style={styles.slide2}>
            <Text style={styles.titleToggle}>Past Birthdays</Text>
            <SwipeListView
              data={pastBirthdays}
              renderItem={displayListBeforeSwipe}
              renderHiddenItem={displaySwipeHidden}
              rightOpenValue={-80}
            />
          </View>
        </Swiper>
      </View>
      {/*    <Button
        title="Upcoming Birthdays"
        color={
          activeButton === 'upcoming'
            ? Colors.myCustomColours.yellow
            : Colors.myCustomColours.lightBlue
        }
        onPress={() => setActiveButton('upcoming')}
      />
      <Button
        title="Past Birthdays"
        color={
          activeButton === 'past'
            ? Colors.myCustomColours.yellow
            : Colors.myCustomColours.lightBlue
        }
        onPress={() => setActiveButton('past')}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.myCustomColours.darkBlue,
    flex: 1,
  },
  containerWrapper: {
    backgroundColor: Colors.myCustomColours.darkBlue,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  dataContainer: {
    backgroundColor: 'transparent',
    marginVertical: 5,
  },
  name: {
    color: Colors.myCustomColours.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    color: Colors.myCustomColours.white,
  },
  date: {
    color: Colors.myCustomColours.yellow,
    textAlign: 'right',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleToggle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.myCustomColours.white,
    textAlign: 'center',
    marginVertical: 20,
  },
  separator: {
    /*  marginVertical: 30, */
    height: 1,
    width: '80%',
  },
  pastBirthdays: {
    color: Colors.myCustomColours.darkGrey,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 0,
    backgroundColor: 'transparent',
  },
  editContainer: {
    backgroundColor: Colors.myCustomColours.yellow,
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
  zodiacImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  bdayDate: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  wrapper: {}, //swiper wrapper
  slide1: {
    flex: 1,
    backgroundColor: Colors.myCustomColours.darkBlue,
  },
  slide2: {
    flex: 1,
    backgroundColor: Colors.myCustomColours.darkBlue,
  },
});
