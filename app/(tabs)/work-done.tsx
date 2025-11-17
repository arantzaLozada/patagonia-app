import { AppbarHeader } from '@/components/appbar-header';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  Icon,
  RadioButton,
  Text,
} from 'react-native-paper';

export default function WorkDone() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AppbarHeader />
      <ScrollView>
        <View style={styles.content}>
          <Text
            variant="headlineSmall"
            style={{ color: '#113664', fontWeight: '700' }}
          >
            Trabajos realizados
          </Text>
          <Divider />
          <View className="flex-row justify-between my-3">
            <View className="flex-row items-center">
              <RadioButton
                value="first"
                status="checked"
                onPress={() => console.log('first')}
              />
              <Text variant="titleSmall">Seleccionar</Text>
            </View>
            <Button mode="contained">Entregar</Button>
          </View>
          <View className="bg-[#f4f8ff] rounded py-4 px-4 my-2">
            <View className="flex-row justify-between py-1">
              <Text variant="titleMedium">CP2M200</Text>
              <Text variant="titleSmall">100.000</Text>
            </View>
            <View className="flex-row justify-between items-center  my-2">
              <View className="flex-row gap-2">
                <Icon source="calendar-month" size={20} color="#113664" />
                <Text
                  variant="titleSmall"
                  style={{ color: '#113664', fontWeight: '700' }}
                >
                  20 de Mayo
                </Text>
              </View>
              <Text className="py-2">Estandar - Oficina</Text>
            </View>
            <View className="flex-row justify-between  items-center">
              <Chip
                icon="clock"
                className="my-1"
                onPress={() => console.log('Pressed')}
              >
                Por entregar
              </Chip>
              <Checkbox status={'checked'} />
            </View>
          </View>
          <View className="bg-[#f4f8ff] rounded py-4 px-4">
            <View className="flex-row justify-between py-1">
              <Text variant="titleMedium">CD2K800</Text>
              <Text variant="titleSmall">50.000</Text>
            </View>
            <View className="flex-row justify-between items-center  my-2">
              <View className="flex-row gap-2">
                <Icon source="calendar-month" size={20} color="#113664" />
                <Text
                  variant="titleSmall"
                  style={{ color: '#113664', fontWeight: '700' }}
                >
                  12 de Julio
                </Text>
              </View>
              <Text className="py-2">Estandar - Oficina</Text>
            </View>
            <View className="flex-row justify-between  items-center">
              <Chip
                icon="clock"
                className="my-1"
                onPress={() => console.log('Pressed')}
              >
                Por entregar
              </Chip>
              <Checkbox status={'unchecked'} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 12,
    margin: 32,
    gap: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});
