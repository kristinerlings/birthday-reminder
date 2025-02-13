//github.com/react-native-datetimepicker/datetimepicker

import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBirthdayStore } from '../store/useBirthdayStore'; //Zustand
import Color from '../constants/Colors';

interface DatePickerProps {
  onDateSelect: (date: Date | null) => void;
}

export default function DatePicker({ onDateSelect }: DatePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  /*    const {isInputFocused, setInputFocused} = useState(false); */

  /* const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    }; */

  const handleConfirm = (date: Date) => {
    setSelectedDate(date); // Set the selected date in the component's state
    onDateSelect(date); // Pass the selected date to the parent component
    /* setSelectedDate(date); */

    /*  if (selectedDate) {
      onDateSelect(selectedDate);
    } */
    /*  hideDatePicker(); */
  };

  /*   const toggleDatePicker = () => {
    setInputFocused(true);
    showDatePicker();
  }; */

  return (
    <View style={styles.container}>
      {/*  <Button
        title="Show Date Picker"
        onPress={() => setDatePickerVisibility(true)}
      /> */}
      {isDatePickerVisible && (
        <View style={styles.dateInput}>
          {/*  <Text style={styles.title}>Date of Birth</Text> */}
          <DateTimePicker
            /* defaultValue= */
            value={selectedDate || new Date()}
            mode="date"
            display="spinner" //default, spinner, compact, inline
            onChange={(event, date) => {
              if (date) {
                handleConfirm(date);
                /*  onDateSelect(date); */ // Pass the selected date to the parent component
              }
            }}
          />
        </View>
      )}
      {selectedDate && (
        <View>
          <Text style={styles.title}>
            Date of birth {selectedDate.getDate()}/{selectedDate.getMonth() + 1}
            /{selectedDate.getFullYear()}
          </Text>
        </View>
      )}
    </View>
  );
}
/* const colours = {
  white: '#E4E4E4',
  yellow: '#FFD45A',
};
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateInput: {},
  title: {
    color: Color.myCustomColours.darkGrey,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});
