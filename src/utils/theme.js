import { createTheme } from '@mui/material/styles'


const theme = createTheme({
    palette: {
        primary: {
        main: '#000000',
        },
    },
    typography: {
        fontFamily: [
        'Poppins',
        ].join(','),
    },
});

export default theme