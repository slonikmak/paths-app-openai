import {openai} from "@/libs/openai";
import {prompts} from "@/app/components/Prompts/Prompts";
import OpenAI from "openai";
import ImageGenerateParams = OpenAI.ImageGenerateParams;

export const dynamic = 'force-dynamic' // defaults to force-static
export const runtime = 'edge';

const getPrompt = (fillings: string): ImageGenerateParams => {
    return {
        model: "dall-e-3",
        prompt: "Сгенерируй  визуализацию моих чувств и мыслей, связанных с восхождением на гору Румия, которые я приведу ниже.\n" +
            "ОПИСАНИЕ ГОРЫ Румия:\n" +
            "Гора Румия (1594 м над уровнем море) — самая высокая гора Барской општины Черногории." +
            "О многих горах Черногории рассказывают легенды. Чаще всего они не выходят за пределы ближайшей местности. Но есть вершины, о которых слышали буквально все. " +
            "И, наверное, самая известная — гора Румия. " +
            "Недаром город Бар, рядом с которым она расположена, часто называют «град под Румией». " +
            "И эта слава тянется в глубины веков, ведь уже 900 лет существует традиция паломничества на вершину. " +
            "Виды, открывающиеся оттуда во все стороны, совершенно фантастические (говорят, что при благоприятных погодных условиях виден итальянский берег! — мне не повезло, не видел…).\n " +
            "МОИ МЫСЛИ И ЧУВСТВА:\n" +
            fillings + "\n" +
            "\n" +
            "ВАЖНО: Используй любые изобразительные средства, подчёркивающие красоту и величие горы, а также мои чувства из пункта 'МОИ МЫСЛИ И ЧУВСТВА'." ,
        style: 'natural',
        size: "1024x1024"
    }
}


export async function GET(request: Request,
                          { params }: { params: { slug: string } }) {

    console.log(`Received request to id ${params.slug}`)

    // This encoder will stream your text
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
        async start(controller) {
            // Enqueue the first chunk
            controller.enqueue(encoder.encode(`First Chunk ${params.slug}`));

            const res = await openai.images.generate(getPrompt(prompts[params.slug]))

            console.log(res)


            controller.enqueue(encoder.encode(res.data[0].url));

            controller.close();

        },
    });

    return new Response(customReadable, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
}