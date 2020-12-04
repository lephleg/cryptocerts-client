import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    title: {
        textAlign: "center"
    }
});

export default function InstitutionsPage(props) {
    const classes = useStyles(props);

    return (
        <section>
            <Container maxWidth="md" className={classes.title}>
                <Typography variant="h3" component="h2">Institutions</Typography>
            </Container>
        </section>
    );
}