'use client'

import styles from "@/app/page.module.css";
import React, {useEffect, useState} from "react";
import FadeLoader from "react-spinners/ClipLoader";

export default function Page({ params }: { params: { slug: string } }) {

    console.log("Start")

    const [response, setResponse] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [prompt, setPrompt] = useState<string>("")

    useEffect(() => {
        chatCompletion()
    },[])

    async function chatCompletion() {

        const promptResponse = await fetch(`/api/prompt/${params.slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const promptResult = await promptResponse.text()

        setPrompt(promptResult)

        const response = await fetch(`/api/path/${params.slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.body) {
            console.error("No response body");
            setIsLoading(false);
            setResponse("Something went wrong. Please retry.")
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }

            const str = decoder.decode(value, { stream: true });
            console.log(str);
            if (str.startsWith("Waiting")) {

                if (str.includes("ChatGPT")) {
                    setResponse("Waiting for a ChatGPT response...");
                } else if (str.includes("DAL")) {
                    setResponse("Waiting for a DALLE response...")
                }

            }
            result += str;
        }

        if(!response.ok) {
            console.error("Not ok");
            setIsLoading(false);
            setResponse("Something went wrong. Please retry.")
            return;
        }

        result += decoder.decode(); // End of stream
        console.log(result)
        setResponse(result.split("link:")[1].trim())
        setIsLoading(false)
    }

    return (
        <main className={styles.main}>
            {isLoading ? (
                <>
                <FadeLoader
                    color={"blue"}
                    loading={isLoading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                    <div className={styles.prompt} >{prompt}</div>
                    <div className={styles.status}>{response}</div>
                </>
            ) : (
                <div>
                    <img src={response} alt="Generated image" width={"100%"} height={"100%"}/>
                </div>
            )}
        </main>
    )
}