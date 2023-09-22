import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import React, { useRef } from 'react';
import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import DatePicker from '../../../components/DatePicker';
import PlatformTouchable from '../../../components/PlatformTouchable';
import Colors from '../../../constants/Colors';
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
  /*   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); */

  const { setData } = useBirthdayStore(); // accesss the Zustand store

  /*  const inputRef = useRef(null); */
  const inputRef = useRef<TextInput>(null);

  const resetInputFields = () => {
    setInputName('');
    setInputMessage('');
    setSelectedDate(null);
  };

  const handleTapOutside = () => {
    /*  if (Platform.OS !== 'web') { */
    Keyboard.dismiss();
    /*  } else {
      undefined;
    } */
  };

  //access selected data from onDateSelect callback from child/DatePicker component.
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  //const { addBirthday } = useBirthdayStore();

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
        <PlatformTouchable onPress={handleTapOutside}>
          <View style={styles.wrapper}>
            <Text style={styles.newTitle}>Log New Birthday</Text>
            <View style={{ paddingTop: 10 }}>
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
              onDateSelect={handleDateSelect} //access selected date from component
              // onDateSelect={(date: Date | null) => {
              //   setSelectedDate(date); // explicitly specify the type here
              // }}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <Button
                  title="Cancel"
                  color={Colors.myCustomColours.darkBlue}
                  onPress={() => {
                    router.push('/(tabs)/(index)');
                    resetInputFields();
                  }}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Save"
                  color={Colors.myCustomColours.darkBlue}
                  onPress={() => {
                    const birthdayData = {
                      name: inputName,
                      message: inputMessage,
                      date: selectedDate,
                    };
                    // Add the new birthday to the store
                    setData([
                      ...useBirthdayStore.getState().data,
                      birthdayData,
                    ]);
                    console.log(birthdayData);

                    router.push('/(tabs)/birthdays');
                    resetInputFields();
                  }}
                />
              </View>
            </View>
          </View>
        </PlatformTouchable>
      </SafeAreaView>
    </>
  );
}
/*   style={[styles.inputField, { color: Colors.myCustomColours.grey }]} */
/* const colours = {
  white: '#E4E4E4',
  grey: '#B7B7B7',
  lightGrey: '#C0C0C0',
  lightBlue: '#D1E2E2',
  darkBlue: '#00262C',
  darkBlueTransp: 'rgba(0, 38, 44, 0.8)',
  yellow: '#FFD45A',
}; */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.myCustomColours.darkBlue,
  },
  wrapper: {
    margin: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  button: {
    alignItems: 'center',
    padding: 5,
    width: 120,
    borderRadius: 10,
    backgroundColor: Colors.myCustomColours.lightBlue,
    color: Colors.myCustomColours.darkBlue,
  },
  buttonSave: {
    backgroundColor: Colors.myCustomColours.yellow,
  },
  inputField: {
    height: 40,
    borderColor: Colors.myCustomColours.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    color: Colors.myCustomColours.grey,
    maxWidth: '60%',
  },
  textarea: {
    height: 80,
    borderColor: Colors.myCustomColours.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
    color: Colors.myCustomColours.grey,
  },
  placeholder: {
    color: Colors.myCustomColours.lightGrey,
  },
  title: {
    color: Colors.myCustomColours.yellow,
    marginTop: 5,
  },
  newTitle: {
    color: Colors.myCustomColours.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  }
});
