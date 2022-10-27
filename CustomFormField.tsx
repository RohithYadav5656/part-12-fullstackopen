import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { FormErrorNotification } from './FormErrorNotification'

export interface CustomFormFieldProps {
    label?: string | undefined;
    error?: string | undefined;
}

const FormField = styled.div``

export const InputLabel = styled.span`
    display: block;
    margin-bottom: 5px;
`

export const FormFieldContainer = styled.div`
    margin-bottom: 15px;
`

export const CustomFormField: FunctionComponent<CustomFormFieldProps> = (props) => {
    return (
        <FormFieldContainer>
            <FormField>
                {props.label && <InputLabel>{props.label}</InputLabel>}
                {props.children}
            </FormField>
            <FormErrorNotification error={props.error} />
        </FormFieldContainer>
    )
}
