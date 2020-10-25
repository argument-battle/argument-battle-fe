import React from 'react';
import clsx from 'clsx';
import { Error, Info, Close, Warning, CheckCircle } from '@material-ui/icons';
import { IconButton, Typography, Card } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.light
    },
    info: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginTop: '-2px'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    close: {
        marginTop: '-2px'
    }
}));

const Snack = React.forwardRef(function Snack(props, ref) {
    const classes = useStyles();
    const { id, message, onClose = () => {}, variant = 'info' } = props;
    const { closeSnackbar } = useSnackbar();
    const Icon = variantIcon[variant];

    const handleDismiss = () => {
        closeSnackbar(id);
        onClose();
    };

    return (
        <Card
            className={clsx(classes[variant], classes.container)}
            ref={ref}
            display="flex"
        >
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            <Typography classes={{ root: classes.message }}>
                {message}
            </Typography>
            <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleDismiss}
            >
                <Close
                    className={clsx(
                        classes.icon,
                        classes.iconVariant,
                        classes.close
                    )}
                />
            </IconButton>
        </Card>
    );
});

const pushErrorMessageFactory = enqueueSnackbar => message => {
    enqueueSnackbar('', {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        },
        content: function LoginSnack(key) {
            return (
                <Snack id={key} key={key} variant="error" message={message} />
            );
        }
    });
};

const pushSuccessMessageFactory = enqueueSnackbar => message => {
    enqueueSnackbar('', {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        },
        content: function LoginSnack(key) {
            return (
                <Snack id={key} key={key} variant="success" message={message} />
            );
        }
    });
};

export { Snack, pushErrorMessageFactory, pushSuccessMessageFactory };
