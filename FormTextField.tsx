import React from 'react'
import styled from 'styled-components'
import { Input } from '../Input'
import { FormErrorNotification } from './FormErrorNotification'

export interface FormTextFieldProps {
    label?: string | undefined;
    labelAsPlaceholder?: boolean | undefined;
    placeholder?: string | undefined;
    error?: string | undefined;
    onChange?: (newValue: string) => void;
    value?: string | undefined;
    type?: React.HTMLInputTypeAttribute | undefined;
}

const FormField = styled.div``

export const InputLabel = styled.span`
    display: block;
    margin-bottom: 5px;
`

export const FormFieldContainer = styled.div`
    margin-bottom: 15px;
`

export const FormTextField = (props: FormTextFieldProps) => {
    return (
        <FormFieldContainer>
            <FormField>
                {props.label && <InputLabel>{props.label}</InputLabel>}
                <Input 
                    type={props.type || "text"}
                    placeholder={(props.labelAsPlaceholder ? props.label : props.placeholder) || ""} 
                    onChange={props.onChange ? (e => props.onChange!(e.target.value)) : undefined} 
                    hasErrors={Boolean(props.error)} 
                    value={props.value}/>
            </FormField>
            <FormErrorNotification error={props.error} />
        </FormFieldContainer>
    )
}
