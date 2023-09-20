import React, { useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Stack, router } from 'expo-router';
import DatePicker from '../../../components/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBirthdayStore } from '../../../store/useBirthdayStore';

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
  const { setData } = useBirthdayStore(); // accesss the Zustand store

  /*  const inputRef = useRef(null); */
  const inputRef = useRef<TextInput>(null);

  const resetInputFields = () => {
    setInputName('');
    setInputMessage('');
    setSelectedDate(null);
  };

  const handleTapOutside = () => {
    Keyboard.dismiss();
  };

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
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={handleTapOutside}>
          <View style={styles.wrapper}>
            {/*  <Text style={{ color: colours.lightBlue }}>New Birthday</Text> */}
            <View>
              <Text style={styles.title}>Name</Text>
              <TextInput
                ref={inputRef}
                editable
                style={styles.inputField}
                numberOfLines={1}
                maxLength={40}
                onChangeText={(input) => setInputName(input)}
                value={inputName}
                placeholder="Name"
                placeholderTextColor="#B7B7B7"
              />
            </View>
            <View>
              <Text style={styles.title}>Additional information</Text>
              <TextInput
                editable
                multiline
                numberOfLines={3}
                maxLength={80}
                style={styles.textarea}
                onChangeText={(input) => setInputMessage(input)}
                value={inputMessage}
                placeholder="Buy a present, send flowers, call, etc."
                placeholderTextColor="#B7B7B7"
              />
            </View>

            {/*   <Button title="Cancel" onPress={() =>{
              router.push('');
            }
      }}  */}
            <Text style={styles.title}>Date of Birth</Text>
            <DatePicker
              onDateSelect={(date: Date | null) => {
                setSelectedDate(date); // explicitly specify the type here
              }}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    router.push('/(tabs)/(index)');
                    resetInputFields();
                  }}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Save"
                  onPress={async () => {
                    const birthdayData = {
                      name: inputName,
                      message: inputMessage,
                      date: selectedDate, // fix ..
                    };

                    //await storeData(birthdayData);

                    // Store the birthday data in Zustand
                    setData([
                      ...useBirthdayStore.getState().data,
                      birthdayData,
                    ]);

                    router.push('/(tabs)/birthdays');
                    resetInputFields();
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
}
/*   style={[styles.inputField, { color: colours.grey }]} */
const colours = {
  white: '#E4E4E4',
  grey: '#B7B7B7',
  lightGrey: '#C0C0C0',
  lightBlue: '#D1E2E2',
  darkBlue: '#00262C',
  darkBlueTransp: 'rgba(0, 38, 44, 0.8)',
  yellow: '#FFD45A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.darkBlue,
  },
  wrapper: {
    margin: 30,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    width: 120,
    borderRadius: 10,
  },
  buttonSave: {
    backgroundColor: colours.yellow,
  },
  inputField: {
    height: 40,
    borderColor: colours.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    color: colours.grey,
    maxWidth: '60%',
  },
  textarea: {
    height: 80,
    borderColor: colours.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    color: colours.grey,
  },
  placeholder: {
    color: colours.lightGrey,
  },
  title: {
    color: colours.yellow,
    marginTop: 5,
  },
});
