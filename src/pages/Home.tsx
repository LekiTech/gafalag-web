import React from 'react';
import images from '@/store/images';
import '@/i18n';

import SearchBar from '@/components/SearchBar';
import Menu from '@/components/Menu';
import Dictionaries from '@/components/Dictionaries';
import { isMobile } from '@/responsiveUtils';


function Home() {
  const isMobileDevice = isMobile();
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Menu />
      <div style={{display: 'flex', flexDirection: 'column', margin: '100px 0',  alignItems: 'center', justifyContent: 'center', minWidth: isMobileDevice ? '80vw' : '700px'}}>
        <img src={images.logo} className="App-logo" alt="logo" style={{ height: 'auto', width: isMobileDevice ? '40vw' : '372px', minWidth: '140px' }} />
        <SearchBar style={{marginTop: isMobileDevice ? '7vw' : '70px'}} />
        <Dictionaries />
      </div>
    </div>
  );
}

export default Home;
