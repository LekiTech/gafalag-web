import { Language } from '@/store/app/app.enum';
import images from '@/store/images';
import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from '@/responsiveUtils';
import RoutesPaths from '@/RoutesPaths';
import { createSearchParams, useNavigate } from 'react-router-dom';

type LanguageDictionaries = {
	iso2: string;
	isExplanatoryAvailable: boolean;
	otherLanguages: {
		iso2: string;
		isAvailable: boolean;
	}[];
}
function createDictionariesForLanguage(dictData: LanguageDictionaries, t: TFunction, goToDictionary: (params: {fromLang: string, toLang?: string}) => void) {

	return (
		<div style={styles.dictBlock} key={dictData.iso2}>
			<span style={styles.dictHeader}>{t(`languages.${dictData.iso2}`)}</span>
			<span style={styles.dictName} className={dictData.isExplanatoryAvailable ? '' : 'non-active'} >{t(`explanatoryDictionary`)}</span>
			{dictData.otherLanguages.map(otherLang => (
				<div 
					style={{...styles.dictName, display: 'flex', flexDirection: 'row', alignItems: 'center'}} 
					className={otherLang.isAvailable ? '' : 'non-active'} 
					key={`${dictData.iso2}_${otherLang.iso2}`}
					onClick={() => otherLang.isAvailable ? goToDictionary({fromLang: dictData.iso2, toLang: otherLang.iso2}) : null}
				>
					<span>{t(`languages.${dictData.iso2}`)}</span>
					<img width={16} height={16} style={{margin: '0 8px'}} src={otherLang.isAvailable ? images.doubleArrowsRed : images.doubleArrowsGrey} />
					<span>{t(`languages.${otherLang.iso2}`)}</span>
				</div>
			))}
		</div>
	);
}

function Dictionaries() {
  const { t } = useTranslation();
	const navigate = useNavigate()
	
  const lez: LanguageDictionaries = {
		iso2: Language.LEZGI,
		isExplanatoryAvailable: false,
		otherLanguages: [
			{ iso2: Language.RUSSIAN, isAvailable: true },
			{ iso2: Language.AZERI, isAvailable: false },
			{ iso2: Language.ENGLISH, isAvailable: false }
		]
	}
	const tab: LanguageDictionaries = {
		iso2: Language.TABASARAN,
		isExplanatoryAvailable: false,
		otherLanguages: [
			{ iso2: Language.RUSSIAN, isAvailable: false },
			{ iso2: Language.AZERI, isAvailable: false },
			{ iso2: Language.ENGLISH, isAvailable: false }
		]
	}
	
  const isMobileDevice = isMobile();

	const goToDictionary = (params: {fromLang: string, toLang?: string}) => navigate({
		pathname: RoutesPaths.Dictionary, 
		search: `?${createSearchParams(params)}`,
	});

  const widthStyle = isMobileDevice ? {width: 'calc(100% - 30px)', margin: '15px 0'} : {width: '100%'};
  return (
    <div style={styles.container}>
      <div style={{...styles.titleBlock, ...widthStyle}}>
				<span>{t('dictionaries')}</span>
			</div>
			<div style={styles.contentBlock}>
				<div style={isMobileDevice ? styles.contentColumn : styles.contentRow}>
					{createDictionariesForLanguage(lez, t, goToDictionary)}
					{createDictionariesForLanguage(tab, t, goToDictionary)}
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
		marginTop: '100px'
  },
  titleBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

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
		margin: '40px 0',
	},
	dictBlock: {
		display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
		marginBottom: '20px',
	},
	dictHeader: {
		fontFamily: 'Poppins, sans-serif',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '32px',
		color: '#343643',
		marginBottom: '10px',
	},
	dictName: {
		fontFamily: 'Poppins, sans-serif',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '16px',
		color: '#C1360B',
		marginBottom: '10px',
		cursor: 'pointer',
	}
}

export default Dictionaries;
