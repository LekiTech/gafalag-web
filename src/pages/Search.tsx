import React, { useEffect, useState } from 'react';
import images from '@/store/images';
import '@/i18n';

import DictionaryAPI from '@/store/dictionary/dictionary.api';

import SearchBar from '@/components/SearchBar';
import Menu from '@/components/Menu';
import { isMobile } from '@/responsiveUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ExpressionDto } from '@/store/dictionary/dictionary.type';
import Expression from '@/components/Expression';
import { cyrb53Hash } from '@/utils';
import RoutesPaths from '@/RoutesPaths';
import { SearchParams } from '@/store/dictionary/dictionary.enum';


function Search() {
  const isMobileDevice = isMobile();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState([] as ExpressionDto[]);
  const expression = searchQuery.get(SearchParams.expression);

  useEffect(() => {
      // initial load
    if (expression != undefined && expression.length > 0) {
      DictionaryAPI.search(expression).then(data => setResult(data));
    }
  }, [expression]);
  

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100vw', minHeight: '100vh'}}>
      <Menu />
      <div style={styles(isMobileDevice).searchContainer}>
        <div
          style={{ height: 'fit-content', width: 'fit-content', marginRight: isMobileDevice ? 0 : '30px', cursor: 'pointer' }} 
          onClick={() => navigate(RoutesPaths.Home)}
        >
          <img 
            src={images.logo}
            className="App-logo"
            alt="logo"
            style={{ height: 'auto', width: '248px'}}
          />
        </div>
        <SearchBar expression={expression ?? ''} style={{ width: isMobileDevice ? 'fit-content' : '60vw', marginTop: isMobileDevice ? '30px' : '70px'}} />
      </div>
      <div style={{paddingLeft: '5vw', width: '80vw', margin: '50px 0'}}>
        {result.map((exp, i) => <Expression expression={exp} key={cyrb53Hash(exp.spelling + '_' + i)} />)}
      </div>
    </div>
  );
}

const styles = (isMobileDevice: boolean): Record<string, React.CSSProperties> => ({
  searchContainer: {
    display: 'flex',
    height: '160px',
    width: '100vw',
    padding: isMobileDevice ? '0 0 30px 0' : '0 0 30px 30px',
    marginTop: isMobileDevice ? '50px' : 0,
    flexDirection: isMobileDevice ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: isMobileDevice ? 'center' : 'stretch',
    borderBottom: '1px solid #DADCE0',
  },
});

export default Search;
