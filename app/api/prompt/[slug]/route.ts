import {prompts} from "@/app/components/Prompts/Prompts";

export async function GET(request: Request,
                          { params }: { params: { slug: string } }) {

    const data = prompts[params.slug + params.slug];

    return new Response(data);
}