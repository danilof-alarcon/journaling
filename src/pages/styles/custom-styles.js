const styles = {
    typography: {
        h3: {
            fontSize: {
                md: 18, 
                xs: 16
            },
            fontWeight: 500,
            lineHeight: 1.5
        },
        body1: {
            fontSize: {
                md: 16, 
                xs: 14
            },
            fontWeight: 400,
            color: "#8C8C8C",
            lineHeight: 1.5
        }
    },
    components: {
        paper: {
            elevation: 0,
            boxShadow: '6px 6px 6px 0px rgba(0,0,0,0.1)',
            borderRadius: 5,
            width: { 
                md: 800, 
                xs: "auto" 
            }
        },
        box: {
            padding: 4,
            alignItems: "center",
        }
    },
}

export default styles