import React from 'react';
import { Text } from 'react-native';

type UpcomingAgeProps = {
  birthday: Date | null;
};

function UpcomingAge({ birthday }: UpcomingAgeProps) {
  
  
  function calculateUpcomingAge(birthdayDate: Date) {
    const today = new Date();
    return today.getFullYear() - birthdayDate.getFullYear();
  }

  if (!birthday) return null;

  return <Text>Turns {calculateUpcomingAge(birthday)} this year</Text>;
}

export default UpcomingAge;
