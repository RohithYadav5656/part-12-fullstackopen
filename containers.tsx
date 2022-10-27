import styled from "styled-components"

export const FlexWidthHeight100Centered = styled.div`
    display: flex;
    width: 100%;
    min-height: 100%;
    justify-content: center;
    align-self: center;
`

export const ShadowedRoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.foreground};
    padding: 30px;
    border-radius: 10px;
    box-shadow: 5px 5px 0px 2px #0000004A;
`
export const AuthDialogContainer = styled(ShadowedRoundContainer)`
    width: 400px;
`

export const WidgetContainer = styled(ShadowedRoundContainer)`
    min-width: 400px;
    margin: 30px;
`

export const DashboardContainer = styled(FlexWidthHeight100Centered)`
    flex-wrap: wrap;
`