import React from 'react';
import { Platform, TouchableWithoutFeedback } from 'react-native';

interface PlatformTouchableProps{
  onPress: () => void;
  children: React.ReactNode;
}

//helper function to handle touchable components on web
const PlatformTouchable: React.FC<PlatformTouchableProps> = ({
  onPress,
  children,
}) => {
  if (Platform.OS !== 'web') {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {children}
      </TouchableWithoutFeedback>
    );
  }
  return <>{children}</>;
};

export default PlatformTouchable;
