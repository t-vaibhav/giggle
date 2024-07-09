interface MediaProps {
    url: string;
}

const extractFileExtension = (url: string): string | null => {
    const match = url.match(/\.(\w+)$/);
    return match ? match[1] : null;
};

export default extractFileExtension;
