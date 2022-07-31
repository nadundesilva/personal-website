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
import { Box, Container, Link, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const HeadingOneElement = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement => (
    <Typography
        variant="h4"
        component="h2"
        sx={{ pt: 7, fontWeight: "bold", fontSize: 31 }}
        {...props}
    >
        {children}
    </Typography>
);

const HeadingTwoElement = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement => (
    <Typography
        variant="h5"
        component="h3"
        sx={{ pt: 4, fontWeight: "bold", fontSize: 27 }}
        {...props}
    >
        {children}
    </Typography>
);

const HeadingThreeElement = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement => (
    <Typography
        variant="h6"
        component="h4"
        sx={{ pt: 2, fontWeight: "bold", fontSize: 23 }}
        {...props}
    >
        {children}
    </Typography>
);

const HorizontalLineElement = (): React.ReactElement => (
    <Container sx={{ textAlign: "center", fontSize: 30, letterSpacing: 20 }}>
        ...
    </Container>
);

const ParagraphElement = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>): React.ReactElement => (
    <Typography
        variant="body1"
        gutterBottom
        sx={{ m: 0, pt: 2, textAlign: "justify" }}
        {...props}
    >
        {children}
    </Typography>
);

const AnchorElement = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLAnchorElement>): React.ReactElement => (
    <Link target={"_blank"} {...props}>
        {children}
    </Link>
);

const ImageElement = ({
    src,
    alt,
}: React.HTMLProps<HTMLImageElement>): React.ReactElement => (
    <Container sx={{ position: "relative", height: 500, my: 2 }} disableGutters>
        <Image layout="fill" objectFit="cover" src={src ?? ""} alt={alt} />
    </Container>
);

const PreElement = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLPreElement>): React.ReactElement => {
    return (
        <Box
            sx={{
                "backgroundColor": "#242633",
                "color": "#f8f8f2",
                "& code": {
                    backgroundColor: "transparent !important",
                    display: "block",
                    px: 1,
                    py: 1,
                    my: 1,
                },
            }}
        >
            <pre>{children}</pre>
        </Box>
    );
};

const CodeElement = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLPreElement>): React.ReactElement => {
    return (
        <code
            style={{
                display: "inline-block",
                backgroundColor: "rgba(228, 231, 237, 0.7)",
                borderRadius: 2,
            }}
        >
            {children}
        </code>
    );
};

interface MarkdownThemeProviderProps {
    children: React.ReactNode;
}

const MarkdownThemeProvider = ({
    children,
}: MarkdownThemeProviderProps): React.ReactElement => {
    const markdownComponents = {
        h1: HeadingOneElement,
        h2: HeadingTwoElement,
        h3: HeadingThreeElement,
        hr: HorizontalLineElement,
        p: ParagraphElement,
        a: AnchorElement,
        img: ImageElement,
        pre: PreElement,
        code: CodeElement,
    };

    return (
        <MDXProvider components={markdownComponents}>{children}</MDXProvider>
    );
};

export default MarkdownThemeProvider;
