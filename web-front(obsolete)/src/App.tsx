import { useState } from "react"
import useBackend from "./hooks/useBackend"
import { Box, Button, Text, Flex, Input, Spinner } from "@chakra-ui/react"





function App() {

    const [count, setCount] = useState(0)
    const [inputValue, setInputValue] = useState("https://www.google.com/")

    const { loading, error, short_url, send } = useBackend()



    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        setCount(count + 1)
        send(inputValue)
    }



    return (
        <>
            <Flex align="center" justify="center" h="100vh">
                <Box w="400px" h="300px" bg="gray.500" p={4} rounded="xl">



                    <Box className="logo">
                        Here is the logo of the app
                    </Box>


                    <Text>Please enter a url that you desire to shorten</Text>
                    <Flex className="form" direction="row" gap={2}>
                        <Input disabled={loading} value={inputValue} rounded="2xl" onChange={(e) => { setInputValue(e.target.value) }} />
                        <Button disabled={loading} onClick={handleSubmit} rounded="2xl">Shorten</Button>
                    </Flex>

                    <Box className="messages">
                        <Box className="loading">{loading ? <Spinner /> : null}</Box>
                        <Box className="error">{error ? ("There was an error: " + error) : null}</Box>
                    </Box>

                    <Box className="result">
                        <Box>{short_url}</Box>
                        <Button disabled={!short_url} onClick={() => { if (short_url) window.open(short_url, "_blank") }}>GOTO</Button>
                        <Button disabled={!short_url} onClick={() => { if (short_url) navigator.clipboard.writeText(short_url) }}>COPY</Button>
                    </Box>



                </Box>
            </Flex>
        </>
    )
}

export default App