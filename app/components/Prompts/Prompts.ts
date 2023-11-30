import OpenAI from "openai";
import ImageGenerateParams = OpenAI.ImageGenerateParams;
import ChatCompletionCreateParamsNonStreaming = OpenAI.ChatCompletionCreateParamsNonStreaming;

export const prompts: { [key: string]: string } = {
    "1": "I begin my ascent from the valley, not far from the monastery of Sergei of Radonezh. The path goes through the forest crossing stone rubble. It seems that walking is easy and pleasant.",
    "11": "Я начинаю подъём из долины, недалеко от монастыря Сергея Радонежского. Тропа идёт через лес пересекая каменные завалы. Кажется что идти легко и приятно.",
    "2": "The forest around gives a pleasant coolness. I try to walk quickly and the climb is quite steep and I get tired quickly. The thought is spinning in my head: why did I cross the court, because there were things to do at home.",
    "22": "Лес вокруг даёт приятную прохладу. Я стараюсь идти быстро и подъём достаточно крут и я быстро устаю. В голове крутиться мысль: зачем я суда попёрся, ведь дома были дела.",
    "3": "The first stop is a large spreading oak tree with a tourist marker on the border of the forest. I'm so tired that I feel like I can't go any further. My heart is pounding and I am short of breath.",
    "33": "Первая остановка - большой раскидистый дуб с туристической меткой на границе леса. Я так сильно устал что чувствую - дальше идти не смогу. Сердце колотиться и не хватает дыхания.",
    "4": "Further, the trail leaves the forest and follows rocky rubble. Sometimes the path gets lost and I have to look for the right road. I'm so absorbed in finding the way that I stop noticing my fatigue.",
    "44": "Далее тропа выходит из леса и следует по каменистым завалам. Иногда тропа теряется я мне приходиться искать правильную дорогу. Я так поглощён поиском пути что перестаю замечать усталость.",
    "5": "Small loose pebbles appear on the paths. It's harder to walk. Suddenly I realize that my body has gone into offline mode and is calmly going up. It seems like I can go on forever. Apparently this is called a second wind.",
    "55": "На тропинках появляется мелкая сыпучая галька. Идти труднее. Вдруг я понимаю, что моё тело перешло в автономный режим и спокойно идёт вверх. Кажется что я могу идти бесконечно. Похоже, это называется второе дыхание.",
    "6": "The rocks that precede the pass are visible. Your head becomes clearer and thoughts flow on their own. I can watch them and not participate in any way. This is the state for which I go to the mountain.",
    "66": "Видны скалы, которые предшествуют перевалу. В голове проясняется и мысли текут сами по себе. Я могу наблюдать за ними и никак не участвовать. Это то состояние, ради которого я хожу на гору.",
    "7":"It seemed that the pass was behind the nearest slope, but this was not the case. Beyond the slope is the next slope. The air is filled with the smell of thyme.",
    "77":"Казалось, что перевал за ближайшем склоном, но это не так. За склоном следующий склон. Воздух наполнен запахом чабреца.",
    "8":"From the pass you can look at the other side of the ridge. There is a grandiose view of Lake Skadar and the Albanian high mountains. I don’t stop so as not to lose momentum.",
    "88":"С перевала можно заглянуть на ту сторону хребта. Открывается грандиозный вид на Скадарское озеро и албанские высокие горы. Не останавливаюсь чтобы не терять темп.",
    "9":"The final push to the top takes forever. The body refuses to increase the pace; it moves on its own, as do the thoughts in the head.",
    "99":"Последний рывок до вершины тянется бесконечно долго. Тело отказывается увеличить темп, оно двигается само по себе как и мысли в голове.",
    "10": "I briefly enjoy the play of clouds at the top and run down empty and light.",
    "101": "Недолго наслаждаюсь игрой облаков на вершине и пустой и лёгкий бегу вниз."
}

