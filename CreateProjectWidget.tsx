import axios from 'axios';
import { WidgetContainer } from '../styled/containers';
import { WidgetHeader } from '../styled/text';
import { Project } from "../../type"
import styled from 'styled-components';
import { Button } from '../Button';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { FormTextField } from '../forms/FormTextField';

interface CreateProjectViewProps {
    onCreateProject: (project: Project) => void;
}

const CreateButton = styled(Button)`
    min-width: 80px;
`

const CreateProjectValidationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project name is required")
})

export const InputLabel = styled.span`
    display: block;
    margin-bottom: 5px;
`

export const FormFieldContainer = styled.div`
    margin-bottom: 15px;
`

export const CreateProjectView = (props: CreateProjectViewProps) => {
    const createProject = (projectName: string) => {
        axios.post<Project>("projects", { projectName }).then(response => {
            const project = response.data;
            props.onCreateProject(project);
        })
    }

    return (
        <WidgetContainer>
            <WidgetHeader>Create new project</WidgetHeader>
            <Formik
                initialValues={{ projectName: "" }}
                validationSchema={CreateProjectValidationSchema}
                onSubmit={values => createProject(values.projectName)} >
                {({ errors, values, setFieldValue, isValid }) => <Form>
                    <FormTextField
                        labelAsPlaceholder
                        label="Project name"
                        onChange={newText => setFieldValue("projectName", newText)}
                        error={errors.projectName}
                        value={values.projectName}
                    />
                    <CreateButton type="submit" colorUsage="primary" disabled={!isValid}>Create</CreateButton>
                </Form>}
            </Formik>
        </WidgetContainer>
    )
}
