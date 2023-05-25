import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export const IconButton = ({icon}) => {
  return <TouchableOpacity style={styles.container}>{icon}</TouchableOpacity>;
};