export const createImgPrompt = (prompt: string): ImageGenerateParams => {

    return {
        model: "dall-e-3",
        prompt: `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: ${prompt}`,
        style: 'natural',
        size: "1024x1024"
    }

    /*return {
        model: "dall-e-3",
        prompt: `You are a well-known digital artist who understands the world of art. Your task is to generate a request to the DALLE-3 model to generate an image. I will offer you text in the 'USER TEXT' section, which you must turn into an image using DALLE-3. Use any expressive tools. Choose the appropriate picture style: photography, collage, painting, sketch, animation. When creating a request, follow the recommendations.
        Basic DALLE3 Prompt Tips:
    Be Specific and Detailed: The more specific your prompt, the better the image quality. Include details like the setting, objects, colors, mood, and any specific elements you want in the image.
        Mood and Atmosphere: Describe the mood or atmosphere you want to convey. Words like “serene,” “chaotic,” “mystical,” or “futuristic” can guide the AI in setting the right tone.
        Use Descriptive Adjectives: Adjectives help in refining the image. For example, instead of saying “a dog,” say “a fluffy, small, brown dog.”
Consider Perspective and Composition: Mention if you want a close-up, a wide shot, a bird’s-eye view, or a specific angle. This helps in framing the scene correctly.
        Specify Lighting and Time of Day: Lighting can dramatically change the mood of an image. Specify if it’s day or night, sunny or cloudy, or if there’s a specific light source like candlelight or neon lights.
        Incorporate Action or Movement: If you want a dynamic image, describe actions or movements. For instance, “a cat jumping over a fence” is more dynamic than just “a cat.”
Avoid Overloading the Prompt: While details are good, too many can confuse the AI. Try to strike a balance between being descriptive and being concise.
        Use Analogies or Comparisons: Sometimes it helps to compare what you want with something well-known, like “in the style of Van Gogh” or “resembling a scene from a fantasy novel.”
Specify Desired Styles or Themes: If you have a particular artistic style or theme in mind, mention it. For example, “cyberpunk,” “art deco,” or “minimalist.”
Iterative Approach: Sometimes, you may not get the perfect image on the first try. Use the results to refine your prompt and try again.
        USER TEXT:
        Generate an image from the description of Mount Rumia and my feelings and thoughts associated with climbing this mountain.
        This is the description of Mount Rumia:
        Mount Rumia (1594 m above sea level) is the highest mountain in the Bar region of Montenegro. Ascent from 964 m above sea level, i.e. total elevation gain is 630 m. Route length is 2.2 km. Legends are told about many mountains of Montenegro. Most often they do not go beyond the immediate area. But there are peaks that literally everyone has heard of. And probably the most famous is Mount Rumia. It is not for nothing that the city of Bar, next to which it is located, is often called “the city of Rumia”. And this glory stretches into the depths of centuries, because for 900 years there has been a tradition of pilgrimage to the peak. The views from there in all directions are absolutely fantastic (they say that in favorable weather conditions you can see the Italian coast! - I was unlucky, I didn’t see it...), and therefore it deserves a visit, even if we ignore the historical and cultural significance.
        My thoughts and feelings:
        ${fillings}.` ,
        style: 'natural',
        size: "1024x1024"
    }*/
}

export const createChatPrompt = (fillings: string): ChatCompletionCreateParamsNonStreaming => {
    return {
        messages: [
            {"role": "system", "content": `I want you to act like a modern artist who has experience in creating works of art using artificial intelligence. I will give you instructions on how to make a prompt, a description of the place and the thoughts and feelings of the person located in this place. Your role is to develop a prompt for the DALLE-3 model so that it generates an image that best suits the instructions, the location of the action and the feelings and thoughts conveyed in request, using all your creative capabilities and experience of world art.`},
            {"role": "user", "content": `Instructions:
1. Be Specific and Detailed: The more specific your prompt, the better the image quality. Include details like the setting, objects, colors, mood, and any specific elements you want in the image.
2. Mood and Atmosphere: Describe the mood or atmosphere you want to convey. Words like “serene,” “chaotic,” “mystical,” or “futuristic” can guide the AI in setting the right tone.
3. Use Descriptive Adjectives: Adjectives help in refining the image. For example, instead of saying “a dog,” say “a fluffy, small, brown dog.”
4. Consider Perspective and Composition: Mention if you want a close-up, a wide shot, a bird’s-eye view, or a specific angle. This helps in framing the scene correctly.
5. Specify Lighting and Time of Day: Lighting can dramatically change the mood of an image. Specify if it’s day or night, sunny or cloudy, or if there’s a specific light source like candlelight or neon lights.
6. Incorporate Action or Movement: If you want a dynamic image, describe actions or movements. For instance, “a cat jumping over a fence” is more dynamic than just “a cat.”
7. Avoid Overloading the Prompt: While details are good, too many can confuse the AI. Try to strike a balance between being descriptive and being concise.
8. Use Analogies or Comparisons: Sometimes it helps to compare what you want with something well-known, like “in the style of Van Gogh” or “resembling a scene from a fantasy novel.”
9. Specify Desired Styles or Themes: If you have a particular artistic style or theme in mind, mention it. For example, “cyberpunk,” “art deco,” or “minimalist.”
The  description of the place:
This is the description of Mount Rumia:
Mount Rumia (1594 m above sea level) is the highest mountain in the Bar region of Montenegro. Ascent from 964 m above sea level, i.e. total elevation gain is 630 m. Route length is 2.2 km. Legends are told about many mountains of Montenegro. Most often they do not go beyond the immediate area. But there are peaks that literally everyone has heard of. And probably the most famous is Mount Rumia. It is not for nothing that the city of Bar, next to which it is located, is often called “the city of Rumia”. And this glory stretches into the depths of centuries, because for 900 years there has been a tradition of pilgrimage to the peak. The views from there in all directions are absolutely fantastic (they say that in favorable weather conditions you can see the Italian coast! - I was unlucky, I didn’t see it...), and therefore it deserves a visit, even if we ignore the historical and cultural significance.
My thoughts and feelings:
I am climbing to the Mount Rumia.
${fillings}`}
        ],
            model: "gpt-4",
        temperature: 0.5
    }
}