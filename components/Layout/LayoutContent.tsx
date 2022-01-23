import { Container } from "@mui/material";
import React from "react";

import RouterBreadcrumbs from "./RouterBreadcrumbs";

interface LayoutContentProps {
    children: React.ReactNode,
}

const LayoutContent = ({ children }: LayoutContentProps): React.ReactElement => (
    <Container maxWidth={false} disableGutters={true}
        sx={{
            marginBottom: 5,
            px: {
                xs: 0,
                lg: 20,
                xl: 40
            }
        }}
    >
        <RouterBreadcrumbs/>
        {children}
    </Container>
);

export default LayoutContent;
