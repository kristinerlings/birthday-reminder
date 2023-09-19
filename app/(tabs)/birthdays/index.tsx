// https://docs.expo.dev/versions/latest/sdk/async-storage/
//npx expo install @react-native-async-storage/async-storage
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { Stack, /* useRouter */ } from 'expo-router'; //useRouter -> access router from anywhere I pushed

export default function Birthdays() {
 /*  const router = useRouter(); */
 /*  const { data } = router.params || {};  *///retrieve the data from the route params. if data is undefined, set it to empty object

  const dummyData = [{ name: 'Sarah Johnsson', date: '11nov' }];

  return (
    <>
      <Stack.Screen options={{ title: 'Birthdays' }} />
      <FlashList
        data={dummyData}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
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
