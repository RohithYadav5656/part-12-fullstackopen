import { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Item } from "./type";
import { Button } from "./components/Button";
import Datetime from 'react-datetime';
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormTextField } from "./components/forms/FormTextField";
import { CustomFormField } from "./components/forms/CustomFormField";

export interface SingleItemProps {
    item: Item;
    onEditItem: (newItem: Item) => void;
    onDeleteItem: () => void;
}

const SingleItemViewContainer = styled.div<SingleItemViewContainerProps>`
    padding: 10px;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    background-color: white;
`

interface SingleItemViewContainerProps {
    unlocked: boolean;
}

const ProjectData = styled.h3`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
    flex-shrink: 1;
    word-break: break-all;
    margin: 0px;
`

const UnlockDate = styled.span`
    margin-right: 20px;
    white-space: nowrap;
`

interface UnlockTimeAge {
    isUnlocked?: boolean | undefined;
}

const UnlockTimeAgo = styled.span<UnlockTimeAge>`
    margin-right: 20px;
    white-space: nowrap;
    flex-grow: 1;
    padding: 6px 10px;
    ${props => props.isUnlocked !== undefined ? ("background-color: " + (props.isUnlocked ? props.theme.colors.unlockedBackgroundColor : props.theme.colors.lockedBackgroundColor)) : ""}
`

const Separator = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const EditingContainer = styled.div`
    background-color: ${props => props.theme.colors.foreground};
    padding: 10px;
`

const EditingProjectData = styled(ProjectData)`
    margin-bottom: 10px;
`

const DatetimeContainer = styled.div`
    display: inline-block;
    max-width: 200px;
`

const EditButton = styled(Button)`
    margin-right: 15px;
`

const RightSide = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
`

const EditItemValidationSchema = Yup.object().shape({
    editingItemData: Yup.string().required("Item data is required"),
    editingItemUnlockDate: Yup.date().required("Unlock date is required")
})

export const SingleItem = (props: SingleItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const item = props.item;

    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);

    const timeDifference = item.unlockDate.getTime() - dateState.getTime();
    const hourDifference = timeDifference / (1000 * 60 * 60);

    const txt = moment(item.unlockDate).fromNow();

    const saveEditingItem = (newItemData: string, newUnlockDate: Date) => {
        const editingItem = {
            data: newItemData,
            unlockDate: newUnlockDate
        }

        axios.put<Item>(`projects/${item.project}/items/${props.item._id}`, editingItem).then(response => {
            setIsEditing(false);
            const rawItem = response.data;
            // Dates come as strings, so they have to be parsed
            const parsedItem: Item = {
                ...rawItem,
                unlockDate: new Date(rawItem.unlockDate)
            };
            props.onEditItem(parsedItem);
        });
    };

    const tryDeleteItem = () => {
        if (window.confirm("Are you sure you want to delete this item? This action can not be undone")) {
            axios.delete(`projects/${item.project}/items/${item._id}`).then(response => {
                props.onDeleteItem();
            }).catch(error => {
                console.log(error)
            })
        }
    }

    if (isEditing) {
        return <EditingContainer>
            <EditingProjectData>{item.data}</EditingProjectData>
            <Formik
                initialValues={{ editingItemData: props.item.data, editingItemUnlockDate: props.item.unlockDate }}
                validationSchema={EditItemValidationSchema}
                onSubmit={values => saveEditingItem(values.editingItemData, values.editingItemUnlockDate)}
            >
                {({ errors, values, setFieldValue, isValid }) => <Form>
                    <FormTextField
                        label="Item data"
                        labelAsPlaceholder
                        onChange={newText => setFieldValue("editingItemData", newText)}
                        value={values.editingItemData}
                        error={errors.editingItemData} />
                    <CustomFormField label="Unlock time" error={errors.editingItemUnlockDate ? "Unlock date is required" : undefined}>
                        <DatetimeContainer>
                            <Datetime
                                initialValue={moment(values.editingItemUnlockDate)}
                                onChange={d => setFieldValue("editingItemUnlockDate", moment(d).toDate())} />
                        </DatetimeContainer>
                    </CustomFormField>
                    <div>
                        <EditButton type="button" onClick={() => setIsEditing(false)}>Cancel</EditButton>
                        <EditButton type="button" colorUsage="warning" onClick={tryDeleteItem}>Delete</EditButton>
                        <EditButton type="submit" colorUsage="primary" disabled={!isValid}>Save</EditButton>
                    </div>
                </Form>}
            </Formik>
        </EditingContainer>
    }

    return <SingleItemViewContainer unlocked={hourDifference <= 0}>
        <Separator>
            <ProjectData title={item.data}>{item.data}</ProjectData>
            <RightSide>
                <UnlockDate>Unlocks at {item.unlockDate.toLocaleString()}</UnlockDate>
                <UnlockTimeAgo isUnlocked={hourDifference < 0}>{hourDifference < 0 ? `Unlocked ${txt}` : `Unlocks ${txt}`}</UnlockTimeAgo>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
            </RightSide>
        </Separator>
    </SingleItemViewContainer>;
};
