/**
 * shamelessly adopted from
 * https://github.com/primer/doctocat/blob/2e4bf5e592bbd1db9c6bbfc44ccf4cb29818e3c7/theme/src/components/live-code.js
 */
import { BorderBox, Flex, Relative, Text } from '@primer/components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import htmlReactParser from 'html-react-parser'
import githubTheme from 'prism-react-renderer/themes/github'
import React from 'react'
import reactElementToJsxString from 'react-element-to-jsx-string'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { ThemeContext } from 'styled-components'

import * as exportedComponents from '.'

const languageTransformers = {
	html: html => htmlToJsx(html),
	jsx: jsx => wrapWithFragment(jsx),
}

function htmlToJsx(html) {
	try {
		const reactElement = htmlReactParser(removeNewlines(html))
		// The output of htmlReactParser could be a single React element
		// or an array of React elements. reactElementToJsxString does not accept arrays
		// so we have to wrap the output in React fragment.
		return reactElementToJsxString(<>{reactElement}</>)
	} catch (error) {
		return wrapWithFragment(html)
	}
}

function removeNewlines(string) {
	return string.replace(/(\r\n|\n|\r)/gm, '')
}

function wrapWithFragment(jsx) {
	return `<React.Fragment>${jsx}</React.Fragment>`
}

function LiveCode({ code, language }) {
	const theme = React.useContext(ThemeContext)

	return (
		<BorderBox as={Flex} flexDirection="column" mb={3}>
			<LiveProvider
				scope={{ ...exportedComponents }}
				code={code}
				transformCode={languageTransformers[language]}
			>
				<LivePreview />
				<Relative>
					<LiveEditor
						ignoreTabKey={true}
						style={{
							fontSize: '85%',
						}}
					/>
				</Relative>
				<Text as={LiveError} m={0} p={3} fontFamily="mono" fontSize={1} color="white" bg="red.5" />
			</LiveProvider>
		</BorderBox>
	)
}

function Code({ className, children, live }) {
	const language = className ? className.replace(/language-/, '') : ''
	const code = children.trim()

	if (live) {
		return <LiveCode code={code} language={language} />
	}

	return (
		<Relative>
			<Highlight {...defaultProps} code={code} language={language} theme={githubTheme}>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<BorderBox
						as="pre"
						className={className}
						mt={0}
						mb={3}
						p={3}
						border={0}
						style={{ ...style, overflow: 'auto' }}
					>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<Text
										key={key}
										fontFamily="mono"
										fontSize={1}
										{...getTokenProps({ token, key })}
									/>
								))}
							</div>
						))}
					</BorderBox>
				)}
			</Highlight>
		</Relative>
	)
}

export default Code
