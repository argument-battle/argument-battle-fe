import { createMuiTheme } from '@material-ui/core/styles';

const MUITheme = createMuiTheme({
    palette: {
        primary: {
            main: '#3B9182'
        },
        secondary: {
            main: '#83CDC0'
        },
        teamRed: {
            main: '#F2DEDE'
        },
        teamGreen: {
            main: '#CBEEDB'
        },
        background: {
            paper: '#CBDCD7',
            default: '#e6efeb'
        }
    }
});

export { MUITheme };
