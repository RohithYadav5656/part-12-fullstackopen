import { useEffect } from 'react';
import { To, useNavigate } from 'react-router'

export interface RedirectProps {
    to: To;
}

export const Redirect = (props: RedirectProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(props.to)
    }, [navigate, props.to])
    return null;
}
