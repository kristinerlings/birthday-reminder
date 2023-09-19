import React, { useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Stack, router } from 'expo-router';
import DatePicker from '../../../components/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*SafeAreaView - automatically applies padding / view */
//define typescript type for my object
interface birthdayData {
  name: string;
  message: string;
  date: Date | null;
}

export default function AddNewBirthday() {
  const [inputName, setInputName] = React.useState('');
  const [inputMessage, setInputMessage] = React.useState('');
/*   const [selectedDate, setSelectedDate] = React.useState(null); */
const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  /*  const inputRef = useRef(null); */
  const inputRef = useRef<TextInput>(null);

  /*  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  }; */

  const storeData = async (value: birthdayData) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'New Birthday' }} />
      <SafeAreaView>
        <Text>New Birthday</Text>
        <View>
          <Text>Name</Text>
          <TextInput
            ref={inputRef}
            editable
            style={styles.inputField}
            numberOfLines={1}
            maxLength={40}
            onChangeText={(input) => setInputName(input)}
            value={inputName}
            placeholder="Name"
          />
        </View>
        <View>
          <Text>Additional information</Text>
          <TextInput
            editable
            multiline
            numberOfLines={3}
            maxLength={40}
            style={styles.textarea}
            onChangeText={(input) => setInputMessage(input)}
            value={inputMessage}
            placeholder="Buy a present, send flowers, call, etc. "
          />
        </View>

        {/*   <Button title="Cancel" onPress={() =>{
              router.push('');
            }
      }}  */}
        <DatePicker
          onDateSelect={(date: Date | null) => {
            setSelectedDate( date ); // explicitly specify the type here
          }}
        />
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              console.log('pressed')
            } /* router.push({ pathname: './../(index)/index.tsx' })} */
          >
            <Text>Cancel</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={async () => {
              const birthdayData = {
                name: inputName,
                message: inputMessage,
                date: selectedDate, // Replace selectedDate with the actual date you want to store
              };
              await storeData(
                birthdayData
              ); /* router.push('./(index)/index.tsx') */
            }}
          >
            <Text>Save</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 100,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 12,
  },
  textarea: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 12,
  },
});
