import { useNavigation } from 'expo-router';
import { Image, StyleSheet, Platform, Text, View, ScrollView, Pressable } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();
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
        <View className={'w-full h-full flex flex-col items-center justify-center mt-[-10%]'}>

           <View className='flex-1 items-center justify-center'>
           <Text className='text-black font-bold text-lg max-w-[90%] text-center'>
            Join over 500K+ Adventists making the 3 Angel’s Messages known in East-Central Africa and around the world!
            </Text>
            <Pressable 
              className='bg-[#F9AE0C] px-10 py-3 rounded-full mt-4'
              onPress={() => navigation.navigate('registration')}
            >
              <Text className='text-black font-bold text-base'>Register</Text>
            </Pressable>
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
