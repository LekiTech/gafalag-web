import React, { useState } from 'react';
import styled from "styled-components";
import images from '@/store/images';
import { useTranslation } from 'react-i18next';

import DictionaryAPI from '@/store/dictionary/dictionary.api';

function SearchBar() {
  const { t } = useTranslation();
  
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
  const [expression, setExpression] = useState('');
  const searchExpression = () => {
    DictionaryAPI.search(expression).then(data => console.log(data));
  }
  return (
		<div style={{width: '100%', height: '45px', display: 'flex', marginTop: '70px'}}>
			<div className="search-input">
				<SearchInput type="search" value={expression} onChange={(e) => setExpression(e.target.value)} />
			</div>
			<div className="search-button" onClick={() => searchExpression()}>
				<span>{t('search')}</span>
			</div>
		</div>
  );
}

export default SearchBar;
