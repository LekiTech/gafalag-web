import React from 'react';
import styled from "styled-components";
import images from '@/store/images';
import { useTranslation } from 'react-i18next';

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

  return (
		<div style={{minWidth: '600px', height: '45px', display: 'flex', marginTop: '70px'}}>
			<div className="searchInput">
				<SearchInput type="search" />
			</div>
			<div className="searchButton">
				<span>{t('search')}</span>
			</div>
		</div>
  );
}

export default SearchBar;
