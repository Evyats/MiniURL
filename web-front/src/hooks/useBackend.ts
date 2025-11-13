import { useState } from "react"


function useBackend() {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [short_url, setResponse] = useState<string | null>(null)


    const send = async (long_url: string) => {
        try {
            setLoading(true);
            setError(null);
            setResponse(null);

            const res = await fetch(
                "http://localhost:8002/api/links",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ long_url })
                }
            );

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const data = await res.json();
            setResponse("http://localhost:8004/" + data.id);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return { loading, error, short_url, send }
}


export default useBackend