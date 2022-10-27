import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { CreateProjectView } from './widgets/CreateProjectWidget'
import { Project } from '../type'
import { DashboardContainer } from './styled/containers'
import { ProjectListWidget } from './widgets/ProjectListWidget'

export const DashboardPage = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<Project[]>("projects").then(response => {
            if (response) {
                setProjects(response.data);
            }
        }).catch(error => {
            if (error.response.status === 401) navigate("/login")
        })
    }, [navigate])

    return (
        <DashboardContainer>
            <CreateProjectView onCreateProject={project => setProjects([...projects, project])} />
            <ProjectListWidget projects={projects} />
        </DashboardContainer>
    )
}
