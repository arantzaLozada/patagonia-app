import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

export function AppbarHeader() {
  const router = useRouter();
  return (
    <View>
      <Appbar.Header className="flex-row justify-between">
        <Appbar.BackAction
          onPress={() => {
            router.dismiss();
          }}
          iconColor="#3F5F90"
        />
        {/* <Text className="mr-4">Agregar trabajo</Text> */}
        {/* <Appbar.Content title="Salir" className="ml-64" color="#3F5F90" /> */}
      </Appbar.Header>
    </View>
  );
}
