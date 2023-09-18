import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { Stack } from 'expo-router';

export default function Birthdays() {
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
