import { translateFormLabel } from '@/constants/formData';
import { useTranslation } from '@/context/languageContext';
import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, Text, View, ScrollView, Pressable } from 'react-native';

export default function ShareableLinks() {
  const translate=useTranslation();
    const t = (label:string) => {
      if (translate.encronym === "en") return label;
      return translateFormLabel.translations[translate.encronym]?.[label] || label;
    };
  return (
    <ScrollView className='bg-white'>
      <View className='w-full h-auto bg-gradient-to-b from-[#a3d3ee] to-[#3c82b5] items-center pt-16 pb-10 rounded-b-[50px] absolute  z-50'>
        <View className='w-full'>
          <Image
            source={require('@/assets/images/logo.png')}
            className={'h-16 w-16 mx-4'}
            resizeMode="contain"
          />
          <Text className='text-black font-bold text-center text-3xl max-w-[90%] mt-[-20] m-auto'>
            ECD-Adventist Messengers
          </Text>
        </View>

        <Text className='text-red-700 mt-2 text-lg font-bold'>
          Welcome to ECD-Adventist Messengers
        </Text>
      </View>
      <Image
        source={require('@/assets/images/adventist.png')}
        className={'w-auto h-auto'}
      />
      <View className='text-center '>
        <Text className='text-black font-bold text-lg max-w-[90%] m-auto text-center'>
        {t("Merci de vous être inscrit(e) sur la liste de ministère du Adventist Messengers.")}
        </Text>
      </View>
      <View>

        <View className='p-3 mb-16'>
          <Text className='text-[#E46E06] font-bold max-w-[90%] text-center mt-4 m-auto text-lg py-3'>
            Join our community and platforms
          </Text>
          <View className='gap-2 max-w-[90%] m-auto'>
            <View className='flex-row items-center gap-2 p-2 overflow-hidden rounded-md'>
              <Image source={require('@/assets/images/telegram.png')} className='max-w-[40] max-h-[40]' />
              <Link href={'https://nostr.africa/get-the-app/'} onPress={() => { }} className='flex-1 bg-[#2BB6F6] p-3 rounded-[10px]'>
                <Text className='text-black text-center font-extrabold'>Telegram</Text>
              </Link>
            </View>
            <View className='flex-row items-center gap-2 p-2 overflow-hidden rounded-md'>
              <Image source={require('@/assets/images/youtube.png')} className='max-w-[40] max-h-[40]' />
              <Link href={'https://nostr.africa/get-the-app/'} onPress={() => { }} className='flex-1 bg-[#F90000] p-3 rounded-[10px]'>
                <Text className='text-black text-center font-extrabold'>YouTube</Text>
              </Link>
            </View>
            <View className='flex-row items-center gap-2 p-2 overflow-hidden rounded-md'>
              <Image source={require('@/assets/images/mighty-network.png')} className='max-w-[40] max-h-[40] rounded-full' />
              <Link href={'https://nostr.africa/get-the-app/'} onPress={() => { }} className='flex-1 bg-black p-3 rounded-[10px]'>
                <Text className='text-white text-center font-extrabold'>Mighty Networks</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
