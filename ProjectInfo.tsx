import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { API_URL } from '../config';
import { Project } from '../type'
import { Button } from './Button';
import { WidgetContainer } from './styled/containers';
import { ColoredAnchor } from './styled/text';

export interface ProjectInfoProps {
    project: Project;
}

const Paragraph = styled.p`
    margin: 5px 0px;
`

const ProjectName = styled.h1`
    margin: 15px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const DeleteButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const ProjectInfo = (props: ProjectInfoProps) => {
    const project = props.project;
    const navigate = useNavigate();

    const apiUrl = `${API_URL}projects/${project._id}/items`;
    const itemCount = project.items.length;

    const now = new Date();
    const publicItemCount = project.items.reduce((prev, item) => {
        const isPublic = item.unlockDate <= now;
        return prev + (isPublic ? 1 : 0);
    }, 0);

    const privateItemCount = itemCount - publicItemCount;

    const getItemWordForCount = (count: Number) => {
        return count === 1 ? "item" : "items";
    }

    const tryDeleteProject = () => {
        if (window.confirm("Are you sure you want to delete this project? This action can not be undone")) {
            axios.delete(`projects/${project._id}`).then(response => {
                navigate("/dashboard");
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <WidgetContainer>
            <ProjectName title={project.name}>{project.name}</ProjectName>
            <Paragraph>API URL: <ColoredAnchor href={apiUrl}>{apiUrl}</ColoredAnchor></Paragraph>
            <Paragraph>{itemCount} {getItemWordForCount(itemCount)} ({publicItemCount} public / {privateItemCount} private)</Paragraph>
            <DeleteButtonContainer>
                <Button colorUsage="warning" onClick={tryDeleteProject}>Delete project</Button>
            </DeleteButtonContainer>
        </WidgetContainer>
    )
}
