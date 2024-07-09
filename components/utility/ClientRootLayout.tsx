// ClientRootLayout.tsx
"use client";

import { Inter } from "next/font/google";
import Navbar from "@/components/utility/Navbar";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { usePathname } from "next/navigation";
import SessionWrapper from "@/app/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function ClientRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();
    return (
        <>
            {path.startsWith("/search") ? (
                <SessionWrapper>
                    <body className={inter.className}>
                        <EdgeStoreProvider>{children}</EdgeStoreProvider>
                    </body>
                </SessionWrapper>
            ) : (
                <SessionWrapper>
                    <body className={inter.className}>
                        <EdgeStoreProvider>
                            <Navbar />
                            {children}
                        </EdgeStoreProvider>
                    </body>
                </SessionWrapper>
            )}
        </>
    );
}
