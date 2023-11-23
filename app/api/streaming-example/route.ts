// Can be 'nodejs', but Vercel recommends using 'edge'
export const runtime = 'edge';
// Prevents this route's response from being cached
export const dynamic = 'force-dynamic';

// This method must be named GET
export async function GET() {
    // This encoder will stream your text
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
        start(controller) {
            // Enqueue the first chunk
            controller.enqueue(encoder.encode('First Chunk '));

            // Use setTimeout to delay the second chunk
            setTimeout(() => {
                // Enqueue the second chunk after 1 second
                controller.enqueue(encoder.encode('Second Chunk'));

                // Close the stream
                controller.close();
            }, 15000); // 1000 milliseconds = 1 second
        },
    });

    return new Response(customReadable, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
}