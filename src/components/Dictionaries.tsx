import images from '@/store/images';
import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';

type LanguageDictionaries = {
	langIso3: string;
	otherLanguagesIso3: string[];
}
function createDictionariesForLanguage(dictData: LanguageDictionaries, t: TFunction) {

	return (
		<div style={styles.dictBlock}>
			<span style={styles.dictHeader}>{t(`languages.${dictData.langIso3}`)}</span>
			<span style={styles.dictName}>{t(`explanatoryDictionary`)}</span>
			{dictData.otherLanguagesIso3.map(otherIso3Lang => (
				<div style={{...styles.dictName, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
					<span>{t(`languages.${dictData.langIso3}`)}</span>
					<img width={16} height={16} style={{margin: '0 8px'}} src={images.doubleArrows} />
					<span>{t(`languages.${otherIso3Lang}`)}</span>
				</div>
			))}
		</div>
	);
}

function Dictionaries() {
  const { t } = useTranslation();
  const lez: LanguageDictionaries = {
		langIso3: 'lez',
		otherLanguagesIso3: [
			'rus',
			'aze',
			'eng'
		]
	}
	const tab: LanguageDictionaries = {
		langIso3: 'tab',
		otherLanguagesIso3: [
			'rus',
			'aze',
			'eng'
		]
	}
  return (
    <div style={styles.container}>
      <div style={styles.titleBlock}>
				<span>{t('dictionaries')}</span>
			</div>
			<div style={styles.contentBlock}>
				<div style={styles.contentRow}>
					{createDictionariesForLanguage(lez, t)}
					{createDictionariesForLanguage(tab, t)}
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
	},
	contentRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: '0 40px',
	},
	dictBlock: {
		display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
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
