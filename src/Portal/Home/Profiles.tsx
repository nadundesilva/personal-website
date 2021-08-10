import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faFacebook, faGithub, faInstagram, faLinkedin, faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { useScrollOffset } from "../../components";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        profileSection: {
            padding: theme.spacing(4),
            cursor: "pointer",
            "&:hover": {
                background: theme.palette.type === "light" ? "#cccccc" : "#444444"
            }
        },
        profileIcon: {
            margin: theme.spacing(1)
        },
        profileText: {
            fontWeight: "bold"
        }
    })
);

interface Profile {
    name: string,
    icon: IconDefinition,
    link: string,
}

const Profiles = (): React.ReactElement => {
    const classes = useStyles();
    const { ref: rootRef, offset } = useScrollOffset<HTMLDivElement>();

    const profiles: Profile[] = [
        {
            name: "LinkedIn",
            icon: faLinkedin,
            link: "https://www.linkedin.com/in/nadundesilva"
        },
        {
            name: "GitHub",
            icon: faGithub,
            link: "https://github.com/nadundesilva"
        },
        {
            name: "Medium",
            icon: faMedium,
            link: "https://medium.com/@nadundesilva"
        },
        {
            name: "Facebook",
            icon: faFacebook,
            link: "https://www.facebook.com/nadunrds"
        },
        {
            name: "Instagram",
            icon: faInstagram,
            link: "https://www.instagram.com/nadunrds"
        },
        {
            name: "Twitter",
            icon: faTwitter,
            link: "https://twitter.com/nadunrds"
        }
    ];

    const generateOpenLinkHandler = (link: string) => () => {
        window.open(link, "_blank");
    };

    return (
        <Grid ref={rootRef} container justifyContent="center" alignItems="center">
            {
                profiles.map((profile) => (
                    <Grid item xs={12} sm={4} key={profile.name} onClick={generateOpenLinkHandler(profile.link)}>
                        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.profileSection}
                            style={{
                                transform: `scale(${offset}, ${offset})`,
                                opacity: offset
                            }}
                        >
                            <Grid item xs={6}>
                                <FontAwesomeIcon icon={profile.icon} size="3x" className={classes.profileIcon}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.profileText}>{profile.name}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default Profiles;
