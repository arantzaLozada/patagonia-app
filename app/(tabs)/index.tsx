import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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
        const result = await TextRecognition.recognize(photo!.uri);
        // setUri(result.text);

        // Combina los bloques detectados
        const allBlocks = result.blocks || [];

        console.log(allBlocks);

        // Filtra caracteres individuales en columna
        const verticalLetters = allBlocks
          .flatMap((block) =>
            block.lines.flatMap((line) => line.text.split(''))
          )
          .filter((char) => /[A-Za-z0-9]/.test(char));

        // Une los caracteres verticales
        const combined = verticalLetters.join('');

        setUri(combined);
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
          <View className="rounded-xl p-10 border border-dashed   border-cyan-800">
            <Text className="text-center text-xl font-medium text-cyan-800">
              Ingresa el código
            </Text>
            <View className="flex-row items-center   gap-4">
              <TextInput
                className="border border-dashed   rounded-lg px-4 py-3  mt-8 border-cyan-800 w-4/5"
                placeholder="MM3KL0"
                placeholderTextColor={'#DED9D9'}
                value={uri ?? ''}
                onChangeText={setUri}
              />
              <TouchableOpacity onPress={openCamera}>
                <MaterialIcons
                  name="photo-camera"
                  size={28}
                  color="#155e75"
                  className="mt-6"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-center mt-16">
            <TouchableOpacity className="bg-cyan-800 py-4 px-8 rounded-lg">
              <Text className="text-white">Agregar trabajo</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showCamera && renderCamera()}
      </View>
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
