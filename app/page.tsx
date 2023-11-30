'use client'

import styles from './page.module.css'
import {useState} from "react";


export default function Home() {

  const [response, setResponse] = useState<string | undefined>("")

    async function chatCompletion() {

        console.log("Click")

        const response = await fetch("/api", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }

        });

        //const data = await response.json();

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
    }



  return (
    <main className={styles.main}>
      <h1>KKKKKK</h1>
      <div><img src={response}/></div>
      <button onClick={chatCompletion}>Click</button>
    </main>
  )
}
