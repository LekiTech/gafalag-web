import React, { useState } from 'react';
import styled from "styled-components";
import images from '@/store/images';
import { useTranslation } from 'react-i18next';
import { useQueryParam } from '@/customHooks';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutesPaths from '@/RoutesPaths';


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
  const [searchQuery, setSearchQuery] = useQueryParam<string>('expression');
  const navigate = useNavigate();
  const location = useLocation();

  const [expression, setExpression] = useState(props.expression ??  '');
  const onFieldInput = (event: any) => {
		const fieldElement = event.target;
		setExpression(fieldElement.value);
	};

  const performSearch = () => {
    if (expression == undefined || expression.length === 0) {
      return;
    }
    if (location.pathname === RoutesPaths.Home) {
      setSearchQuery(expression);
      navigate(RoutesPaths.Search, { state: {expression} });
    } else {
      setSearchQuery(expression);
    }
  };

  const handleEnter = (event: any) => {
    if (event.key.toLowerCase() === "enter") {
      performSearch();
    }
  };

  return (
		<div style={{width: '100%', height: '45px', display: 'flex', ...props.style}}>
			<div className="search-input">
				<SearchInput key="searchBar" type="search" value={expression} onInput={onFieldInput} onKeyDown={handleEnter} />
			</div>
			<div className="search-button" onClick={performSearch}>
				<span>{t('search')}</span>
			</div>
		</div>
  );
}

export default SearchBar;
