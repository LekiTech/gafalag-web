import React from 'react';
import '@/i18n';
import './Expression.css';
import { ExpressionDto } from '@/store/dictionary/dictionary.type';
import { DefinitionTextType, definitionToFormatJson } from '@/store/dictionary/utils';
import { cyrb53Hash } from '@/utils';


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


function Expression(props: {expression: ExpressionDto}) {
	const { expression } = props;
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
					<span className="info_row">lang: <span>{expression.languageId}</span></span>
					<span className="info_row">dialect: <span>-</span></span>
				</div>
				{
					expression.definitions.map(def => (
						<div className="expression_info_block" key={cyrb53Hash(def.text)}>
							<span className="info_row">source: <span>{def.sourceId}</span></span>
							<span className="info_row">lang: <span>{def.languageId}</span></span>
							<span className="definition"><FormattedDefinitionText definition={def.text} /></span>
						</div>
					))
				}
			</div>
    </div>
  );
}

const styles = (isMobileDevice: boolean): Record<string, React.CSSProperties> => ({
  searchContainer: {
    display: 'flex',
    height: '160px',
    width: '100vw',
    padding: isMobileDevice ? '0 0 30px 0' : '0 0 30px 30px',
    marginTop: isMobileDevice ? '50px' : 0,
    flexDirection: isMobileDevice ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: isMobileDevice ? 'center' : 'stretch',
    borderBottom: '1px solid #DADCE0',
  },
});

export default Expression;
