// https://docs.expo.dev/versions/latest/sdk/async-storage/
//npx expo install @react-native-async-storage/async-storage
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '../../../components/Themed';
import { Stack /* useRouter */ } from 'expo-router'; //useRouter -> access router from anywhere I pushed
import { useBirthdayStore } from '../../../store/useBirthdayStore';

export default function Birthdays() {
  /*  const router = useRouter(); */
  const { data /* , selectedDate */ } = useBirthdayStore(); // Access both data and selectedDate

  const dummyData = [{ name: 'Sarah Johnsson', date: '11nov' }];

  return (
    <>
      <Stack.Screen options={{ title: 'Birthdays' }} />
      <View style={styles.pageContainer}>
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.dataContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>{item.message}</Text>
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.date}>DummyData</Text>
              </View>
            </View>
          )}
          estimatedItemSize={50}
        />
      </View>
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
});
