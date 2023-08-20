import { Box, Container, Divider, Fab, FormControl, Grid, List, ListItem, ListItemIcon, Paper, Stack, TextField, Typography } from "@mui/material"
import styles from "./styles/custom-styles"
import arrows from "../assets/arrows-rotate.svg"
import { useState } from "react";
import journalingQuestions from "../utils/journaling-questions"
import { Formik, Form, Field } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import "./styles/JournalingPage.css"
import { openai } from "../api/openai";


function Journaling() {

    const randomIndex = Math.floor(Math.random() * (journalingQuestions.length - 1));

    const [question, setQuestion] = useState(journalingQuestions[randomIndex])
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviewData, setReviewData] = useState({
        value: false,
        input: "",
        correctedText: "",
        feedback: []
    });

    const imageStyle = {
        transform: `rotate(${rotationAngle}deg)`,
        transition: "0.5s",
    };

    function changeQuestion() {
        setRotationAngle(rotationAngle + 365);
        setQuestion(journalingQuestions[randomIndex + 1]);
    }

    const handleSubmit = async ( values ) => {
        setIsSubmitting(true)

        const { input } = values;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `
            You will receive a JSON containing a journaling question and its corresponding answer. The answer might contain errors or non-standard English. The JSON structure will be as follows:
            {
                question: '${question}',
                answer: '${input}'
            }
            Your task is to rephrase the answer using proper standard English and provide clear explanations for the modifications you make. Your response should follow this structure:
            {
                "corrected_text": "CORRECTED_VERSION",
                "feedback": [
                    "Explanation of change...",
                    "Explanation of change...",
                    "Explanation of change...",
                    ...
                ]
            }
            ` }],
            model: 'gpt-3.5-turbo',
            max_tokens: 500,
            temperature: 0.8
        });

        const response = JSON.parse(completion.choices[0].message.content)

        setReviewData({
            value: true,
            input: input,
            correctedText: response.corrected_text,
            feedback: response.feedback
        })
    }

    const initialValues = {
        input: ""
    };

    return(
        <Box sx={{ backgroundColor: "#FFFD63" }} >
            <Container fixed>
                <Grid container direction="column" justifyContent="center" alignItems="center" paddingY={5} minHeight="100vh">
                    <Stack spacing={2}>
                        <Typography variant="h1" fontSize={{md: 50, xs: 40}} fontFamily={"Pacifico"} textAlign="center" paddingBottom={2}>Duck’s Journaling</Typography>
                        <Typography variant="body2" maxWidth={{md: 800, xs: "auto"}} fontSize={{ md: 16, xs: 14 }} textAlign={"center"} color={"#A8A628"} paddingBottom={4} >Improve English with interactive journaling. Write in English, get corrections and feedback.</Typography>

                        <Paper sx={styles.components.paper}>
                                <Box sx={styles.components.box}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h3" sx={styles.typography.h3} paddingRight={2}>{question}</Typography>

                                        {!reviewData.value ?

                                        <Fab size="small" color="primary" aria-label="New Question" sx={{ minWidth: "40px" }} onClick={changeQuestion}>
                                            <img src={arrows} alt="arrows-rotate" style={imageStyle} />                                    
                                        </Fab>

                                        : "" }
                                    </Stack>
                                </Box>
                        </Paper>

                        {!reviewData.value ?

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Paper sx={styles.components.paper}>
                                    <Box sx={styles.components.box}>
                                        <FormControl fullWidth>
                                            <Field as={TextField} multiline maxRows={5} variant="standard" type="text" name="input" inputProps={{ minLength: 100, maxLength: 400 }} id="form-input" placeholder="Write here..." required />
                                        </FormControl>      
                                    </Box>
                                </Paper>

                                <LoadingButton fullWidth type="submit" variant="contained" size="large" color="primary" loading={isSubmitting} disabled={isSubmitting}
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

                        : "" }

                        {reviewData.value ?
                        
                        <Paper sx={styles.components.paper}>
                                <Box sx={styles.components.box}>
                                    <Stack spacing={2}>
                                        <Typography variant="h3" sx={styles.typography.h3} paddingRight={2}>Original:</Typography>
                                        <Typography variant="body1" sx={styles.typography.body1} paddingRight={2}>{reviewData.input}</Typography>
                                        <Divider />
                                        <Typography variant="h3" sx={styles.typography.h3} paddingRight={2}>Corrected Version:</Typography>
                                        <Typography variant="body1" sx={styles.typography.body1} paddingRight={2}>{reviewData.correctedText}</Typography>
                                        <Divider />
                                        <Typography variant="h3" sx={styles.typography.h3} paddingRight={2}>Feedback:</Typography>
                                        <List>
                                            {reviewData.feedback.map((item, index) => (
                                                <ListItem sx={{ fontFamily: "Poppins", fontSize: { md: 16, xs: 14 }, fontWeight: 400, color: "#8C8C8C" }} key={index}>
                                                    <ListItemIcon sx={{ fontSize: 20, minWidth: 0, paddingRight: 1 }}>👉</ListItemIcon>
                                                    {item}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Stack>
                                </Box>
                        </Paper>

                        : "" }

                        <Typography variant="body2" fontSize={{ md: 20, xs: 16 }} textAlign={"center"} fontFamily={'Pacifico'} color={"#B9B723"} paddingTop={4} >Made by DuckBloof</Typography>
                    </Stack>
                </Grid>
            </Container>
        </Box>
    )
}

export default Journaling