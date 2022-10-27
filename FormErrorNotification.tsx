import { FormErrorText } from "./FormErrorText";

export interface FormErrorNotificationProps {
    error?: string;
}

export const FormErrorNotification = ({ error }: FormErrorNotificationProps) => {
    if (!error) return null;
    return <FormErrorText>{error}</FormErrorText>
}