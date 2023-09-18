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
import DatePicker from '../../components/DatePicker';
/*SafeAreaView - automatically applies padding / view */

export default function AddNewBirthday() {
  const [textInput, setTextInput] = React.useState('');
  const inputRef = useRef(null);

  /*  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  }; */

  return (
    <>
      <Stack.Screen options={{ title: 'Add New Birthday' }} />
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
            onChangeText={(input) => setTextInput(input)}
            value={textInput}
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
            onChangeText={(input) => setTextInput(input)}
            value={textInput}
            placeholder="Buy a present, send flowers, call, etc. "
          />
        </View>

        {/*   <Button title="Cancel" onPress={() =>{
              router.push('');
            }
      }}  */}
        <DatePicker />
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={
              () =>
                console.log('pressed') /* router.push('./(index)/index.tsx') */
            }
          >
            <Text>Cancel</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={
              () =>
                console.log('pressed') /* router.push('./(index)/index.tsx') */
            }
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
