import React from 'react';
import '@/i18n';
import './Expression.css';
import { ExpressionDto } from '@/store/dictionary/dictionary.type';
import { DefinitionTextType, definitionToFormatJson } from '@/store/dictionary/utils';
import { cyrb53Hash } from '@/utils';
import { useTranslation } from 'react-i18next';


function FormattedDefinitionText(props: {definition: string}) {
	const { definition } = props;
	return (
		<>
			{definitionToFormatJson(definition).map((textObj, i) => {
				switch (textObj.type) {
					case DefinitionTextType.TAG:
						return (
							<span key={cyrb53Hash(textObj.text) + '_' + i} style={{fontWeight: 'bold'}}>
									{textObj.text}
							</span>);
					case DefinitionTextType.EXAMPLE:
						return (
							<span key={cyrb53Hash(textObj.text) + '_' + i} style={{fontStyle: 'italic', color: '#6C6C6C'}}>
								{textObj.text}
							</span>);
					default:
						return (
							<span key={cyrb53Hash(textObj.text) + '_' + i}>
								{textObj.text}
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

function Expression(props: {expression: ExpressionDto}) {
	const { expression } = props;
  const { t } = useTranslation();
  // const isMobileDevice = isMobile();
  return (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <div>
				{/* media buttons */}
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
				<div className="expression_info_block">
					<span className="info_row">{t('language')}: <span>{getDynamicLanguageTranslation(t, expression.languageId)}</span></span>
					<span className="info_row">{t('dialect')}: <span>-</span></span>
				</div>
				{
					expression.definitions.map(def => (
						<div className="expression_info_block" key={cyrb53Hash(def.text)}>
							<span className="info_row">{t('source')}: <span>{def.sourceId}</span></span>
							<span className="info_row">{t('language')}: <span>{getDynamicLanguageTranslation(t, def.languageId)}</span></span>
							<span className="definition"><FormattedDefinitionText definition={def.text} /></span>
						</div>
					))
				}
			</div>
    </div>
  );
}

export default Expression;
