import { Stack, Link, router } from 'expo-router';
import { StyleSheet, Pressable, ImageBackground, Button } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { useBirthdayStore } from '../../../store/useBirthdayStore';
import { useUpcomingBirthdays } from '../../../components/useUpcomingBirthdays'; // my custom hook

export default function TabOneScreen() {
  const { data } = useBirthdayStore();
  //upcoming bday
  const upcomingBirthdays = useUpcomingBirthdays();
  const displayNextTwoBirthdays = upcomingBirthdays.slice(0, 2);

  //is birthday? - helper function 
  const isTodayBirthday = () => {
    const today = new Date();
     return data.filter(
       (birthday) =>
         birthday.date &&
         birthday.date.getDate() === today.getDate() &&
         birthday.date.getMonth() === today.getMonth()
     );
  }

  const birtdayDisplayIfToday = isTodayBirthday();


  return (
    <>
      <Stack.Screen options={{ title: 'Birthday Log' }} />
      <ImageBackground
        source={require('./../../../assets/images/background.png')}
        style={styles.container}
      >
        <View style={styles.buttonsContainer}>
          {birtdayDisplayIfToday.length > 0 ? ( <Text>It's {birtdayDisplayIfToday[0].name}'s birthday today!</Text>): <Text>Keep a track of your friends birhdays</Text>}
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Upcoming Birthdays</Text>
          {displayNextTwoBirthdays.map((birthday, index) => (
            <View style={styles.birthdayStatus}>
              <Text style={styles.name}>{birthday.name}</Text>
              <Text style={styles.date}>
                {birthday.date
                  ? `${birthday.date.getDate()} ${birthday.date.toLocaleString(
                      'default',
                      { month: 'short' }
                    )}`
                  : ''}
              </Text>
            </View>
          ))}
        </View>
      </ImageBackground>
    </>
  );
}
const colours = {
  white: '#E4E4E4',
  grey: '#B7B7B7',
  lightBlue: '#D1E2E2',
  darkBlue: '#00262C',
  darkBlueTransp: 'rgba(0, 38, 44, 0.8)',
  yellow: '#FFD45A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.darkBlue,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flex: 1, //take up remaining vertical space
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    paddingVertical: 15,
    backgroundColor: colours.lightBlue,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  statusContainer: {
    backgroundColor: colours.darkBlueTransp,
    padding: 10,
    paddingBottom: 60,
  },
  statusTitle: {
    alignSelf: 'center',
    color: colours.grey,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  birthdayStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  name: {
    color: colours.grey,
  },
  date: {
    color: colours.yellow,
    fontWeight: '600',
  },
});
