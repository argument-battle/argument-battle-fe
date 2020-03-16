import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        marginBottom: theme.spacing(2),
        textAlign: 'center'
    }
}));
