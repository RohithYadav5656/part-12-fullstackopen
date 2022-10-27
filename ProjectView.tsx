import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Item, Project } from "./type";
import "react-datetime/css/react-datetime.css";
import { ItemList } from "./ItemList";
import { CreateItemView } from "./CreateItemView";
import { ColoredLink } from "./components/styled/text";
import { ProjectInfo } from "./components/ProjectInfo";
import styled from "styled-components";

const SplitView = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
`

const LeftSide = styled.div`
    width: 460px;
`

const RightSide = styled.div`
    width: 100%;
    overflow: hidden;
`

const HomeLinkContainer = styled.div`
    margin-left: 30px;
    margin-top: 24px;
    font-size: 1.3rem;
`

export const ProjectView = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState<Project | undefined>(undefined);

    useEffect(() => {
        if (projectId) {
            axios.get<Project>(`projects/${projectId}`).then(response => {
                const rawProject = response.data;

                // Dates come as strings, so they have to be parsed
                const parsedProject = {
                    ...rawProject,
                    items: rawProject.items.map(item => ({ ...item, unlockDate: new Date(item.unlockDate) }))
                }

                setProject(parsedProject);
            })
        }
    }, [projectId]);

    if (!project || !projectId)
        return <div>Loading...</div>;

    const onEditItem = (newItem: Item) => {
        setProject({
            ...project,
            items: [
                ...project.items.filter(i => i._id !== newItem._id),
                newItem
            ]
        });
    }

    const onCreateItem = (newItem: Item) => {
        setProject({
            ...project,
            items: [...project.items, newItem]
        });
    }

    const onDeleteItem = (itemId: string) => {
        setProject({
            ...project,
            items: project.items.filter(i => i._id !== itemId)
        })
    }

    return <SplitView>
        <LeftSide>
            <HomeLinkContainer>
                <ColoredLink to="/">Back to homepage</ColoredLink>
            </HomeLinkContainer>
            <ProjectInfo project={project} />
            <CreateItemView projectId={projectId} onCreateItem={onCreateItem} />
        </LeftSide>
        <RightSide>
            <ItemList items={project.items} projectId={projectId!} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
        </RightSide>
    </SplitView>;
};