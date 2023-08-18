import { createTheme } from '@mui/material/styles'


const theme = createTheme({
    palette: {
        primary: {
        main: '#000000',
        },
    },
    components: {
        MuiPaper: {
        defaultProps: {
            elevation: 0,
        },
        styleOverrides: {
            root: {
            boxShadow: '6px 6px 6px 0px rgba(0,0,0,0.1)',
            borderRadius: "16px",
            },
        }
        }
    },
    typography: {
        fontFamily: [
        'Poppins',
        ].join(','),
    },
});

export default theme