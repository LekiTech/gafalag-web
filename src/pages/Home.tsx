import React from 'react';
import images from '@/store/images';
import '@/i18n';

import { DictionaryActions } from '@/store/dictionary/dictionary.module';

import SearchBar from '@/components/SearchBar';
import Menu from '@/components/Menu';
import Dictionaries from '@/components/Dictionaries';
import { isMobile } from '@/responsiveUtils';
import Sources from '@/components/Sources';
import { usePerformSearch } from '@/customHooks/usePerformSearch';
import { useSelector } from 'react-redux';
import { DictionaryReduxState } from '@/store/dictionary/dictionary.type';


function Home() {
  const isMobileDevice = isMobile();
  const performSearch = usePerformSearch();
  const dictionary = useSelector((state: any): DictionaryReduxState => state.dictionary);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
        <Menu />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', margin: '100px 0',  alignItems: 'center', justifyContent: 'center', minWidth: isMobileDevice ? '80vw' : '700px'}}>
        <img src={images.logo} className="App-logo" alt="logo" style={{ height: 'auto', width: isMobileDevice ? '40vw' : '372px', minWidth: '248px', marginBottom: isMobileDevice ? '7vw' : '70px' }} />
        <div style={ isMobileDevice ? {width: 'calc(100% - 30px)', margin: '15px 0'}: { width: '100%' }}>
          <SearchBar 
            performSearch={performSearch}
            // TODO: replace with default app values
            fromLang={dictionary.fromLang}
            // TODO: replace with default app values
            toLang={dictionary.toLang}
            isMobile={isMobileDevice} 
          />
        </div>
        <Dictionaries />
        <Sources />
      </div>
    </div>
  );
}

export default Home;
