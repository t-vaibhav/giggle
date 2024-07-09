"use client";
import React from "react";
import useDownloader from "react-use-downloader";
import { Download } from "lucide-react";
import CircularProgressBar from "@/components/utility/CircularProgressBar";

interface DownloadButtonProps {
    url: string;
    name: string;
    dark?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
    url,
    name,
    dark = false,
}) => {
    const { size, elapsed, percentage, download, cancel, error, isInProgress } =
        useDownloader();

    const fileUrl = url;
    const filename = name;

    return (
        <div>
            {isInProgress ? (
                <CircularProgressBar percentage={percentage} />
            ) : (
                <Download
                    size={32}
                    onClick={() => download(fileUrl, filename)}
                    className={`cursor-pointer border-2 rounded-full p-1 ${
                        dark ? "text-gray-100 bg-gray-800" : "text-gray-100"
                    }`}
                />
            )}
        </div>
    );
};

export default DownloadButton;
