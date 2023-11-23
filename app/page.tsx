'use client'

import styles from './page.module.css'
import {useState} from "react";


export default function Home() {

  const [response, setResponse] = useState<string | undefined>("")

  async function chatCompletion() {
    /*const res = await openai.chat.completions.create({
      messages: [{role: 'user', content: 'Say some things'}],
      model: 'gpt-3.5-turbo',
    });*/

      console.log("Click")

      const response = await fetch("/api", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }

      });

      const data = await response.json();

    console.log(data)

    setResponse(data)
  }



  return (
    <main className={styles.main}>
      <h1>KKKKKK</h1>
      <div><img src={response}/></div>
      <button onClick={chatCompletion}>Click</button>
    </main>
  )
}
