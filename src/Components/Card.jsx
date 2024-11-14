import React from 'react';
import Array from './Array';
import settingIcon from '../images/seting-icon.png';
import bag from '../images/bag.png';
import { useTranslation } from "react-i18next";

function Card() {
  const { t } = useTranslation(); // useTranslation inside the function
  
  // Check if translation is working
  console.log(t('Products')); // Should log the translated text for "Products"

  const arr = [
    {
      imageUrl: bag,
      text: t('Products'),
      navigate: '/edit-product',
    },
    {
      imageUrl: settingIcon,
      text: t('Manage Order'),
      navigate: '/home/order'
    },
    {
      imageUrl: bag,
      text: t("Services"),
      navigate: '/home/services'
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '430px'
      }}
    >
      <div
        style={{
          width: '34%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: "center"
        }}
      >
        {arr.map((x, index) => (
          <Array key={index} prp={x.imageUrl} text={x.text} path={x.navigate} />
        ))}
      </div>
    </div>
  );
}

export default Card;
