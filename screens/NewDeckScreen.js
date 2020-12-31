import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Paragraph>Create</Paragraph>
      </View>
    </SafeAreaView>
  );
}
