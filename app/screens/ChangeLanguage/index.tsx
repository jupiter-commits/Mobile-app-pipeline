import React from 'react';
import {Dismiss, Header, Language, Screen} from '../../components';

export const ChangeLanguage = () => {
  return (
    <Screen>
      <Dismiss />
      <Header summaryKey="selectLng" titleKey="lngTip" />
      <Language />
    </Screen>
  );
};
