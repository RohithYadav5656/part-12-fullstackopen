import React from 'react'
import styled from 'styled-components'
import { API_URL } from '../../config'
import { Project } from '../../type'
import { FlexWidthHeight100Centered, WidgetContainer } from '../styled/containers'
import { ColoredAnchor, ColoredLink, WidgetHeader } from '../styled/text'

const ProjectListContainer = styled.ul`
    background-color: ${props => props.theme.colors.foreground}; 
    list-style-type: none;
    padding: 0px;
    margin: 0px;
`

const ProjectContainer = styled.li`
    min-height: 30px;
    display: flex;
    align-items: center;
`

const ProjectName = styled.span`
    display: inline-block;
    margin: 0px 20px 0px 0px;
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ViewProjectLink = styled(ColoredLink)`
    margin-right: 20px;
    white-space: nowrap;
`

const ApiLink = styled(ColoredAnchor)`
    white-space: nowrap;
`

export interface ProjectListWidgetProps {
    projects: Project[];
}

export const ProjectListWidget = (props: ProjectListWidgetProps) => {
    return (
        <WidgetContainer>
            <WidgetHeader>Projects</WidgetHeader>
            {props.projects.length === 0 ? <FlexWidthHeight100Centered>
                <p>No projects yet</p>
            </FlexWidthHeight100Centered> :
                <ProjectListContainer>
                    {props.projects.map(project => {
                        return <ProjectContainer key={project._id}>
                            <ProjectName>{project.name}</ProjectName>
                            <ViewProjectLink to={`/projects/${project._id}`}>View project</ViewProjectLink>
                            <ApiLink href={`${API_URL}projects/${project._id}/items`}>Unlocked Items API</ApiLink>
                        </ProjectContainer>
                    })}
                </ProjectListContainer>}
        </WidgetContainer>
    )
}
