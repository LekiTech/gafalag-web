import React, { useEffect, useState } from 'react';
import images from '@/store/images';
import '@/i18n';

import DictionaryAPI from '@/store/dictionary/dictionary.api';

import SearchBar from '@/components/SearchBar';
import Menu from '@/components/Menu';
import Dictionaries from '@/components/Dictionaries';
import { isMobile } from '@/responsiveUtils';
import { useQueryParam } from '@/customHooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ExpressionDto } from '@/store/dictionary/dictionary.type';
import Expression from '@/components/Expression';
import { cyrb53Hash } from '@/utils';
import RoutesPaths from '@/RoutesPaths';


function Search() {
  const isMobileDevice = isMobile();
  const [searchQuery, setSearchQuery] = useQueryParam<string>('expression');
  const location = useLocation();
  const navigate = useNavigate();
  
  const [result, setResult] = useState([] as ExpressionDto[]);
  useEffect(() => {
      // initial load
    const expression: string = location.state?.expression;
    console.log('expression', expression, searchQuery);
    if (expression && expression.length > 0) {
      setSearchQuery(expression);
      DictionaryAPI.search(expression).then(data => setResult(data));
    } else if (searchQuery != undefined && searchQuery.length > 0) {
      DictionaryAPI.search(searchQuery).then(data => setResult(data));
      // navigate('/');
    }
  }, [location.state, searchQuery]);
  
  // DictionaryAPI.search(location.state.expression).then(data => setResult(data));
  //}
  console.log('search query', searchQuery, searchQuery?.length);
  // const resStr = JSON.stringify(result, null, 2);
  // console.log(resStr);
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
        <SearchBar expression={searchQuery ?? location.state.expression} style={{ width: isMobileDevice ? 'fit-content' : '60vw', marginTop: isMobileDevice ? '30px' : '70px'}} />
      </div>
      <div style={{paddingLeft: '5vw', width: '80vw', margin: '50px 0'}}>
        {result.map(exp => <Expression expression={exp} key={cyrb53Hash(exp.spelling)} />)}
      </div>
      {/* <pre>
        {resStr}
      </pre> */}
      {/* 
      <div style={{display: 'flex', flexDirection: 'column', margin: '100px 0',  alignItems: 'center', justifyContent: 'center', minWidth: isMobileDevice ? '80vw' : '700px'}}>
        <img src={images.logo} className="App-logo" alt="logo" style={{ height: 'auto', width: isMobileDevice ? '40vw' : '372px', minWidth: '140px' }} />
        <Dictionaries />
      </div> */}
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
