import React from 'react';
import Array from './array'; // Assuming the file is named Array.jsx
import settingIcon from '../images/seting-icon.png';
import bag from '../images/bag.png';

function Card() {
  const arr = [
    {
      imageUrl: settingIcon,
      text: 'product/services',
      navigate: '/edit-product',
    },
    {
      imageUrl: bag,
      text: 'Manage Order',
      navigate:'/home/order'
    },
    {
      imageUrl: bag,
      text: 'Services',
      navigate:'/home/services'
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth:'430px'
      }}
    >
      <div
        style={{
          
          width: '33%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems:"center"
       
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
