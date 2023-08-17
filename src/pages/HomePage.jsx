import { Box, Container, Fab, Grid, Paper, Stack, Typography } from "@mui/material"
import arrows from "../assets/arrows-rotate.svg"
import { useState } from "react"
import journalingQuestions from "../api/journalingData"

function Home() {

    const [question, setQuestion] = useState("What are you grateful for today?")
    const [rotationAngle, setRotationAngle] = useState(0);

    const imageStyle = {
        transform: `rotate(${rotationAngle}deg)`,
        transition: "0.5s"
    };

    async function generateQuestion() {
        setRotationAngle(rotationAngle + 365);
        const randomIndex = Math.floor(Math.random() * journalingQuestions.length);
        const randomQuestion = journalingQuestions[randomIndex];
        setQuestion(randomQuestion);

    }

    return (
        <Box sx={{ backgroundColor: "#FFFD63" }} >
            <Container fixed >
                <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                paddingY={5}
                minHeight="100vh" >
                    <Stack spacing={2} >
                        <Typography 
                        variant="h1" 
                        fontSize={{
                            md: 50, 
                            xs: 40
                        }} 
                        textAlign={"center"} 
                        fontFamily={'Pacifico'} 
                        paddingBottom={4} >
                            Duck’s Journaling
                        </Typography>
                        <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 4,
                            width: { 
                                md: 800, 
                                xs: "auto" 
                            },
                            boxShadow: "6px 6px 6px 0px rgba(0,0,0,0.1)",
                        }} >
                            <Box 
                            padding={4} 
                            alignItems="center" 
                            justifyContent="space-between" 
                            sx={{ display: "flex" }} >
                                <Typography 
                                variant="h4" 
                                fontSize={{
                                    md: 18, 
                                    xs: 16
                                }} 
                                fontFamily={'Poppins'} 
                                fontWeight={500}
                                paddingRight={2} >
                                    {question}
                                </Typography>
                                <Fab 
                                size="small" 
                                color="primary" 
                                aria-label="New Question" 
                                sx={{ minWidth: "40px" }}
                                onClick={generateQuestion} >
                                    <img src={arrows} alt="arrows-rotate" style={imageStyle} />
                                </Fab>
                            </Box>
                        </Paper>
                        <Typography 
                        variant="h4" 
                        fontSize={{
                            md: 20, 
                            xs: 16
                        }} 
                        textAlign={"center"} 
                        fontFamily={'Pacifico'} 
                        color={"#B9B723"}
                        paddingTop={4} >
                            Made by DuckBloof
                        </Typography>
                    </Stack>
                </Grid>
            </Container>
        </Box>
    )
}

export default Home