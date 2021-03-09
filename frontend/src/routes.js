import React from 'react';

/*Modulos necessarios para configuração do route */
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* Imortamos os modulos que precisamos */
import Logon from './pages/logon';
import Register from './pages/register';
import Profile from './pages/profile';
import newIncident from './pages/newIncident';

/* browserRouter precisa englobar tudo */
/*Utilizamos exact no route para nao ter confusão na hora de carregar os paths (path principal exatamente isto) */
export default function Routes() {
    return (
    <BrowserRouter> 
        <Switch>
            <Route path="/" exact component={Logon} /> 
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/incidents/new" component={newIncident} />
        </Switch>
    </BrowserRouter>
    );
}