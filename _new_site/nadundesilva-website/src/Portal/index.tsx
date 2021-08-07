import React from "react";
import Home from "./Home";
import { SEO } from "../components";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Portal = (): React.ReactElement => {
    return (
        <React.Fragment>
            <SEO/>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default Portal;
