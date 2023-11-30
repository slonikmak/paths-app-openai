'use client'

import styles from "@/app/page.module.css";
import React, {useEffect, useState} from "react";
import FadeLoader from "react-spinners/ClipLoader";

export default function Page({ params }: { params: { slug: string } }) {

    console.log("Start")

    const [response, setResponse] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        chatCompletion()
    },[])

    async function chatCompletion() {

        console.log("Click")

        const response = await fetch(`/api/path/${params.slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }

        });

        if (!response.body) {
            console.error("No response body");
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
            result += decoder.decode(value, { stream: true });
        }

        result += decoder.decode(); // End of stream
        console.log(result)
        setResponse(result.split("link:")[1].trim())
        setIsLoading(false)
    }

    return (
        <main className={styles.main}>
            {isLoading ? (
                <FadeLoader
                    color={"blue"}
                    loading={isLoading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div>
                    <img src={response} alt="Generated image" width={"100%"} height={"100%"}/>
                </div>
            )}
        </main>
    )
}