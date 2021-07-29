import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import MeetingRoom from './pages/MeetingRoom';
import { routes } from './routes/index';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyles } from './styles/styles';
import WebCam from './pages/WebCam';

function App() {
  return (
    <HelmetProvider>
      <GlobalStyles />
      <Switch>
        <Route path={routes.home} exact>
          <Home />
        </Route>

        <Route path={routes.meetingRoom}>
          <MeetingRoom />
        </Route>

        <Route path="/webcam">
          <WebCam />
        </Route>
      </Switch>
    </HelmetProvider>
  );
}

export default App;
