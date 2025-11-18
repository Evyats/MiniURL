import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Slider from '@mui/material/Slider';
import PopoverMenu from './PopoverMenu';
import ProTip from './ProTip';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { AppBar, Card, Paper, Toolbar } from '@mui/material';
import Stack from '@mui/material/Stack';






function App2() {


    const colorFamilies = ["primary", "secondary", "error", "warning", "info", "success"];
    const shades = ["light", "main", "dark", "contrastText"];


    return (

        // sizes: xs, sm, md, lg, xl, false
        <Container maxWidth="sm" sx={{ backgroundColor: 'primary.main', mt: 5 }}>
            
            <AppBar sx={{bgcolor: 'secondary.main'}}>AppBar</AppBar>
            <Box>This is a Box</Box>
            <Card>This is a Card</Card>
            
            <Paper elevation={10} sx={{m: 3}}>Paper</Paper>
            <Paper variant="outlined" sx={{m: 3}}>Paper</Paper>
            <Paper variant="outlined" sx={{m: 3}}>Paper</Paper>


            {/* Stack interactive demo: */}
            {/* https://mui.com/material-ui/react-stack/#interactive-demo */}
            <Stack direction="row" spacing={4} sx={{ justifyContent: "center" }}>
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
            </Stack>

            {/* Colors: */}
            <Stack spacing={2} sx={{my: 10}}>
                {colorFamilies.map((family) => (
                    <Stack key={family} direction="row" spacing={2} sx={{justifyContent: 'space-between'}}>
                        {shades.map((shade) => {
                            const token = `${family}.${shade}`;
                            return (
                                <Card key={`${family}.${shade}`} sx={{ bgcolor: token, p: 2 }}>
                                    <Typography>{token}</Typography>
                                </Card>
                            );
                        })}
                    </Stack>
                ))}
            </Stack>

        </Container>
    )
}

export default App2