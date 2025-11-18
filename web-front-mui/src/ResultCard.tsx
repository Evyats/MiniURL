import { Box, Button, Card, Chip, Divider, Stack, Typography } from "@mui/material";


type Props = {
    short_url: string
}

export default function ResultCard({ short_url }: Props) {


    function handleGoto() {
        if (short_url) {
            window.open(short_url, "_blank")
        }

    }

    function handleCopy() {
        if (short_url) {
            navigator.clipboard.writeText(short_url)
        }
    }

    return (
        <Card variant="outlined" sx={{ m: 5 }} >
            <Box sx={{ p: 2 }}>
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        Done Successfully!
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {/* $4.50 */}
                    </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Note that the short link will be available for 24 hours.
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Chip label={short_url} size="medium" color="primary" />
                    <Button onClick={handleGoto} variant="outlined" size="small" disableElevation sx={{ borderRadius: 10 }}>GOTO</Button>
                    <Button onClick={handleCopy} variant="outlined" size="small" disableElevation sx={{ borderRadius: 10 }}>COPY</Button>
                </Stack>
            </Box>
        </Card>
    )
}