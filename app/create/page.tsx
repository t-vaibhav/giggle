"use client";
import { users } from "@/db/schema/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Play, PlayCircleIcon, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { Progress } from "@/components/ui/progress";
import { SingleImageDropzone } from "@/components/utility/SingleImageDropzone";
import Spinner from "@/components/utility/Spinner";

const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/quicktime", // for .mov files
    "video/x-msvideo", // for .avi files
    "video/x-ms-wmv", // for .wmv files
    // add other video formats if needed
];

const formSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(50, "Title can have maximum 50 chars"),
    content: z.string().min(1, "Content is required"),
    tags: z.string().min(1, "Title is required"),
    requestFiles: z
        .array(
            z
                .instanceof(File)
                .refine(
                    (file) => file.size < 20 * 1024 * 1024,
                    "File size must be less than 20MB"
                )
                .refine(
                    (file) => allowedFileTypes.includes(file.type),
                    "Invalid file type. Only images and videos are allowed."
                )
        )
        .min(1, "Please select a file")
        .refine(
            (files) => files.every((file) => file.size < 20 * 1024 * 1024),
            "File size must be less than 20MB"
        )
        .refine(
            (files) =>
                files.every((file) => allowedFileTypes.includes(file.type)),
            "Invalid file type. Only images and videos are allowed."
        ),
});

export default function Home() {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [val, setVal] = useState(0);
    const { edgestore } = useEdgeStore();
    const session = useSession();
    const [fileUrl, setFileUrl] = useState("");
    const [fileType, setFileType] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [mediaLoading, setMediaLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const mediaLink = await handleUpload();
        console.log("link", mediaLink);
        const mediaData = {
            type: fileType,
            url: mediaLink,
        };
        const mediaResponse = await fetch("/api/add-media", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mediaData),
        });

        if (mediaResponse.status === 200) {
            const m = await mediaResponse.json();
            const postData = {
                mediaId: m.id,
                userId: session.data?.user.id,
                content: values.content,
                tags: values.tags ? values.tags.split(",") : [],
            };
            const response = await fetch("/api/add-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
            const result = await response.json();
            console.log(result);
            console.log("Create new post", values);

            // Reset the file input and clear form values
            setFile(undefined);
            setFileUrl("");
            setFileType("");
            form.reset(); // Assuming you're using `react-hook-form`
        } else {
            alert("Error in uploading media");
        }
        setLoading(false);
    }

    const handleUpload = async () => {
        console.log("file: ", file);
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                    console.log(progress);
                    setVal(progress);
                },
            });
            console.log(res);
            return res.url;
        }
    };
    return loading ? (
        <div className="h-screen w-screen relative">
            <div className="h-full w-full h- flex items-center justify-center bg-black/40 flex-col">
                <Spinner size="16" />
                <h6 className="text-3xl text-white mt-4 font-semibold">
                    Creating your post...
                </h6>
            </div>
        </div>
    ) : (
        <div className="space-y-3 mt-16 pt-16 max-w-screen-lg mx-auto gap-10">
            <div className="w-full">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 flex justify-between gap-10"
                    >
                        <div className="w-full">
                            <FormField
                                name="requestFiles"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="md:col-span-4 col-span-1">
                                        <FormLabel>Attach Files</FormLabel>
                                        <FormControl>
                                            <div>
                                                <input
                                                    type="file"
                                                    className="border-slate-300 hidden"
                                                    onChange={(e) => {
                                                        setMediaLoading(true);
                                                        const filesArray =
                                                            Array.from(
                                                                e.target
                                                                    .files || []
                                                            );
                                                        field.onChange(
                                                            filesArray
                                                        );

                                                        const selectedFile =
                                                            e.target.files?.[0];
                                                        setFile(selectedFile);
                                                        if (selectedFile) {
                                                            const url =
                                                                URL.createObjectURL(
                                                                    selectedFile
                                                                );
                                                            setFileUrl(url);
                                                            setFileType(
                                                                selectedFile.type
                                                            );
                                                        }
                                                        setMediaLoading(false);
                                                    }}
                                                    id="upload"
                                                />
                                                <label
                                                    htmlFor="upload"
                                                    className="col-span-4"
                                                >
                                                    <div className="w-full h-[400px] bg-[#e8e9e8] flex items-center justify-center rounded-3xl border-2 border-gray-400 border-dashed cursor-pointer">
                                                        {mediaLoading ? (
                                                            <Spinner />
                                                        ) : fileUrl ? (
                                                            fileType.startsWith(
                                                                "image/"
                                                            ) ? (
                                                                <img
                                                                    src={
                                                                        fileUrl
                                                                    }
                                                                    alt="File Thumbnail"
                                                                    className="object-cover h-full w-full rounded-3xl"
                                                                />
                                                            ) : fileType?.startsWith(
                                                                  "video/"
                                                              ) ? (
                                                                <div className="relative h-full w-full rounded-3xl">
                                                                    <video
                                                                        src={
                                                                            fileUrl
                                                                        }
                                                                        autoPlay
                                                                        loop
                                                                        className="object-cover h-full w-full rounded-3xl"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-3xl">
                                                                        <PlayCircleIcon className="h-16 w-16 text-white stroke-1 hover:scale-110 duration-200" />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    Invalid file
                                                                    type. Only
                                                                    images and
                                                                    videos are
                                                                    allowed.
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div>
                                                                <Upload className="mx-auto" />
                                                                <h1 className="px-4 text-center text-sm leading-tight pt-2">
                                                                    Choose a
                                                                    file or drag
                                                                    and drop it
                                                                    here
                                                                </h1>
                                                            </div>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Progress className="h-2 mt-4" value={val} />
                        </div>
                        <div className="space-y-8 w-full">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Apple"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter a title for your post
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Newton and apple, you know the relation..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the description for your post
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="tag1, tag2, tag3..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Add tags separated by commas.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
