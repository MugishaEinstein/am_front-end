import { Translation } from "@/types/Translation";
import React, { useEffect } from "react";

const TranslationContext = React.createContext<Translation|undefined>(undefined);
export const useTranslation = () => {
  const context = React.useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
export const TranslationProvider = ({ children }:any) => {
  const [language, setLanguage] = React.useState('en');
  const [refresh, setRefresh] = React.useState(false);
  useEffect(() => {
  }, [refresh,language]);
const translation:Translation={
    encronym:language,
    update: (newLanguage:string) => {
      setLanguage(newLanguage);
      setRefresh(!refresh);
    },
  }
  return (
    <TranslationContext.Provider value={translation}>
      {children}
    </TranslationContext.Provider>
  );
}