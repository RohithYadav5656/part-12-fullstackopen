import axios from "axios";
import { Item, NewItem } from "./type";
import Datetime from 'react-datetime';
import moment from "moment";
import { Button } from "./components/Button";
import { WidgetContainer } from "./components/styled/containers";
import { WidgetHeader } from "./components/styled/text";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormTextField } from "./components/forms/FormTextField";
import { CustomFormField } from "./components/forms/CustomFormField";
import { addDays } from "date-fns";

interface CreateItemViewProps {
    projectId: string;
    onCreateItem: (item: Item) => void;
}

export const CreateItemValidationSchema = Yup.object().shape({
    itemData: Yup.string().required("Item data is required"),
    unlockDate: Yup.date().required("Unlock date is required")
})

export const CreateItemView = (props: CreateItemViewProps) => {
    const createItem = (data: string, unlockDate: Date) => {
        const item: NewItem = { data, unlockDate };
        axios.post<Item>(`projects/${props.projectId}/items`, item).then(response => {
            const rawItem = response.data;
            // Dates come as strings, so they have to be parsed
            const parsedItem: Item = {
                ...rawItem,
                unlockDate: new Date(rawItem.unlockDate)
            };

            props.onCreateItem(parsedItem);
        });
    };

    return <WidgetContainer>
        <WidgetHeader>Create new item</WidgetHeader>
        <Formik
            initialValues={{ itemData: "", unlockDate: addDays(new Date(), 1) }}
            validationSchema={CreateItemValidationSchema}
            onSubmit={values => createItem(values.itemData, values.unlockDate)}
        >
            {({ errors, values, setFieldValue, isValid, initialValues }) => <Form>
                <FormTextField
                    labelAsPlaceholder
                    label="Item data"
                    onChange={newText => setFieldValue("itemData", newText)}
                    error={errors.itemData}
                    value={values.itemData}
                />
                <CustomFormField
                    label="Unlock date"
                    error={errors.unlockDate ? "Unlock date is required" : undefined}>
                    <Datetime
                        initialValue={moment(initialValues.unlockDate)}
                        onChange={d => setFieldValue("unlockDate", moment(d).toDate())} />
                </CustomFormField>
                <Button type="submit" colorUsage="primary" disabled={!isValid}>Create</Button>
            </Form>}
        </Formik>
    </WidgetContainer>;
};
