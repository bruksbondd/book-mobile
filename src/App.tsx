import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './App.scss';
import { HomePage } from './pages/HomePage'
import { ContactsPage } from './pages/ContactsPage'
import { AboutPage } from './pages/AboutPage'
import { Header } from './component/header/Header'
import { EditPage } from './pages/EditPage'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <div className="App">
      <Container className="conatiner" maxWidth="md">
        <Card>
          <CardContent>
            <Header />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/contact">
                <ContactsPage />
              </Route>
              <Route path="/edit/">
                <EditPage />
              </Route>
              <Route path="/edit/:id">
                <EditPage />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
