import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export const IconTextButton = ({icon, title}) => {
  return (
    <TouchableOpacity style={styles.container}>
      {icon}
      <Text style={styles.txtTitle}>{title}</Text>
    </TouchableOpacity>
  );
};
