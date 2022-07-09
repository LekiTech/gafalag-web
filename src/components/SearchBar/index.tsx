import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import images from '@/store/images';
import { useTranslation } from 'react-i18next';;

import './styles.css';
import DictionaryAPI from '@/store/dictionary/dictionary.api';
import { cyrb53Hash } from '@/utils';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Language } from '@/store/app/app.enum';
import { useDispatch, useSelector } from 'react-redux';
import { DictionaryReduxState } from '@/store/dictionary/dictionary.type';
import { DictionaryActions, SupportedLanguages } from '@/store/dictionary/dictionary.module';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';


// Define otside of function component to prevent rerender on value change
const SearchInput = styled.input`
&::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  padding-right: 15px;
  background: url("${images.cross}") no-repeat 50% 50%;
  background-size: contain;
  pointer-events: all;
  cursor: pointer;
}
`;

// Use memo to prevent superfluous API calls 
const suggestionsMemo: Record<string, string[]> = {};

interface SearchBarProps {
  /**
   * Search query representing (part of) expression from dictionary which was previously filled in
   */ 
  preFillExpression?: string;
  /**
   * Language of expression user is searching
   */ 
  fromLang: string;
  /**
   * Language of translation(definition) for expression being searched
   */ 
  toLang: string;
  /**
   * A function triggering search query to be executed in the backend, and redirects to the page with search results
   */
  performSearch: (expression: string, fromLang: string, toLang: string) => void;
  /**
   * `true` if website is opened on mobile device
   */
  isMobile: boolean,
  /**
   * Style of SearchBar container
   */
  style?: React.CSSProperties
}

function SearchBar(props: SearchBarProps) {
  const { preFillExpression, fromLang, toLang, performSearch, style, isMobile } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const dictionary = useSelector((state: any): DictionaryReduxState => state.dictionary);

  const [expression, setExpression] = useState(preFillExpression ??  '');
  const [suggestions, setSuggestions] = useState([] as string[]);
  const [isSearchInputFocussed, setIsSearchInputFocussed] = useState(false);

  useEffect(() => {
    setExpression(preFillExpression ??  '');
    setSuggestions([]);
  }, [preFillExpression]);

  const handleFromLangChange = (event: SelectChangeEvent<Language>) => {
    dispatch(DictionaryActions.setFromLang(event.target.value as Language));
  };

  const handleToLangChange = (event: SelectChangeEvent<Language>) => {
    dispatch(DictionaryActions.setToLang(event.target.value as Language));
  };
  
  const onFieldInput = (event: any) => {
		const fieldElement = event.target;
		setExpression(fieldElement.value);
    if (suggestionsMemo[fieldElement.value]) {
      setSuggestions(suggestionsMemo[fieldElement.value]);
    } else if (fieldElement.value && fieldElement.value.trim().length > 0) {
      DictionaryAPI.searchSuggestions(fieldElement.value).then(data => {
        suggestionsMemo[fieldElement.value] = data;
        setSuggestions(data);
      });
    } else {
      setSuggestions([]); 
    }
	};

  const handleEnter = (event: any, expression: string) => {
    if (event.key.toLowerCase() === "enter") {
      performSearch(expression, fromLang, toLang);
    }
  };

  const onSuggestionClick = (suggestion: string) => {
    performSearch(suggestion, fromLang, toLang);
  }

  const showSuggestions = isSearchInputFocussed && suggestions && suggestions.length > 0;

  return (
		<div style={{width: '100%', display: 'flex', boxSizing: 'border-box', flexDirection: 'column'}}>
      <div style={{width: '100%', display: 'flex', boxSizing: 'border-box'}}>
        <div className="search-input" style={{borderBottomLeftRadius: showSuggestions ? '0' : '25px'}}>
          <SearchInput
            key="searchBar"
            type="search"
            value={expression}
            onInput={onFieldInput}
            onKeyDown={(event) => handleEnter(event, expression)}
            onFocus={() => setIsSearchInputFocussed(true)}
            onBlur={() => setIsSearchInputFocussed(false)}
          />
          <div className="suggestions-absolute-wrapper">
            {showSuggestions &&
              <div className="suggestions-container">
                {suggestions.map((sug, i) =>  (
                  // onMouseDown fires before onBlur
                  <span key={cyrb53Hash(sug) + '_' + i} onMouseDown={() => onSuggestionClick(sug)}>{sug}</span>
                ))}
              </div>
            }
          </div>
        </div>
        <div className="search-button" onClick={() => performSearch(expression, fromLang, toLang)}>
          <span>{t('search')}</span>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '30px', marginTop: '5px' }}>
        {/* FIXME: From language select */}
        <Select
          value={dictionary.fromLang}
          onChange={handleFromLangChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          variant="standard"
          disableUnderline
        >
          {
            SupportedLanguages.map(lang =>  <MenuItem value={lang}>{t(`languages.${lang}`)}</MenuItem>)
          }
        </Select>
        <div style={{margin: '0 10px'}}>
          <ArrowRightAlt fontSize="large" />
        </div>
        {/* TODO: To language select: make it multi-select-chip: https://mui.com/material-ui/react-select/#chip */}
        <Select
          value={dictionary.toLang}
          onChange={handleToLangChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          variant="standard"
          disableUnderline
        >
          {
            SupportedLanguages.map(lang =>  <MenuItem value={lang}>{t(`languages.${lang}`)}</MenuItem>)
          }
        </Select>
      </div>
		</div>
  );
}

export default SearchBar;
