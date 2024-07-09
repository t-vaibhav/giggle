// App.tsx
"use client";
import React from "react";
import useDownloader from "react-use-downloader";
import { Download } from "lucide-react";
import CircularProgressBar from "@/components/utility/CircularProgressBar";

const App: React.FC = () => {
    const { size, elapsed, percentage, download, cancel, error, isInProgress } =
        useDownloader();

    const fileUrl =
        "https://files.edgestore.dev/a9niqqui7m8monub/publicFiles/_public/b80e5869-c61f-4c3d-81d7-9360b3dd7e2f.mp4";
    const filename = "beautiful-carpathia.mp4";

    return (
        <div className="App pt-24">
            {isInProgress ? (
                <CircularProgressBar percentage={percentage} />
            ) : (
                <Download
                    size={40}
                    onClick={() => download(fileUrl, filename)}
                    className="cursor-pointer border rounded-full p-1"
                />
            )}
        </div>
    );
};

export default App;
