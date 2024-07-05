import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const messages = [
    "Loading, please wait...",
    "Fetching data...",
    "Almost there...",
    "Hang tight, we're getting things ready...",
    "Just a moment, setting things up...",
    "We appreciate your patience...",
    "Preparing your experience...",
    "Getting things ready for you...",
    "Hold on, we're almost done...",
    "Loading resources...",
];

type Props = {
    message?: string;
};

export default function LoadingScreen({ message }: Props) {
    const [currentMessage, setCurrentMessage] = useState(
        message || messages[0]
    );
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % messages.length);
                setFade(true);
            }, 500); // Time for fade-out transition
        }, 5000); // Change message every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        setCurrentMessage(messages[index]);
    }, [index]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <div className="flex w-full justify-center">
                    <Spinner />
                </div>
                <h3
                    className={`text-center font-semibold text-3xl transition-opacity duration-500 mt-3 ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {currentMessage}
                </h3>
            </div>
        </div>
    );
}
