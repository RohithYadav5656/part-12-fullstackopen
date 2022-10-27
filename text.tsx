import { Link } from "react-router-dom"
import styled from "styled-components"

export const CenteredTextH1 = styled.h1`
    text-align: center;
`

export const WidgetHeader = styled.h2`
    margin: 0px 0px 20px 0px;
`

export const ColoredLink = styled(Link)`
    color: ${props => props.theme.colors.link}; 
    :visited {
        color: ${props => props.theme.colors.link}; 
    }
    text-decoration: none;
`

export const ColoredAnchor = styled.a`
    color: ${props => props.theme.colors.link}; 
    :visited {
        color: ${props => props.theme.colors.link}; 
    }
    text-decoration: none;
`