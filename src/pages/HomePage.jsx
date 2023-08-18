import { Box, Container, Divider, Fab, FormControl, Grid, List, ListItem, ListItemIcon, Paper, Stack, TextField, Typography } from "@mui/material"
import arrows from "../assets/arrows-rotate.svg"
import { useState } from "react"
import journalingQuestions from "../utils/journalingData"
import { Formik, Form, Field } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import "./styles/HomePage.css"
import { openai } from "../api/openai";

function Home() {

    const randomIndex = Math.floor(Math.random() * (journalingQuestions.length - 1));

    const [question, setQuestion] = useState(journalingQuestions[randomIndex])
    const [rotationAngle, setRotationAngle] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviewData, setReviewData] = useState({
        value: false,
        input: "",
        correctedText: "",
        feedback: ""
    });

    const imageStyle = {
        transform: `rotate(${rotationAngle}deg)`,
        transition: "0.5s"
    };

    function generateQuestion() {
        setRotationAngle(rotationAngle + 365);
        setQuestion(journalingQuestions[randomIndex + 1]);
    }

    const handleSubmit = async ( values) => {

        setIsSubmitting(true)
        
        const { content } = values;

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `
            
            You will be provided with a paragraph that may contain errors or non-standard English. Your goal is to rephrase each sentence in proper standard English and provide a specific description of the modifications you made to the original paragraph. Please structure your response as shown below:

            {
                "corrected_text": "CORRECTED_VERSION",
                "feedback": [
                    "Explanation of change...",
                    "Explanation of change...",
                    "Explanation of change...",
                    ...
                ]
            }

            Paragraph:

            ${content}

            ` }],
            model: 'gpt-3.5-turbo',
            max_tokens: 300,
            temperature: 0.8
        });

        const response = JSON.parse(completion.choices[0].message.content)

        setReviewData({
            value: true,
            input: content,
            correctedText: response.corrected_text,
            feedback: response.feedback
        })

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
                                <Typography variant="h4" fontSize={{ md: 18, xs: 16 }} lineHeight={1.5} fontWeight={500} paddingRight={2} >{question}</Typography>

                                {reviewData.value == false ?
                                
                                <Fab size="small" color="primary" aria-label="New Question" sx={{ minWidth: "40px" }}onClick={generateQuestion} >
                                    <img src={arrows} alt="arrows-rotate" style={imageStyle} />
                                </Fab>
                                
                                : "" }

                            </Box>
                        </Paper>

                        {reviewData.value == false ? 

                            <Formik 
                                initialValues={initialValues}
                                onSubmit={handleSubmit} >
                                <Form>
                                    <Paper sx={{ width: { md: 800, xs: "auto" } }}>
                                        <Box padding={4} alignItems="center" justifyContent="space-between" sx={{ display: "flex" }} >
                                            <FormControl fullWidth>
                                                <Field as={TextField} multiline rows={5} variant="standard" type="text" name="content" inputProps={{ minLength: 100, maxLength: 400 }} id="content-input" required />
                                            </FormControl>                                        
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

                        : ""}

                        {reviewData.value ? 
                                
                            <Paper sx={{ width: { md: 800, xs: "auto" } }}>
                                <Box padding={4} alignItems="center" justifyContent="space-between" >
                                    <Stack spacing={2} >
                                        <Typography variant="h4" fontSize={{ md: 18, xs: 16 }} lineHeight={1.5} fontWeight={500} paddingRight={2} >Original:</Typography> 
                                        <Typography variant="h4" fontSize={{ md: 16, xs: 14 }} lineHeight={1.5} fontWeight={400} paddingRight={2} color={"#8C8C8C"} >{reviewData.input}</Typography>
                                        <Divider></Divider>
                                        <Typography variant="h4" fontSize={{ md: 18, xs: 16 }} lineHeight={1.5} fontWeight={500} paddingRight={2} >Corrected Version:</Typography> 
                                        <Typography variant="h4" fontSize={{ md: 16, xs: 14 }} lineHeight={1.5} fontWeight={400} paddingRight={2} color={"#8C8C8C"} >{reviewData.correctedText}</Typography>
                                        <Divider></Divider>
                                        <Typography variant="h4" fontSize={{ md: 18, xs: 16 }} lineHeight={1.5} fontWeight={500} paddingRight={2} >Feedback:</Typography> 
                                        <List>
                                            {reviewData.feedback.map((item, index) => (
                                                <ListItem sx={{ fontFamily: "Poppins", fontSize: { md: 16, xs: 14 }, fontWeight: 400, color: "#8C8C8C" }} key={index}>
                                                    <ListItemIcon>
                                                        <i className="material-icons">👉</i>
                                                    </ListItemIcon>
                                                    {item}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Stack>                  
                                </Box>
                            </Paper>

                        : ""}

                        <Typography variant="h4" fontSize={{ md: 20, xs: 16 }} textAlign={"center"} fontFamily={'Pacifico'} color={"#B9B723"} paddingTop={4} >Made by DuckBloof</Typography>
                    </Stack>
                </Grid>
            </Container>
        </Box>
    )
}

export default Home