import React from "react";
import Home from "./Home";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Portal = (): React.ReactElement => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default Portal;
