import styled from '@emotion/styled'
import { space, color, layout } from 'styled-system'

// const sx = props => css(props.sx)(props.theme)
// const base = props => css(props.__css)(props.theme)
// const variant = ({ theme, variant, __themeKey = 'variants' }) =>
// 	css(css.get(theme, __themeKey + '.' + variant, css.get(theme, variant)))

export const Box = styled('div', {
	// shouldForwardProp,
})(
	{
		boxSizing: 'border-box',
		margin: 0,
		minWidth: 0,
	},
	space,
	color,
	layout,
	// sx,
	props => props.css
)

export default Box
