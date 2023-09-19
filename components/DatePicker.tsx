//github.com/react-native-datetimepicker/datetimepicker

import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    /* setSelectedDate(date); */
    if (selectedDate) {
      onDateSelect(selectedDate);
    }
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
          <Text>Date of Birth</Text>
          <DateTimePicker
            value={selectedDate || new Date()} // Provide the initial value here
            mode="date"
            display="spinner" //default, spinner, compact, inline
            onChange={(event, date) => {
              if (date) {
                handleConfirm(date);
              }
            }}
          />
        </View>
      )}
      {selectedDate && (
        <View>
          <Text>
            Date of birth {selectedDate.getDate()}/{selectedDate.getMonth() + 1}
            /{selectedDate.getFullYear()}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateInput: {},
});
