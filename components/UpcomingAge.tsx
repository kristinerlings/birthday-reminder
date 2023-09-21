import React from 'react';
import { Text, StyleSheet } from 'react-native';

type UpcomingAgeProps = {
  birthday: Date | null;
};

function UpcomingAge({ birthday }: UpcomingAgeProps) {
  
  
  function calculateUpcomingAge(birthdayDate: Date) {
    const today = new Date();
    return today.getFullYear() - birthdayDate.getFullYear();
  }

  if (!birthday) return null;

  return (
    <Text style={{ color: '#ABABAB' }}>
      {calculateUpcomingAge(birthday)}yrs this year
    </Text>
  );
}

export default UpcomingAge;
