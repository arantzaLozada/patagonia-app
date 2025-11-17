import { AppbarHeader } from '@/components/appbar-header';
import { createContainerWork, WorkPayload } from '@/services/containerService';

import { CameraView, useCameraPermissions } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  IconButton,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';

type PhotoAction = 'take-photo' | 'upload-photo';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const router = useRouter();

  const [uri, setUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [succces, setSuccces] = useState(false);

  const [formContainer, setFormContainer] = useState<WorkPayload>({
    record_id: '',
    job: 'estandar',
    file_plane: null,
    price: 0,
    comments: '',
  });

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

    if (photo?.uri) {
      setUri('foto.jpg');

      const file = {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };

      setFormContainer((prev) => ({
        ...prev,
        file_plane: file,
      }));
    }

    // if (photo?.uri) {
    //   try {
    //     const result = await TextRecognition.recognize(
    //       photo.uri,
    //       TextRecognitionScript.CHINESE
    //     );

    //     setUri(result.text);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: '*/*',
      });

      if (result.canceled || !result.assets?.length) return;

      const photo = result.assets[0];

      setUri(photo.name);

      const file = {
        uri: photo.uri,
        type: photo.mimeType,
        name: photo.name,
      };

      setFormContainer((prev) => ({
        ...prev,
        file_plane: file,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTakePhotoOrUploadFile = (value: PhotoAction) => {
    switch (value) {
      case 'take-photo':
        takePicture();
        setShowCamera(false);
        break;

      case 'upload-photo':
        uploadFile();
        break;
    }
  };

  const renderCamera = () => {
    // if (uri) return null;
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
          <IconButton
            icon="close"
            size={30}
            mode="contained"
            onPress={() => setShowCamera(false)}
          />
        </View>
        <View className="h-full justify-end items-center pb-6">
          <Pressable onPress={() => handleTakePhotoOrUploadFile('take-photo')}>
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

  const handleSubmit = async () => {
    if (!formContainer.record_id) {
      alert('Por favor completa el código de serie.');
      return;
    }
    setLoading(true);

    try {
      await createContainerWork(formContainer);
      // alert('Trabajo guardado exitosamente 🎉');
      // router.push('/(tabs)/work-done');
      setSuccces(true);
      setFormContainer({
        record_id: '',
        job: 'estandar',
        file_plane: null,
        price: 0,
        comments: '',
      });
      setUri(null);
    } catch {
      alert('Hubo un error al guardar el trabajo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AppbarHeader />

      <ScrollView>
        <View style={styles.content}>
          <Text
            variant="headlineSmall"
            style={{ color: '#113664', fontWeight: '700' }}
          >
            Agregar trabajo
          </Text>
          <Divider />

          <View className="w-full">
            <View className="">
              <View className="flex-row justify-between  items-center gap-4">
                <View className="w-full">
                  <TextInput
                    mode="outlined"
                    label="Código de serie*"
                    autoCapitalize="characters"
                    value={formContainer.record_id}
                    onChangeText={(value) =>
                      setFormContainer((prev) => ({
                        ...prev,
                        record_id: value,
                      }))
                    }
                  />
                </View>
              </View>

              <View className="mt-5">
                <Text variant="bodyLarge">Tipo de trabajo</Text>
                <RadioButton.Group
                  onValueChange={(job) =>
                    setFormContainer((prev) => ({
                      ...prev,
                      job: job as 'estandar' | 'plano',
                    }))
                  }
                  value={formContainer.job}
                >
                  <RadioButton.Item label="Estandar" value="estandar" />
                  <RadioButton.Item label="Según plano" value="plano" />
                </RadioButton.Group>
              </View>

              {formContainer.job === 'plano' ? (
                <View className="justify-center items-center my-4 gap-2 border py-5 rounded border-gray-500">
                  <Button mode="contained" icon="camera" onPress={openCamera}>
                    Tomar una foto
                  </Button>

                  <Text>ó</Text>
                  <Button
                    mode="contained-tonal"
                    icon="cloud-upload"
                    onPress={() => handleTakePhotoOrUploadFile('upload-photo')}
                  >
                    Subir un archivo
                  </Button>
                  {uri && <Text className="mt-2">{uri}</Text>}
                </View>
              ) : null}

              <View className="my-2">
                <TextInput
                  keyboardType="numeric"
                  mode="outlined"
                  label="Precio venta tarro"
                  value={formContainer.price as unknown as string}
                  onChangeText={(value) =>
                    setFormContainer((prev) => ({
                      ...prev,
                      price: value as unknown as number,
                    }))
                  }
                />
              </View>
              <View className="mt-5">
                <Text variant="bodyLarge" className="mb-4">
                  Comentarios
                </Text>
                <TextInput
                  mode="outlined"
                  multiline
                  textAlignVertical="top"
                  style={{ height: 120 }}
                  value={formContainer.comments}
                  onChangeText={(value) =>
                    setFormContainer((prev) => ({
                      ...prev,
                      comments: value,
                    }))
                  }
                />
              </View>
            </View>
            <View className="flex-row justify-center mt-16">
              <Button
                onPress={handleSubmit}
                loading={loading}
                mode="contained"
                icon="briefcase-plus"
                contentStyle={{
                  flexDirection: 'row-reverse',
                  backgroundColor: '#113664',
                }}
                style={{ backgroundColor: '#113664' }}
                className="py-2 px-4"
              >
                Guardar trabajo
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      {showCamera && renderCamera()}
      {succces && (
        <View style={styles.lottie}>
          <LottieView
            source={require('../../assets/succes.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => {
              {
                setSuccces(false);
                router.push('/(tabs)/work-done');
              }
            }}
            style={{ width: 300, height: 300 }}
          />
        </View>
      )}
    </View>
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
    marginTop: 12,
    margin: 32,
    gap: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cameraContainer: {
    position: 'absolute',
    top: 48,
    right: 0,
    bottom: 0,
    left: 0,
  },
  camera: StyleSheet.absoluteFillObject,
  shutterBtn: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 45,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  lottie: {
    position: 'absolute',
    bottom: '30%',
    right: '15%',
  },
});
