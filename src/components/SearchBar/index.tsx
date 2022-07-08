import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import images from '@/store/images';
import { useTranslation } from 'react-i18next';;

import './styles.css';
import DictionaryAPI from '@/store/dictionary/dictionary.api';
import { cyrb53Hash } from '@/utils';


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
   * A function triggering search query to be executed in the backend, and redirects to the page with search results
   */
  performSearch: (expression: string) => void;
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
  const { preFillExpression, performSearch, style } = props;
  const { t } = useTranslation();

  const [expression, setExpression] = useState(preFillExpression ??  '');
  const [suggestions, setSuggestions] = useState([] as string[]);
  const [isSearchInputFocussed, setIsSearchInputFocussed] = useState(false);

  useEffect(() => {
    setExpression(preFillExpression ??  '');
    setSuggestions([]);
  }, [preFillExpression]);

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
      performSearch(expression);
    }
  };

  const onSuggestionClick = (suggestion: string) => {
    performSearch(suggestion);
  }

  const showSuggestions = isSearchInputFocussed && suggestions && suggestions.length > 0;

  return (
		<div style={{width: '100%', display: 'flex', ...style}}>
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
			<div className="search-button" onClick={() => performSearch(expression)}>
				<span>{t('search')}</span>
			</div>
		</div>
  );
}

export default SearchBar;
