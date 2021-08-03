import React from "react";
import { createStyles, Container, makeStyles, Theme } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ballerina from "./ballerina.svg";
import cellery from "./cellery.svg";
import siddhi from "./siddhi.svg";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        carouselItem: {
            display: "block",
            margin: "auto",
            height: theme.spacing(10)
        }
    })
);

const ContributedProjects = (): React.ReactElement => {
    const classes = useStyles();
    const renderCarouselItem = (imageLink: string, alt: string): React.ReactElement => (
        <Container>
            <img src={imageLink} alt={alt} className={classes.carouselItem}/>
        </Container>
    );
    return (
        <Carousel PrevIcon={<FontAwesomeIcon icon={faChevronLeft}/>} NextIcon={<FontAwesomeIcon icon={faChevronRight}/>}>
            {renderCarouselItem(ballerina, "Ballerina")}
            {renderCarouselItem(cellery, "Cellery")}
            {renderCarouselItem(siddhi, "Siddhi")}
        </Carousel>
    );
};

export default ContributedProjects;
