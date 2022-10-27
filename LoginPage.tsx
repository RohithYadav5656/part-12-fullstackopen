import axios from "axios"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CenteredTextH1, ColoredLink } from "./components/styled/text";
import { AuthDialogContainer, FlexWidthHeight100Centered } from "./components/styled/containers";
import { setUserData } from "./store/actionCreators";
import { LoginToken } from "./type";
import { Button } from "./components/Button";
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { FormTextField } from "./components/forms/FormTextField";

export interface LoginPageProps {
    showNotification: (message: string, level: "success" | "error" | "warning" | "info" | undefined) => void;
}

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
})

export const LoginPage = ({ showNotification }: LoginPageProps) => {
    const [, setCookie] = useCookies(['timed-unlock-token']);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onLogin = async (username: string, password: string) => {
        axios.post<LoginToken>("user/login", { username, password })
            .then(response => {
                const token = response.data.token
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
                setCookie("timed-unlock-token", token, { path: "/" });
                showNotification("Logged in successfully", "success");
                dispatch(setUserData({ username: response.data.username, _id: response.data.id }));
                navigate("/");
            }).catch((error) => {
                console.log(error)
                showNotification("Invalid username or password", "error");
            })
    }

    return <FlexWidthHeight100Centered>
        <AuthDialogContainer>
            <CenteredTextH1>Login</CenteredTextH1>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={values => onLogin(values.username, values.password)} >
                {({ errors, values, setFieldValue, isValid }) => <Form>
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
                    <Button colorUsage="primary" type="submit" disabled={!isValid}>Login</Button>
                </Form>}
            </Formik>

            <p>Don't have an account yet? <ColoredLink to="/register">Register now!</ColoredLink></p>
        </AuthDialogContainer>
    </FlexWidthHeight100Centered>
}