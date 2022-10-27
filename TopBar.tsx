
import React from 'react'
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppState } from './store/reducer';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Button } from './components/Button';

const Container = styled.div`
    background-color: ${props => props.theme.colors.background};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 30px;
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
`

const LogOutButton = styled(Button)`
    margin-left: 20px;
    min-height: 30px;
    min-width: 70px;
`

const ProjectName = styled(Link)`
    margin-top: 15px;
    font-size: 2rem;
    text-decoration: none;
    color: inherit;
`

const LoggedInText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const TopBar = () => {
    const [cookies, setCookie , removeCookie] = useCookies(['timed-unlock-token']);
    const navigate = useNavigate();

    const username = useSelector<AppState>(state => state.user.username);
    const isLoggedIn = Boolean(cookies["timed-unlock-token"])

    const logOut = () => {
        setCookie("timed-unlock-token", ""); // Set it to empty, because `removeCookie` doesn't always remove it work some reason
        removeCookie("timed-unlock-token"); 
        navigate("/login")
    }

    return (
        <Container>
            <ProjectName to="/dashboard">Timed-unlock</ProjectName>
            {isLoggedIn && <RightContainer>
                <LoggedInText>Logged in as {username}</LoggedInText>
                <LogOutButton onClick={logOut}>Log out</LogOutButton>
            </RightContainer>}
        </Container>
    )
}
