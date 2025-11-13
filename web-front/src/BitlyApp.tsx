import { useState } from "react"
import useBackend from "./hooks/useBackend"



function BitlyApp() {

    const [count, setCount] = useState(0)
    const [inputValue, setInputValue] = useState("https://www.google.com/")

    const { loading, error, short_url, send } = useBackend()



    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setCount(count+1)
        send(inputValue)
    }



    return (
        <>
            <div className="logo">
                Here is the logo of the app
            </div>

            <div className="form">
                Please enter a url that you desire to shorten
                <form onSubmit={handleSubmit}>
                    <input disabled={loading} value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/>
                    <button disabled={loading}>Shorten</button>
                </form>
            </div>

            <div className="messages">
                <div className="loading">{ loading ? "Loading . . ." : null }</div>
                <div className="error">{ error ? ("There was an error: " + error) : null }</div>
            </div>

            <div className="result">
                <div>{short_url}</div>
                <button disabled={!short_url} onClick={() => {if(short_url) window.open(short_url, "_blank")}}>GOTO</button>
                <button disabled={!short_url} onClick={() => {if(short_url) navigator.clipboard.writeText(short_url)}}>COPY</button>
            </div>

        </>
    )
}

export default BitlyApp