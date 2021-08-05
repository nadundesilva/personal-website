import React from "react";
import Home from "./Home";
import { SEO } from "../components";

const Portal = (): React.ReactElement => {
    return (
        <React.Fragment>
            <SEO/>
            <Home/>
        </React.Fragment>
    );
};

export default Portal;
