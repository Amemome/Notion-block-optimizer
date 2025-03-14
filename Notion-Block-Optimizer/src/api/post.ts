const mypage = "https://notion-block-optimizer.vercel.app/";

export async function pushToNotion(apiKey: string, pageId: string) {
    try {
        const response = await fetch(`${mypage}/api/notion-push`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ apiKey, pageId }),
    });

    return await response.json();
    } catch (error) {
        console.error("Error pushing to Notion:", error);
        return { error: "Failed to push to Notion" };
    }
}