import React from 'react';
import CenterBox from '../center-box';
import wheel from '../../assets/img/wheel.svg';
import './loading.styles.css';


function Loading() {
  return (
    <CenterBox overflow='hidden'>
      <img src={wheel} alt='wheel' className='td-spinner' />
    </CenterBox>
  );
}

export default Loading;