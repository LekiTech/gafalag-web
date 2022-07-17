import React, { useState } from 'react';
import '@/i18n';
import './Expression.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { DictionaryReduxState, ExpressionDto } from '@/store/dictionary/dictionary.type';
import { DefinitionTextType, definitionToFormatJson } from '@/store/dictionary/utils';
import { cyrb53Hash } from '@/utils';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import RoutesPaths from '@/RoutesPaths';


function highLightHtmlText(text: string, stringToHighlight?: string | null) : string | JSX.Element {
  if (stringToHighlight === undefined || stringToHighlight === null) {
    return text;
  }
  return (
    <>
      {text.replaceAll(stringToHighlight, `,${stringToHighlight},`)
        .split(',')
        .map(str => str === stringToHighlight ? (<mark>{str}</mark>) : str)}
    </>
  );
}

function FormattedDefinitionText(props: {definition: string, fromLang: string, toLang: string, highlight?: string | null}) {
	const { definition, fromLang, toLang, highlight } = props;
  console.log('Highlight:', highlight);
  const navigate = useNavigate();
	return (
		<>
			{definitionToFormatJson(definition).map((textObj, i) => {
				switch (textObj.type) {
					case DefinitionTextType.TAG:
						return (
							<span key={cyrb53Hash(textObj.text) + '_' + i} style={{fontWeight: 'bold'}}>
									{highLightHtmlText(textObj.text, highlight)}
							</span>);
					case DefinitionTextType.EXAMPLE:
						return (
							<span 
								key={cyrb53Hash(textObj.text) + '_' + i}
								style={{
									fontStyle: 'italic',
									color: '#0D4949',
									textDecorationLine: 'underline',
									textDecorationStyle: 'dotted',
									textUnderlineOffset: '3px',
									cursor: 'pointer'
								}}
								onClick={() => navigate({
									pathname: RoutesPaths.Search, 
									search: `?${createSearchParams({expression: textObj.text, fromLang, toLang})}`,
								})}
							>
								{highLightHtmlText(textObj.text, highlight)}
							</span>);
					default:
						return (
							<span key={cyrb53Hash(textObj.text) + '_' + i}>
								{highLightHtmlText(textObj.text, highlight)}
							</span>);
				}
			})}
		<br />
		</>
	);
}

function getDynamicLanguageTranslation(t: any, languageId: string) {
	// @ts-ignore
	return t(`languages.${languageId}`);
}

function Expression(props: {expression: ExpressionDto, highlightInDefinition?: string | null}) {
	const { expression, highlightInDefinition } = props;
	const dict = useSelector((state: any): DictionaryReduxState => state.dictionary);
  const { t } = useTranslation();
  const [expandDefinitions, setExpandDefinitions] = useState(true);

  // const isMobileDevice = isMobile();
  return (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #DADCE0'}}>
      <div>
				{/* media buttons */}
        <div 
          style={{display: 'flex',  alignItems: 'center', justifyContent: 'flex-start', width: '30px', height: '30px', cursor: 'pointer'}}
          onClick={() => setExpandDefinitions(!expandDefinitions)}
        >
          {expandDefinitions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </div>
			</div>
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: '20px' }}>
				<span className="expression_spelling">
					{expression.spelling}
					{expression.inflection &&
						<span className="expression_inflection">
							({expression.inflection})
						</span>
					}
				</span>
				{ // FIXME: show this data in a correct way but not in disturbing way for the users
				/* <div className="expression_info_block">
					<span className="info_row">{t('language')}: <span>{getDynamicLanguageTranslation(t, expression.languageId)}</span></span>
					<span className="info_row">{t('dialect')}: <span>-</span></span>
				</div> */}
				<div style={{marginLeft: '0px'}}>
					{ expandDefinitions &&
						expression.definitions.map(def => (
							<div className="expression_info_block" key={cyrb53Hash(def.text)}>
								{/* <span className="info_row">{t('language')}: <span>{getDynamicLanguageTranslation(t, def.languageId)}</span></span> */}
								<span className="definition">
                  <FormattedDefinitionText definition={def.text} fromLang={dict.fromLang} toLang={dict.toLang} highlight={highlightInDefinition} />
                </span>
								{
									dict.sources != undefined && dict.sources[def.sourceId] != undefined &&
									<span className="info_row">{t('source')}: <span>{dict.sources[def.sourceId].name}</span></span>

								}
							</div>
						))
					}
				</div>
			</div>
    </div>
  );
}

export default Expression;
