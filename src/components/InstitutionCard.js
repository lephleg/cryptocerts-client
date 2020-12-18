import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { green, blue } from '@material-ui/core/colors';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 230,
    },
    icon: {
        fontSize: 40,
    },
    actionArea: {
        height: 195
    },
    location: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    locationIcon: {
        fontSize: 16,
        margin: theme.spacing(1),
        color: green[800]
    },
    address: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    addressIcon: {
        fontSize: 16,
        margin: theme.spacing(1),
        color: blue[800]
    },
    iconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
        paddingBottom: 0
    },
    actions: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}));

export default function InstitutionCard({ institution, canEdit, canDelete }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={2}>
            <CardActionArea className={classes.actionArea}>
                <Box className={classes.iconWrapper}>
                    <AccountBalanceIcon className={classes.icon} />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="h2">
                        {institution.name}
                    </Typography>
                    <Box className={classes.location}>
                        <RoomIcon className={classes.locationIcon} />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {institution.location}
                        </Typography>
                    </Box>
                    <Box className={classes.address}>
                        <AccountBoxIcon className={classes.addressIcon} />
                        <Typography noWrap variant="body2" color="textSecondary" component="p">
                            {institution.address}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Button size="small" color="primary" disabled={!canEdit}>
                    Edit
                </Button>
                <Button size="small" color="secondary" disabled={!canDelete}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
