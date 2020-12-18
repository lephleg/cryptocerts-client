import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(2)
    },
    centered: {
        textAlign: "center"
    }
}));

export default function Header({ title, subtitle }) {
    const classes = useStyles();
    return <section>
        <Container maxWidth="sm" className={classes.title}>
            <Box className={classes.centered}>
                <Typography variant="h5" component="h5">{title}</Typography>
                <Box p={2}>
                    <Typography variant="subtitle1" color="textSecondary">{subtitle}</Typography>
                </Box>
            </Box>
        </Container>
    </section>
}