'use client'

import styles from "@/app/page.module.css";
import React, {useEffect, useState} from "react";
import FadeLoader from "react-spinners/ClipLoader";

export default function Page({ params }: { params: { slug: string } }) {

    console.log("Start")

    const [response, setResponse] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [prompt, setPrompt] = useState<string>("")

    useEffect(() => {
        chatCompletion()
    },[])

    function error(msg: string) {
        setIsLoading(false)
        setIsError(true)
        setResponse(msg)
    }

    async function chatCompletion() {

        try {
            const num = parseInt(params.slug)
            if (num < 1 || num > 10) {
                error("This page does not exist.")
                return;
            }
        } catch (e) {
            console.log(e)
            error("Something went wrong. Please retry.")
            return;
        }

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
            error("Something went wrong. Please retry.");
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
            console.log("Not ok")
            error("Something went wrong. Please retry.");
            return;
        }

        result += decoder.decode(); // End of stream
        console.log(result)
        setResponse(result.split("link:")[1].trim())
        setIsLoading(false)
    }

    if (isError) {
        return (
            <main className={styles.main}>
            <div className={styles.error}> {/* You need to define this error style */}
                {response}
            </div>
            </main>
        );
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