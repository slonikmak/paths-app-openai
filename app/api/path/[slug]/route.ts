import {openai} from "@/libs/openai";
import {createChatPrompt, createImgPrompt, prompts} from "@/app/components/Prompts/Prompts";

export const dynamic = 'force-dynamic' // defaults to force-static
export const runtime = 'edge';


export async function GET(request: Request,
                          { params }: { params: { slug: string } }) {

    console.log(`Received request to id ${params.slug}`)

    // This encoder will stream your text
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
        async start(controller) {
            // Enqueue the first chunk
            controller.enqueue(encoder.encode(`First Chunk ${params.slug}`));

            const completion = await openai.chat.completions.create(createChatPrompt(prompts[params.slug]));

            const resultPrompt: string = completion.choices[0].message?.content != null ? completion.choices[0].message?.content : "Something went wrong!!!"

            console.log(resultPrompt.replace("Prompt for DALLE-3:", ""))

            const res = await openai.images.generate(createImgPrompt(resultPrompt))

            console.log(res)


            controller.enqueue(encoder.encode(res.data[0].url));

            controller.close();

        },
    });

    return new Response(customReadable, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
}