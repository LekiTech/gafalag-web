import React, { useEffect, useState } from 'react';
import images from '@/store/images';
import '@/i18n';

import DictionaryAPI from '@/store/dictionary/dictionary.api';

import SearchBar from '@/components/SearchBar';
import Menu from '@/components/Menu';
import { isMobile } from '@/responsiveUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DictionaryReduxState, ExpressionDto, Paginated } from '@/store/dictionary/dictionary.type';
import Expression from '@/components/Expression';
import { cyrb53Hash } from '@/utils';
import RoutesPaths from '@/RoutesPaths';
import { SearchParams } from '@/store/dictionary/dictionary.enum';
import { usePerformSearch } from '@/customHooks/usePerformSearch';
import { useSelector } from 'react-redux';

function getLastPage(data: Paginated<ExpressionDto>): string {
  return data.totalPages + '';
}

function getCurrentPage(data: Paginated<ExpressionDto>): string {
  return (data.currentPage + 1).toString();
}

function getPreviousPages(data: Paginated<ExpressionDto>, amount = 2): string[] {
  // use just `- i` because pagination pages start from 0
  // so `data.currentPage` is already a previous page value for UI page number
  return [...new Array(amount)]
    .map((_, i) => (data.currentPage - i))
    .filter(p => p > 0)
    .map(p => p.toString())
    .reverse();
}

function getNextPages(data: Paginated<ExpressionDto>, amount = 2): string[] {
  // use just `+ 2` because pagination pages start from 0
  // `data.currentPage` is already a previous page value for UI page number
  // to get current UI page number we need `+ 1` and for the next one `+ 2`
  return [...new Array(amount)]
    .map((_, i) => (data.currentPage + 2 + i))
    .filter(p => p < data.totalPages)
    .map(p => p.toString());
}

function DictionaryPages() {
  const isMobileDevice = isMobile();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState({} as Paginated<ExpressionDto>);
  const fromLang = searchQuery.get(SearchParams.fromLang);
  const page = searchQuery.get(SearchParams.page) ?? '1';
  const performSearch = usePerformSearch();
  const dictionary = useSelector((state: any): DictionaryReduxState => state.dictionary);

  const goToPage = (selectedPage: string) => {
    searchQuery.set(SearchParams.page, selectedPage);
    setSearchQuery(searchQuery);
  }

  useEffect(() => {
    const intPage = parseInt(page) ?? 1;
    if (intPage < 1) {
      goToPage('1');      
    }
    if (fromLang != undefined && fromLang.length > 0) {
      DictionaryAPI.getPaginatedData({
        page: intPage - 1,
        size: 10,
        lang: fromLang,
      }).then(data => setResult(data))
    }
  }, [fromLang, page]);

  useEffect(() => {
    if (result?.totalPages < result?.currentPage) {
      goToPage(lastPageNumber);
    } else if (result?.currentPage < 0) {
      goToPage('1');
    }
    window.scrollTo(0, 0);
  }, [result]);

  // console.log(result);
  const cssStyles = styles(isMobileDevice);

  const currentPageNumber =  getCurrentPage(result);
  const previousPageNumbers = getPreviousPages(result);
  const nextPageNumbers = getNextPages(result);
  const lastPageNumber = getLastPage(result);


  // console.log(previousPageNumbers, currentPageNumber, nextPageNumbers, lastPageNumber);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100vw', minHeight: '100vh'}}>
      <Menu />
      <div style={cssStyles.searchContainer}>
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
        <SearchBar 
          performSearch={performSearch}
          fromLang={dictionary.fromLang}
          toLang={dictionary.toLang}
          isMobile={isMobileDevice}
          style={{ width: isMobileDevice ? 'fit-content' : '60vw', marginTop: isMobileDevice ? '30px' : '70px'}} 
        />
      </div>
      <div style={{paddingLeft: '5vw', width: '80vw', margin: '50px 0'}}>
        {result?.items?.map((exp, i) => <Expression expression={exp} key={cyrb53Hash(exp.spelling + '_' + i)} />)}
      </div>
      <div style={cssStyles.pagesWrapper}>
        {!previousPageNumbers.includes('1') &&
          currentPageNumber != '1' &&
          <>
            <span onClick={() => goToPage('1')} style={{...cssStyles.pageLink}}>{1}</span>
            {!previousPageNumbers.includes('2') &&
              <span style={{...cssStyles.pageLink, cursor: 'auto'}}>...</span>
            }
          </>
        }
        {previousPageNumbers.length > 0 &&
          previousPageNumbers.map(pn => <span key={pn} onClick={() => goToPage(pn)} style={{...cssStyles.pageLink}}>{pn}</span>)
        }
        <span style={{...cssStyles.pageLink, color: '#C1360B', cursor: 'auto'}}>{currentPageNumber}</span>
        {nextPageNumbers.length > 0 &&
          nextPageNumbers.map(pn => <span key={pn} onClick={() => goToPage(pn)} style={{...cssStyles.pageLink}}>{pn}</span>)
        }
        {nextPageNumbers.length > 0 &&
          !nextPageNumbers.includes((result.totalPages - 1).toString()) &&
          <span style={{...cssStyles.pageLink, cursor: 'auto'}}>...</span>
        }
        {currentPageNumber != lastPageNumber &&
          <span onClick={() => goToPage(lastPageNumber)} style={{...cssStyles.pageLink}}>{lastPageNumber}</span>
        }
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
  pagesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifySelf: 'center',
    marginBottom: '70px',
  },
  pageLink: {
    fontFamily: 'Cairo, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '27px',
    textAlign: 'center',
    margin: '0 5px',
    color: '#0D4949',
    cursor: 'pointer',
    userSelect: 'none',
  }
});

export default DictionaryPages;
