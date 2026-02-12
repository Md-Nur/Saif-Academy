export async function uploadToImgBB(file: File): Promise<string | null> {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB;
    if (!apiKey) {
        console.error("ImgBB API key not found");
        return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
            return data.data.url;
        } else {
            console.error("ImgBB Upload Failed:", data.error);
            return null;
        }
    } catch (error) {
        console.error("ImgBB Upload Error:", error);
        return null;
    }
}
