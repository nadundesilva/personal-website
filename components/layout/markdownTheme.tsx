/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { MDXProvider } from "@mdx-js/react";
import { Typography } from "@mui/material";
import React from "react";

const HeadingOne = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement => (
    <Typography variant="h4" component="h1" sx={{ pt: 2 }} {...props}>
        {children}
    </Typography>
);

const HeadingTwo = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement => (
    <Typography variant="h6" component="h2" sx={{ pt: 2 }} {...props}>
        {children}
    </Typography>
);

const Paragraph = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement => (
    <Typography
        variant="body1"
        gutterBottom
        sx={{ m: 0, pt: 2, textAlign: "justify" }}
        {...props}
    >
        {children}
    </Typography>
);

interface MarkdownThemeProviderProps {
    children: React.ReactNode;
}

const MarkdownThemeProvider = ({
    children,
}: MarkdownThemeProviderProps): React.ReactElement => {
    const markdownComponents = {
        h1: HeadingOne,
        h2: HeadingTwo,
        p: Paragraph,
    };

    return (
        <MDXProvider components={markdownComponents}>{children}</MDXProvider>
    );
};

export default MarkdownThemeProvider;
