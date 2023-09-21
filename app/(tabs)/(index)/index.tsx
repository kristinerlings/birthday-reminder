//https://github.com/VincentCATILLON/react-native-confetti-cannon
//snack.expo.dev/embedded/@aboutreact/gift-card-screen-with-react-native-confetti-cannon?iframeId=qn4os3zz2g&preview=true&platform=ios&theme=dark

import { Stack, Link, router } from 'expo-router';
import { StyleSheet, Pressable, ImageBackground, Button } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { useBirthdayStore } from '../../../store/useBirthdayStore';
import { useUpcomingBirthdays } from '../../../components/useUpcomingBirthdays'; // my custom hook
import ConfettiCannon from 'react-native-confetti-cannon';
import { useEffect, useState } from 'react';

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
  };

  const birtdayDisplayIfToday = isTodayBirthday();

  //confetti Cannon
  const [confettiExplosion, setConfettiExplosion] = useState(false);

  //confetti explition timeout
  /* useEffect(() => {
    setTimeout(() => {
      setConfettiExplosion(true);
    }, 1000);
  }, []);

  const handleConfettiOnBirthday = () => {
    //To fire the cannon again. You can make your own logic here
    setConfettiExplosion(false);
    setTimeout(() => {
      setConfettiExplosion(true);
    }, 500);
  }; */

  useEffect(() => {
    const startConfetti = () => {
      setConfettiExplosion(false);
      setTimeout(() => {
        setConfettiExplosion(true);
      }, 500);
    };

    startConfetti(); // start immediately

    const intervalId = setInterval(() => {
      startConfetti();
    }, 50000);

    return () => clearInterval(intervalId); // cleanup when component unmounts
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Birthday Log' }} />
      <ImageBackground
        source={require('./../../../assets/images/background.png')}
        style={styles.container}
      >
        <View style={styles.displayContainer}>
          <View style={styles.displayContent}>
            {birtdayDisplayIfToday.length > 0 ? (
              <>
                <Text style={styles.displayText}>
                  It's {birtdayDisplayIfToday[0].name}'s birthday today!
                </Text>
                {confettiExplosion ? (
                  <View style={styles.confetti}>
                    <ConfettiCannon
                      count={250}
                      origin={{ x: -50, y: 0 }} //origin of the explosion
                      explosionSpeed={500}
                      fallSpeed={3000}
                    />
                  </View>
                ) : null}
              </>
            ) : (
              <Text>Keep a track of your friends birhdays</Text>
            )}
          </View>
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
  dark: '#012E33',
  yellow: '#FFD45A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.darkBlue,
    justifyContent: 'space-between',
  },
  displayContainer: {
    flex: 1, //take up remaining vertical space
    alingSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  displayContent: {
    paddingVertical: 150,
    paddingHorizontal: 40,
    marginHorizontal: 30,
    borderRadius: 40,
    backgroundColor: colours.dark,
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
  confetti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  displayText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
