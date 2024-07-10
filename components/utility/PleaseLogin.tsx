import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function PleaseLogin() {
    return (
        <section className="flex items-center h-screen p-16 dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                        <span className="sr-only">Error</span>401
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">
                        Please login to access this page.
                    </p>
                    <p className="mt-4 mb-8 dark:text-gray-600">
                        You need to be logged in to view the content on this
                        page. Please log in or go back to the homepage.
                    </p>
                    <div className="flex justify-center">
                        <div className="flex space-x-10 mx-auto">
                            <Button onClick={() => signIn()}>Login</Button>

                            <Link href="/">
                                <Button>Back to homepage</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
