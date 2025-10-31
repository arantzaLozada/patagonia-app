import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';

import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  IconButton,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const openCamera = async () => {
    // si no hay permiso, pedirlo antes
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) return; // si el usuario no da permiso, salir
    }
    setShowCamera(true); // 👈 ahora sí mostrar cámara
  };

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();

    // if (photo?.uri) setUri(photo.uri);

    if (photo?.uri) {
      try {
        const result = await TextRecognition.recognize(
          photo.uri,
          TextRecognitionScript.CHINESE
        );

        setUri(result.text);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderCamera = () => {
    if (uri) return null;
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={ref}
          mute={false}
          style={styles.camera}
          facing="back"
          mode="picture"
          responsiveOrientationWhenOrientationLocked
        />
        <View>
          <Text className="text-white">Cerrar</Text>
        </View>
        <View className="h-full justify-end items-center pb-6">
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: 'white',
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <ScrollView>
        <View style={styles.content}>
          <View className="bg-cyan-700 p-8 rounded-xl">
            <Text className="text-4xl font-semibold text-white">
              Welcome to App!
            </Text>
            <Text className="text-xl mt-10 text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
          </View>

          <View className="w-full">
            <View className="">
              {/* <Text className="text-center text-xl font-medium text-cyan-800">
              Ingresa el código
              </Text> */}
              <View className="flex-row justify-between  items-center gap-4">
                <View className="w-4/5">
                  {/* <TextInput
                  className="border border-dashed   rounded-lg px-4 py-3 mt-5  border-cyan-800"
                  placeholder="MM3KL0"
                  placeholderTextColor={'#DED9D9'}
                  value={uri ?? ''}
                  onChangeText={setUri}
                  /> */}
                  <TextInput mode="outlined" label="Código de serie" />
                </View>
                <View className="">
                  <IconButton icon="camera" mode="contained" />
                  {/* <TouchableOpacity onPress={openCamera}>
                  <MaterialIcons
                  name="photo-camera"
                  size={28}
                  color="#155e75"
                  />
                  </TouchableOpacity> */}
                </View>
              </View>

              <View className="mt-5">
                <Text variant="bodyLarge">Tipo de trabajo</Text>
                <RadioButton.Group
                  onValueChange={(value) => console.log(value)}
                  value={'second'}
                >
                  <RadioButton.Item label="Estandar" value="first" />
                  <RadioButton.Item label="Según plano" value="second" />
                </RadioButton.Group>
              </View>
              <View className="items-center">
                <IconButton icon="cloud-upload" mode="contained" size={30} />
              </View>
              <View>
                <TextInput mode="outlined" label="Precio venta tarro" />
              </View>
            </View>
            <View className="flex-row justify-center mt-16">
              <Button
                onPress={() => router.push('/modal')}
                mode="contained"
                icon="briefcase-plus"
                contentStyle={{ flexDirection: 'row-reverse' }}
                className="py-2 px-4"
              >
                Agregar trabajo
              </Button>
            </View>
          </View>
          {showCamera && renderCamera()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  content: {
    flex: 1,
    margin: 32,
    gap: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cameraContainer: StyleSheet.absoluteFillObject,
  camera: StyleSheet.absoluteFillObject,
  shutterBtn: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 45,

    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
