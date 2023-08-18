import { Box, Container, Fab, Grid, Paper, Stack, Typography } from "@mui/material"
import arrows from "../assets/arrows-rotate.svg"
import { useState } from "react"
import journalingQuestions from "../utils/journalingData"
import { Formik, Form, Field } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import "./styles/HomePage.css"

function Home() {

    const randomIndex = Math.floor(Math.random() * (journalingQuestions.length - 1));

    const [question, setQuestion] = useState(journalingQuestions[randomIndex])
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const imageStyle = {
        transform: `rotate(${rotationAngle}deg)`,
        transition: "0.5s"
    };

    function generateQuestion() {
        setRotationAngle(rotationAngle + 365);
        setQuestion(journalingQuestions[randomIndex + 1]);
    }

    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        const { content } = values;
        console.log(content);
    }
    
    const initialValues = {
        content: ""
    };

    return (
        <Box sx={{ backgroundColor: "#FFFD63" }} >
            <Container fixed >
                <Grid container direction="column" justifyContent="center" alignItems="center" paddingY={5} minHeight="100vh" >
                    <Stack spacing={2} >
                        <Typography variant="h1" textAlign={"center"} fontFamily={'Pacifico'} paddingBottom={4} fontSize={{ md: 50, xs: 40 }} >Duck’s Journaling</Typography>
                        <Paper sx={{ width: { md: 800, xs: "auto" } }}>
                            <Box padding={4} alignItems="center" justifyContent="space-between" sx={{ display: "flex" }} >
                                <Typography variant="h4" fontSize={{ md: 18, xs: 16 }} lineHeight={1.5} fontFamily={'Poppins'} fontWeight={500} paddingRight={2} >{question}</Typography>
                                <Fab size="small" color="primary" aria-label="New Question" sx={{ minWidth: "40px" }}onClick={generateQuestion} >
                                    <img src={arrows} alt="arrows-rotate" style={imageStyle} />
                                </Fab>
                            </Box>
                        </Paper>
                        <Formik 
                            initialValues={initialValues}
                            onSubmit={handleSubmit} >
                            <Form>
                                <Paper sx={{ width: { md: 800, xs: "auto" } }}>
                                    <Box padding={4} alignItems="center" justifyContent="space-between" sx={{ display: "flex" }} >
                                        <Field type='textarea' as="textarea" rows="6" name='content' id="content" className="content-input" placeholder="Write here..." />
                                    </Box>
                                </Paper>

                                <LoadingButton fullWidth type="submit" variant="contained" size="large" color="primary" fontFamily={'Poppins'} loading={isSubmitting} disabled={isSubmitting}
                                sx={{
                                    boxShadow: "none",
                                    fontWeight: 800,
                                    paddingY: 2,
                                    marginTop: 2,
                                    borderRadius: 4
                                }} >
                                    <span>Review</span>
                                </LoadingButton>
                            </Form>
                        </Formik>
                        <Typography variant="h4" fontSize={{ md: 20, xs: 16 }} textAlign={"center"} fontFamily={'Pacifico'} color={"#B9B723"} paddingTop={4} >Made by DuckBloof</Typography>
                    </Stack>
                </Grid>
            </Container>
        </Box>
    )
}

export default Home