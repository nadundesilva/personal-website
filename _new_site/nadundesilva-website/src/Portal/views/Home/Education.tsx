import React from "react";
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { LocationOn as LocationOnIcon } from "@material-ui/icons";
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		timeLineItemContent: {
			padding: theme.spacing(2)
		},
		institute: {
			display: "table-cell",
			verticalAlign: "middle"
		}
	})
);

interface EducationItem {
	name: string,
	timePeriod: string,
	description: string,
	institute: string,
}

const Education = (): React.ReactElement => {
	const classes = useStyles();
	const educationItems: EducationItem[] = [
		{
			name: "Bachelor of Science in Engineering",
			timePeriod: "Dec 2017",
			description: "Studied Computer Science and Engineering & completed a First Class Honors Degree.",
			institute: "University of Moratuwa"
		},
		{
			name: "Certified Kubernetes Application Developer",
			timePeriod: "Jan 2020",
			description: "Achieved Certified Kubernetes Application Developer Certification.",
			institute: "Linux Foundation"
		},
		{
			name: "Certified Kubernetes Administrator",
			timePeriod: "Dec 2020",
			description: "Achieved Certified Kubernetes Administrator Certification.",
			institute: "Linux Foundation"
		}
	];
	return (
		<Timeline align="alternate">
			{
				educationItems.map((item: EducationItem, index: number) => (
					<TimelineItem key={item.name}>
						<TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
								{item.timePeriod}
							</Typography>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot color="primary"/>
							<TimelineConnector/>
						</TimelineSeparator>
						<TimelineContent>
							<Paper elevation={3} className={classes.timeLineItemContent}>
								<Typography variant="h6" component="h6">{item.name}</Typography>
								<Typography color="textSecondary">
									{item.description}
								</Typography>
								<Typography color="textSecondary" className={classes.institute}>
									<Grid container spacing={3} justifyContent="center">
										{index % 2 === 0 && (
											<Grid item xs={4}>
												<LocationOnIcon />
											</Grid>
										)}
	                                    <Grid item xs={4}>
											{item.institute}
										</Grid>
										{index % 2 === 1 && (
											<Grid item xs={4}>
												<LocationOnIcon />
											</Grid>
										)}
									</Grid>
								</Typography>
							</Paper>
						</TimelineContent>
					</TimelineItem>
				))
			}
		</Timeline>
	);
};

export default Education;
