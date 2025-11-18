import { Alert, Box, Button, Card, Chip, Collapse, Container, Divider, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import Send from '@mui/icons-material/Send';
import useBackend from "./hooks/useBackend";
import { useState } from "react";
import ResultCard from "./ResultCard";


export default function App3() {

    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState(false)
    const { loading, error, short_url, send } = useBackend()

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        if(inputValue == ""){
           setInputError(true)
        }
        else {
            send(inputValue)
            setInputValue("")
        }
    }

    return (
        <Container maxWidth="sm" >
            <Paper elevation={2} sx={{ my: 5, p: 2, bgcolor: 'grey.50', borderRadius: 5 }}>
                <Typography variant="h5" gutterBottom>URL Shortener</Typography>
                <Typography variant="body2">Please enter a URL you desire to shorten</Typography>
                <Stack direction="row" sx={{ p: 2 }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="URL"
                        placeholder="https://www.google.com/"
                        disabled={loading}
                        error={inputError}
                        helperText={inputError ? "Empty URL" : ""}
                        onChange={(event) => setInputValue(event.target.value)}
                        onFocus={() => setInputError(false)}
                        value={inputValue}
                    />
                    <IconButton size="large" color="primary" onClick={handleSubmit} loading={loading}>
                        <Send fontSize="inherit" />
                    </IconButton>
                </Stack>
                {
                    error != null &&
                    <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>
                }
            </Paper>

            { short_url && <ResultCard short_url={short_url}></ResultCard> }

        </Container>
    )
}