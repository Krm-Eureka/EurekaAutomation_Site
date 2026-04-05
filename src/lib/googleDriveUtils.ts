/**
 * Utility to convert Google Drive sharing links to direct image links
 * Supported formats:
 * - https://drive.google.com/file/d/[ID]/view?usp=sharing
 * - https://drive.google.com/open?id=[ID]
 * - https://drive.google.com/uc?id=[ID]
 */
export function getGoogleDriveDirectLink(url: string): string {
    if (!url) return "";
    
    // If it's already a direct link or a local path, return as is
    if (!url.includes("drive.google.com") || url.includes("lh3.googleusercontent.com")) {
        return url;
    }

    try {
        let fileId = "";
        
        // Pattern 1: /file/d/[ID]/view
        const matchFileD = url.match(/\/file\/d\/([^/?]+)/);
        if (matchFileD) {
            fileId = matchFileD[1];
        } else {
            // Pattern 2: ?id=[ID]
            const urlParams = new URL(url);
            fileId = urlParams.searchParams.get("id") || "";
        }

        if (fileId) {
            // Updated high-quality direct link format
            return `https://lh3.googleusercontent.com/d/${fileId}`;
        }
    } catch (e) {
        console.error("Error parsing Google Drive URL:", url, e);
    }

    return url;
}

/**
 * Process content strings to handle inline GRID: tags with Google Drive links
 */
export function processNewsContent(content: string[] | string): string[] {
    const lines = Array.isArray(content) ? content : [content];
    
    return lines.map(line => {
        if (line.startsWith("GRID:")) {
            const urls = line.replace("GRID:", "").split(",").map(u => u.trim());
            const directUrls = urls.map(u => getGoogleDriveDirectLink(u));
            return `GRID:${directUrls.join(",")}`;
        }
        return line;
    });
}
