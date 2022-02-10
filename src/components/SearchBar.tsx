import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import images from '@/store/images';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';

import './SearchBar.css';
import RoutesPaths from '@/RoutesPaths';
import { SearchParams } from '@/store/dictionary/dictionary.enum';
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

function SearchBar(props: {expression?: string; style?: React.CSSProperties}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const setExpressionSearchQuery = (expression: string) => setSearchQuery(new URLSearchParams({[SearchParams.expression]: expression}));
  const navigate = useNavigate();
  const location = useLocation();

  const [expression, setExpression] = useState(props.expression ??  '');
  const [suggestions, setSuggestions] = useState([] as string[]);
  const [isSearchInputFocussed, setIsSearchInputFocussed] = useState(false);

  useEffect(() => {
    setExpression(props.expression ??  '');
    setSuggestions([]);
  }, [props.expression]);

  const onFieldInput = (event: any) => {
		const fieldElement = event.target;
		setExpression(fieldElement.value);
    DictionaryAPI.searchSuggestions(fieldElement.value).then(data => setSuggestions(data));
	};

  const performSearch = (expression: string) => {
    console.log('performSearch', expression)
    if (expression == undefined || expression.length === 0) {
      return;
    }
    if (location.pathname === RoutesPaths.Search) {
      setExpressionSearchQuery(expression);
    } else {
      navigate({
        pathname: RoutesPaths.Search, 
        search: `?${createSearchParams({expression})}`,
      });
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
  
  return (
		<div style={{width: '100%', display: 'flex', ...props.style}}>
			<div className="search-input">
				<SearchInput
          key="searchBar"
          type="search"
          value={expression}
          onInput={onFieldInput}
          onKeyDown={(event) => handleEnter(event, expression)}
          onFocus={() => setIsSearchInputFocussed(true)}
          onBlur={() => setIsSearchInputFocussed(false)}
        />
        {isSearchInputFocussed && suggestions && suggestions.length > 0 && // isSearchInputFocussed && 
          <div className="suggestions-container">
            {suggestions.map((sug, i) =>  (
              // onMouseDown fires before onBlur
              <span key={cyrb53Hash(sug) + '_' + i} onMouseDown={() => onSuggestionClick(sug)}>{sug}</span>
            ))}
          </div>
        }
			</div>
			<div className="search-button" onClick={() => performSearch(expression)}>
				<span>{t('search')}</span>
			</div>
		</div>
  );
}

export default SearchBar;
