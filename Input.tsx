import styled from "styled-components";

export interface InputProps {
    hasErrors?: boolean | undefined;
}

export const Input = styled.input<InputProps>`
    border: none;
    ${props => props.hasErrors && ("outline-color: " + props.theme.colors.formErrorNotification)};
    padding: 10px;
    width: 100%;
    transition: 80ms;
    background-color: ${props => props.hasErrors ? props.theme.colors.formErrorBackground : "#f8f8f85c"};
    -webkit-box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.18); 
    box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.18);
`