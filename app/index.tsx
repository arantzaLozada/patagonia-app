import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();
  return (
    <View>
      <ImageBackground
        source={require('../assets/images/wabe.png')}
        style={[styles.background, { height }]}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View
              style={styles.content}
              className="stify-between
"
            >
              <View className="mt-32 items-center ">
                <Icon
                  source="arrow-top-right-bold-box"
                  size={80}
                  color="white"
                />
                <Text
                  variant="headlineLarge"
                  style={{
                    color: 'white',
                    fontWeight: '700',
                    textAlign: 'center',
                  }}
                >
                  Patagonia App
                </Text>
              </View>

              <View className="mt-80 gap-5">
                <Button
                  mode="contained"
                  className="py-2"
                  icon="arrow-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  onPress={() => router.push('/(tabs)')}
                >
                  Contenedores
                </Button>
                <Button
                  mode="contained-tonal"
                  className="py-2"
                  icon="arrow-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}
                >
                  Arreglo de contenedor
                </Button>
                <Button
                  mode="outlined"
                  className="py-2"
                  icon="arrow-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}
                >
                  Otros trabajos
                </Button>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    margin: 32,
    gap: 16,
  },
  background: {
    justifyContent: 'center',
  },
});
