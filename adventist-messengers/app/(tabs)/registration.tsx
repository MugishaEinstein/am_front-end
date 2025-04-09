import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Image, Platform, ImageBackground, Button, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { User } from '@/types/user';
import { UserService } from '@/services/UserServices';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { conferances, Languages, translateFormLabel, unions } from '@/constants/formData';
import { ResponseMessage } from '@/types/ResponseMessage';
import { useNavigation } from 'expo-router';
import { useTranslation } from '@/context/languageContext';

export default function RegistrationForm() {
  const [response,setResponse]=useState<ResponseMessage>({
    data:'',
    message:'',
    status:0,
    showModal:false
  });
  const [user, setUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: 1,
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    country: '',
    region: '',
    city: '',
    zipCode: '',
    division: '',
    union: '',
    conference: '',
    station: '',
    district: '',
    congregation: '',
    preferredLanguage: 'eng',
    hasParticipateInAdventistCommunity: false,
    hasBaptized: false,
    expectTobeBaptise: false
  });
  const t = (label:string) => {
    if (user.preferredLanguage === "en") return label;
    return translateFormLabel.translations[user.preferredLanguage]?.[label] || label;
  };
  const translation=useTranslation();
  useEffect(() => {
    const res=conferenceList();
    console.log(res);
  }
  , [user.union]);
  useEffect(() => {
  }
  , [response]);
  useEffect(
    ()=>{
      translation.update(user.preferredLanguage);
    },[user.preferredLanguage]
  )
  const conferenceList = () => {
    return conferances[user.union];
  };
  const [showDate, setShowDate] = useState(false);
  const onChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate||new Date();
    setUser({ ...user, dateOfBirth: currentDate.toISOString() });
    setShowDate(false);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setUser({ ...user, dateOfBirth: formattedDate });
  };
  const [activePage, setActivePage] = useState(0);
  const saveUserInformationHandler = () => {
    const userService = new UserService();
    userService.createUser(user).then((res) => {
      setResponse({data:res.data, message:t('Dear')+' '+res.data+' '+t('Your registration has been successfully submitted'), status:res.status, showModal:true});
    }
    ).catch((err) => {
      alert(err.response.data);
    }
    )
  }
  const navigate=useNavigation();
  const closeModal = () => {
    if(response.status==200){
        setResponse({...response, showModal: false});
        navigate.navigate('ShareableLinks');
    }else{
      setResponse({...response, showModal: false});
    }
  }
  return (
    <ScrollView className={'bg-white'}>
      {/* Logo and Header */}
      <Modal visible={response.showModal} transparent={true} className='bg-slate-500 ' animationType='slide'>
        <View className='w-screen h-screen bg-black/50 flex-1 justify-center items-center '>
          <View className='bg-white rounded-lg shadow-lg p-5 max-w-[80%]'>
            <View className='p-5'>
            {response.status==200?<Image
              source={require('@/assets/images/check-mark.png')}
              className={'h-16 w-16 m-auto '}
              resizeMode="contain"
            />:<Image
            source={require('@/assets/images/fail.png')}
            className={'h-16 w-16 m-auto '}
            resizeMode="contain"
          />}
            </View>
            <Text className='text-black text-center py-6 m-auto'>
              {response.message}
            </Text>
            <Pressable className='bg-red-600 px-10 py-3 rounded-full mt-4' onPress={() => closeModal()}>      
            <Text className='text-center text-white font-extrabold text-lg'>{t('close')}</Text>
          </Pressable>
          </View>
        </View>
      </Modal>
      <View className='w-full h-auto bg-gradient-to-b from-[#a3d3ee] to-[#3c82b5] items-center pt-16 pb-10 rounded-b-[50px] absolute  z-50'>
        <View className='w-full'>
          <Image
            source={require('@/assets/images/logo.png')}
            className={'h-16 w-16 mx-4'}
            resizeMode="contain"
          />
          <Text className='text-black font-bold text-center text-3xl max-w-[90%]  m-auto'>
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

      {activePage == 0 && <View className='p-3'>
      
        <Text className='text-black font-bold max-w-[90%] text-center mt-4 m-auto text-2xl py-3'>
          {t("Add your name to the Adventist Messenger's Ministry List!")}
        </Text>
          <Text>{t('Preferred Language')}</Text>
        <View className='border p-0 mb-4 rounded'>
          <Picker className='border rounded border-black'
            selectedValue={user.gender}
            onValueChange={(itemValue) => setUser({...user,preferredLanguage:itemValue})}
          >
            {Languages.map((result:any)=><Picker.Item key={result.label} label={result.label} value={result.value}/>)}
          </Picker>
        </View>
        <Text>{t('First Name')}</Text>
        <TextInput
          placeholder={t('First Name')}
          value={user.firstName}
          onChangeText={(text) => setUser({ ...user, firstName: text })}
          className={'border p-3 rounded mb-4'}
        />
        <Text>{t('Middle Name (optional)')}</Text>
        <TextInput placeholder={t("Middle Name (optional)")} onChangeText={txt => setUser({ ...user, middleName: txt })} className={'border p-3 rounded mb-4'} />
        
        <Text>{t('Last Name')}</Text>
        <TextInput placeholder={t("Last Name")} onChangeText={(text) => setUser({ ...user, lastName: text })} className={'border p-3 rounded mb-4'} />
       
      <Text>{t('Gender')}</Text>
        <View className='border p-0 mb-4 rounded'>
          <Picker className='border rounded border-black'
            selectedValue={user.gender} placeholder='Select Gender'
            onValueChange={(itemValue) => setUser({ ...user, gender: itemValue })}
          >
            <Picker.Item label="Male" value={1} />
            <Picker.Item label="Female" value={0} />
          </Picker>
        </View>

        <View>


        </View>
        <Pressable onPress={() => setShowDate(true)} className={'border p-3 rounded mb-4 flex-row justify-between'}>
          <Text>{t('Date of Birth')}*</Text>
          <Text>{user.dateOfBirth}</Text>
        </Pressable>
        {showDate && (
          <DateTimePicker
            value={user.dateOfBirth ? new Date(user.dateOfBirth) : new Date()}
            onChange={onChange}
            mode="date"
            display="default"
            onTouchCancel={() => setShowDate(false)}
          />
        )}
        <Text>{t("Mobile Number")}</Text>
        <TextInput placeholder={t("Mobile Number")} onChangeText={(text) => setUser({ ...user, phoneNumber: text })} className={'border p-3 rounded mb-4'} />
        
        <Text>{t('Email Address (optional)')}</Text>
        <TextInput placeholder={t("Email Address (optional)")} onChangeText={(text) => setUser({ ...user, email: text })} className={'border p-3 rounded mb-4'} />

        <Pressable className={'bg-blue-600 py-3 rounded'} onPress={() => setActivePage(1)}>
          <Text className={'text-white text-center font-bold'}>Next page</Text>
        </Pressable>
      </View>}
      {activePage == 1 && <View className='p-3'>
        <Text className='text-black font-bold max-w-[90%] text-center mt-4 m-auto text-2xl py-3'>{t("Location and membership")}</Text>
        <Text>{t('Country')}</Text>
        <TextInput placeholder={t("Country")} onChangeText={txt=>setUser({...user,country:txt})} className={'border p-3 rounded mb-4'} />
        
        <Text>{t('Region')}</Text>
        <TextInput placeholder={t("Region")} onChangeText={txt=>setUser({...user,region:txt})} className={'border p-3 rounded mb-4'} />
        
        <Text>{t('City')}</Text>
        <TextInput placeholder={t("City")} onChangeText={txt=>setUser({...user,city:txt})} className={'border p-3 rounded mb-4'} />
        
        <Text>{t('ZIP')}</Text>
        <TextInput placeholder={t("ZIP")} onChangeText={txt=>setUser({...user,zipCode:txt})} className={'border p-3 rounded mb-4'} />
        
        <Text>{t("Division")} </Text>
        <TextInput value='East-Central Africa Division'  editable={false} className={'border p-3 rounded mb-4'} />
        
        <Text>{t("Union")}</Text>
        <View className='border p-0 mb-4 rounded'>
          <Picker className='border rounded border-black'
            selectedValue={user.gender} placeholder='Select Gender'
            onValueChange={(itemValue) => {setUser({ ...user, union: itemValue });conferenceList()}}
          >
            {unions["East-Central Africa Division"].map(data=><Picker.Item key={data.label} label={data.label} value={data.value}/>)}
          </Picker>
        </View>
       
      {conferenceList()!=undefined&& <View>
        <Text>{t("Conference")}</Text>
       <View className='border p-0 mb-4 rounded'>
          <Picker className='border rounded border-black'
            selectedValue={user.gender}
            onValueChange={(itemValue) => setUser({ ...user, conference: itemValue })}
          >
            {conferenceList().map((result:any)=><Picker.Item key={result.label} label={result.label} value={result.value}/>)}
          </Picker>
        </View>
       </View>}

       <Text>{t('Are you a regular participant in the Adventist community?')}</Text>
       <View className='border p-0 mb-4 rounded'>
          <Picker className='border rounded border-black'
            selectedValue={user.gender}
            onValueChange={(itemValue) => setUser({ ...user, hasParticipateInAdventistCommunity: itemValue as any })}
          >
            <Picker.Item label={t("Yes")} value={true} />
            <Picker.Item label={t('No')} value={false} />
          </Picker>
        </View>

  <Text>{t('Are you already baptized as a regular member of the Adventist Church?')}</Text>
  <View className='border p-0 mb-4 rounded'>
          <Picker className='border rounded border-black'
            selectedValue={user.gender}
            onValueChange={(itemValue) => setUser({ ...user, hasBaptized: itemValue as any  })}
          >
            <Picker.Item label={t("Yes")} value={true} />
            <Picker.Item label={t('No')} value={false} />
          </Picker>
        </View>
        <Text>{t('If not, do you expect to be baptized in the future?')}</Text>
        
        <View className='border p-0 mb-4 rounded'>
          <Picker className='border rounded border-black'
            selectedValue={user.gender} 
            onValueChange={(itemValue) => setUser({ ...user, expectTobeBaptise: itemValue as any })}
          >
            <Picker.Item label={t("Yes")} value={true} />
            <Picker.Item label={t('No')} value={false}/>
          </Picker>
        </View>

        <View className='flex flex-row justify-between'>
          <Pressable className={'bg-blue-600 py-3 rounded'} onPress={() => setActivePage(0)}>
            <Text className={'text-white text-center font-bold px-3'}>previous</Text>
          </Pressable>
          <Pressable className={'bg-blue-600 py-3 rounded px-2'} onPress={saveUserInformationHandler}>
            <Text className={'text-white text-center font-bold'}>{t("Submit")}</Text>
          </Pressable>
        </View>
      </View>}
    </ScrollView>
  );
}
