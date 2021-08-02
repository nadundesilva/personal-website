import React, { useRef } from "react";
import { Layout } from "../../../components";
import AboutMe from "./AboutMe";
import { Button, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
	const sidesPadding = 16;
	return createStyles({
		root: {
			marginLeft: theme.spacing(sidesPadding),
			marginRight: theme.spacing(sidesPadding)
		},
		grow: {
			flexGrow: 1
		},
		section: {
			padding: theme.spacing(1),
			margin: theme.spacing(2)
		},
		sectionContent: {
			padding: theme.spacing(3)
		},
		profilePhoto: {
			width: "100%",
			height: "auto"
		}
	});
});

interface Section {
	name: string,
	ref: React.RefObject<HTMLButtonElement>,
};

const Home = (): React.ReactElement => {
	const classes = useStyles();

	const pageSections: Section[] = [
		{
			name: "Education",
			ref: useRef<HTMLButtonElement>(null)
		}
	];

	const generateGoToSectionHandler = (sectionRef: React.RefObject<HTMLButtonElement>) => () => {
		sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
	};
	return (
		<Layout navItems={
			<React.Fragment>
				<div className={classes.grow} />
				{
					pageSections.map((section: Section) => (
						<Button key={section.name} variant={"contained"} color="primary" disableElevation
							ref={section.ref} onClick={generateGoToSectionHandler(section.ref)}>
							{section.name}
						</Button>
					))
				}
			</React.Fragment>
		}>
			<div className={classes.root}>
				<AboutMe/>
				<React.Fragment>
					{
						pageSections.map((section: Section) => (
							<div className={classes.section} key={section.name}>
								<Typography variant="h6" align="center">{section.name}</Typography>
							</div>
						))
					}
				</React.Fragment>
			</div>
		</Layout>
	);
};

export default Home;
