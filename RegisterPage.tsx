import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CenteredTextH1, ColoredLink } from './components/styled/text'
import { AuthDialogContainer, FlexWidthHeight100Centered } from './components/styled/containers'
import { User } from './type'
import { Button } from './components/Button'
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import { FormTextField } from './components/forms/FormTextField'

const RegistrationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
})

export interface RegisterPageProps {
    showNotification: (message: string, level: "success" | "error" | "warning" | "info" | undefined) => void;
}

export const RegisterPage = (props: RegisterPageProps) => {
    const navigate = useNavigate();

    const onRegister = async (username: string, password: string) => {
        axios.post<User>("user/register", { username, password })
            .then(response => {
                props.showNotification("Registered successfully!", "success");
                navigate("/login");
            }).catch((error) => {
                if (error.response.status === 409) {
                    props.showNotification("A user with that username already exists. Did you mean to log in?", "error");
                } else {
                    props.showNotification("An error occurred", "error");
                }
            })
    }

    return <FlexWidthHeight100Centered>
        <AuthDialogContainer>
            <CenteredTextH1>Register</CenteredTextH1>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={RegistrationSchema}
                onSubmit={values => onRegister(values.username, values.password)} >
                {({ errors, values, setFieldValue, isValid }) =>
                    <Form>
                        <FormTextField
                            labelAsPlaceholder
                            label="Username"
                            onChange={newText => setFieldValue("username", newText)}
                            error={errors.username}
                            value={values.username}
                        />
                        <FormTextField
                            labelAsPlaceholder
                            label="Password"
                            type="password"
                            onChange={newText => setFieldValue("password", newText)}
                            error={errors.password}
                            value={values.password}
                        />
                        <Button type="submit" colorUsage="primary" disabled={!isValid}>Register</Button>
                    </Form>
                }
            </Formik>
            <p>Already have an account? <ColoredLink to="/login">Log in!</ColoredLink></p>
        </AuthDialogContainer>
    </FlexWidthHeight100Centered>
}
