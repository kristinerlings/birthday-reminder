// https://docs.expo.dev/versions/latest/sdk/async-storage/
//npx expo install @react-native-async-storage/async-storage
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '../../../components/Themed';
import { Stack /* useRouter */ } from 'expo-router'; //useRouter -> access router from anywhere I pushed
import { useBirthdayStore } from '../../../store/useBirthdayStore';

export default function Birthdays() {
  /*  const router = useRouter(); */
  const { data/* , selectedDate */ } = useBirthdayStore(); // Access both data and selectedDate

  const dummyData = [{ name: 'Sarah Johnsson', date: '11nov' }];

  return (
    <>
      <Stack.Screen options={{ title: 'Birthdays' }} />
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.message}</Text>
            <Text>{item.date?.getDay()}</Text>
          </View>
        )}
        estimatedItemSize={50}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
