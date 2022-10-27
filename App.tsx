import React, { useEffect } from 'react';
import NotificationSystem from 'react-notification-system';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ProjectView } from "./ProjectView";
import { LoginPage } from './LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { RegisterPage } from './RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store/reducer';
import { setUserData } from './store/actionCreators';
import { User } from './type';
import { TopBar } from './TopBar';
import styled, { ThemeProvider } from 'styled-components';
import { DashboardPage } from './components/DashboardPage';
import { Redirect } from './utils/Redirect';
import { LightTheme } from './themes';

const ApplicationContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};
`

const PageContainer = styled.div`
  display: flex;
  padding: 10px;
  min-height: 100%;
  flex: 1;
`

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['timed-unlock-token']);

  if (cookies["timed-unlock-token"]) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies["timed-unlock-token"]}`
  }

  const notificationSystem: React.RefObject<NotificationSystem.System> = React.createRef();

  const showNotification = (message: string, level: "success" | "error" | "warning" | "info" | undefined) => {
    notificationSystem.current?.addNotification({ message, level })
  }

  const isLoggedIn = Boolean(cookies["timed-unlock-token"])
  const dispatch = useDispatch();
  const username = useSelector<AppState>(state => state.user.username);

  useEffect(() => {
    if (isLoggedIn && !username) {
      axios.get<User>("user").then(response => {
        dispatch(setUserData({ ...response.data }));
      }).catch(error => {
        if (error.response.status === 401) navigate("/login");
      })
    }
  }, [dispatch, isLoggedIn, username, navigate])

  return (
    <ThemeProvider theme={LightTheme}>
      <ApplicationContainer>
        <TopBar />
        <NotificationSystem ref={notificationSystem} />
        <PageContainer>
          <Routes>
            <Route path="/login" element={<LoginPage showNotification={showNotification} />} />
            <Route path="/register" element={<RegisterPage showNotification={showNotification} />} />
            <PrivateRoute path="/" element={<Redirect to="/dashboard" />} />
            <PrivateRoute path="/dashboard" element={<DashboardPage />} />
            <PrivateRoute path="/projects/:projectId" element={<ProjectView />} />

            {/* If not page was found for the URL, it should go to the dashboard */}
            <Route path="*" element={<Redirect to="/dashboard" />} />
          </Routes>
        </PageContainer>
      </ApplicationContainer >
    </ThemeProvider>
  );
}

export default App;
