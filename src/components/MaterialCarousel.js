import React from 'react';
import clsx from 'clsx';
import Carousel, { consts } from 'react-elastic-carousel';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    arrowWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '& > *': {
            margin: theme.spacing(1)
        },
    },
    arrowButton: {
        '&:hover': {
            transform: 'scale(1.5)',
        }
    },
    active: {
        color: "#494949"
    },
    nonActive: {
        color: "#afafaf",
    },
    indicator: {
        fontSize: "15px",
        cursor: "pointer",
        transition: "200ms",
        '&:hover': {
            color: "#1f1f1f"
        },
        '&:active': {
            color: "#1f1f1f"
        }
    },
}));

function Arrow({ type, onClick, isEdge }) {
    const classes = useStyles();

    const icon = type === consts.PREV ? <NavigateBeforeIcon className={classes.arrowButton} /> : <NavigateNextIcon className={classes.arrowButton} />

    return (
        <div className={classes.arrowWrapper}>
            <IconButton color="default" aria-label="next" onClick={onClick} disabled={isEdge}>
                {icon}
            </IconButton>
        </div>
    )
}

function Navigation({ pages, activePage, onClick }) {
    const classes = useStyles();

    return (
        <div>
            {pages.map(page => {
                const isActivePage = activePage === page;
                return (
                    <FiberManualRecordIcon
                        key={page}
                        size='small'
                        className={clsx(classes.indicator, {
                            [classes.nonActive]: !isActivePage,
                            [classes.active]: isActivePage,
                        })}
                        onClick={() => onClick(page)}
                    />
                )
            })}
        </div>
    )
}

export default function MaterialCarousel({ itemsToShow, children }) {
    const theme = useTheme();

    function navArrow({ type, onClick, isEdge }) {
        return <Arrow type={type} onClick={onClick} isEdge={isEdge} />
    }

    function pagination({ pages, activePage, onClick }) {
        return <Navigation pages={pages} activePage={activePage} onClick={onClick} />
    }

    return (
        <Carousel
            itemsToShow={itemsToShow}
            renderArrow={navArrow}
            renderPagination={pagination}
            itemPadding={[theme.spacing(3), theme.spacing(3)]}
        >
            {children}
        </Carousel>
    );
}