import { Stack } from 'expo-router';
import { StyleSheet, Pressable, ImageBackground } from 'react-native';
import { Text, View } from '../../../components/Themed';

export default function TabOneScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Coffee' }} />
      <ImageBackground
        source={require('./../../assets/images/background.png')}
        style={styles.container}
      >
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={() => console.log('Pressed!')}
          >
            <Text>Birthday List</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => console.log('Pressed!')}
          >
            <Text>Add new</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => console.log('Pressed!')}
          >
            <Text>Edit list</Text>
          </Pressable>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Upcoming Birthdays</Text>
          <View style={styles.birthdayStatus}>
            <Text style={styles.name}>Sarah Johnsson</Text>
            <Text style={styles.date}>11nov</Text>
          </View>
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
