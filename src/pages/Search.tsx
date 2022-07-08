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
import { usePerformSearch } from '@/customHooks/usePerformSearch';


function Search() {
  const isMobileDevice = isMobile();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState([] as ExpressionDto[]);
  const expression = searchQuery.get(SearchParams.expression);
  const performSearch = usePerformSearch();

  useEffect(() => {
      // initial load
    if (expression != undefined && expression.length > 0) {
      DictionaryAPI.search(expression).then(data => setResult(data));
    }
  }, [expression]);
  

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '100vw', minHeight: '100vh'}}>
      <div style={styles(isMobileDevice).searchContainer}>
        <div
          style={styles(isMobileDevice).logoContainer} 
          onClick={() => navigate(RoutesPaths.Home)}
        >
          <img 
            src={images.logo}
            className="App-logo"
            alt="logo"
            style={{ height: isMobileDevice ? '30px' : 'auto', width: isMobileDevice ? 'auto' : '248px'}}
          />
        </div>
        <div style={styles(isMobileDevice).searchBarContainer}>
          <SearchBar 
            preFillExpression={expression ?? ''}
            performSearch={performSearch}
            isMobile={isMobileDevice}
          />
        </div>
        <div style={styles(isMobileDevice).menuContainer}>
          <Menu />
        </div>
      </div>
      <div style={{paddingLeft: '5vw', width: '80vw', margin: '50px 0'}}>
        {result.map((exp, i) => <Expression expression={exp} key={cyrb53Hash(exp.spelling + '_' + i)} />)}
      </div>
    </div>
  );
}

const styles = (isMobileDevice: boolean): Record<string, React.CSSProperties> => ({
  searchContainer: {
    // position: 'absolute',
    // top: 0,
    display: 'flex',
    minHeight: '120px', //'160px',
    width: '100vw',
    paddingBottom: '30px', //isMobileDevice ? '0 0 30px 0' : '0 0 30px 30px',
    paddingTop: isMobileDevice ? '15px' : 0, //'50px' : 0,
    flexDirection: isMobileDevice ? 'column' : 'row',
    alignItems: isMobileDevice ? 'center' : 'flex-end',
    justifyContent: isMobileDevice ? 'flex-start' : 'stretch',
    borderBottom: '1px solid #DADCE0',
  },
  logoContainer: {
    height: 'fit-content',
    width: 'fit-content',
    alignSelf: isMobileDevice ? 'flex-start' : 'unset',
    marginLeft: isMobileDevice ? '15px' : '30px',
    marginRight: isMobileDevice ? 0 : '30px',
    cursor: 'pointer' 
  },
  searchBarContainer: {
    flex: 1,
    // for mobile set width to 100% minus 15px from each side
    width: isMobileDevice ? 'calc(100% - 30px)' : 'unset',
    marginTop: isMobileDevice ? '7vw' : 0,
    maxWidth: '800px',
    marginLeft: isMobileDevice ? '15px' : 'unset',
    marginRight: isMobileDevice ? '15px' : '30px',
  },
  menuContainer: {
    position: 'absolute',
    top: '15px',
    right: '15px'
  }

});

export default Search;
