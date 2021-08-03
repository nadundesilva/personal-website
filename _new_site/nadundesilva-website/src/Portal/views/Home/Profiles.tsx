import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faFacebook, faGithub, faInstagram, faLinkedin, faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        profileSection: {
            padding: theme.spacing(5),
            cursor: "pointer",
            "&:hover": {
                background: "#cccccc"
            }
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
        <Grid container justifyContent="center" alignItems="center">
            {
                profiles.map((profile) => (
                    <Grid item xs={4} key={profile.name} onClick={generateOpenLinkHandler(profile.link)}>
                        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.profileSection}>
                            <Grid item xs={12}>
                                <FontAwesomeIcon icon={profile.icon}/>
                            </Grid>
                            <Grid item xs={12}>
                                {profile.name}
                            </Grid>
                        </Grid>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default Profiles;
