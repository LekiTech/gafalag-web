import { Language } from '@/store/app/app.enum';
import images from '@/store/images';
import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from '@/responsiveUtils';
import { DictionaryReduxState, Source } from '@/store/dictionary/dictionary.type';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Link = styled.a`
{
	font-family: 'Poppins', sans-serif;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	color: #0D4949;
	margin-bottom: 10px;
}
&:visited {
	font-family: 'Poppins', sans-serif;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	color: #C1360B;
	margin-bottom: 10px;
}
`;

function Sources() {
  const { t } = useTranslation();
	const dict = useSelector((state: any): DictionaryReduxState => state.dictionary);
	const sources = dict.sources ? Object.values(dict.sources) : [];

	const isMobileDevice = isMobile();

  return (
    <div style={styles.container}>
      <div style={styles.titleBlock}>
				<span>{t('sources')}</span>
			</div>
			<div style={styles.contentBlock}>
				<div style={isMobileDevice ? styles.contentColumn : styles.contentRow}>
					{sources.map(source => {
						if (source.url) {
							return (<Link key={source.id} href={source.url} target="_blank" >{source.name}</Link>);
						}
						return (<Link key={source.id}>{source.name}</Link>);
					})}
				</div>
			</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
		width: '100%',
  },
  titleBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
		width: '100%',

    padding: '20px 0',
    borderBottomColor: '#0D4949',
		borderBottomStyle: 'solid',
		borderBottomWidth: '3px',
    
    fontFamily: 'Cairo, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#343643',
  },
	contentBlock: {
		display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
		width: '100%',
		margin: '15px 0',
		paddingTop: '15px',
	},
	contentRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: '0 40px',
	},
	contentColumn: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '20px',
	},
	link: {
		fontFamily: 'Poppins, sans-serif',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '16px',
		color: '#C1360B',
		marginBottom: '10px',
		cursor: 'pointer',
	}
}

export default Sources;
