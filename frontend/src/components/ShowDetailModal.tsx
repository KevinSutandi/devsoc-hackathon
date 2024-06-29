import {
    Button,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Textarea,
} from "@headlessui/react";
import { axiosInstanceWithAuth } from "../api/Axios";
import { useEffect, useState } from "react";
import ButtonEmojiDisabled from "./ButtonEmojiDisabled";

export default function MyModal({ open, close, date }: { open: boolean, close: () => void, date: Date }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState({
        calendar: {
            mood: "",
        },
        journal: {
            title: "",
            content: "",
        }
    })

    const getJournalData = async () => {
        console.log(date.toLocaleDateString())
        try {
            const response = await axiosInstanceWithAuth.get("/daily", {
                params: {
                    date: date,
                },
            });
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getJournalData();
    }, [date]);

    const feelingEmoji: { [key: string]: string } = {
        happy: "😊",
        neutral: "😐",
        sad: "😕",
        angry: "😡",
        worried: "😰",
        laughing: "😂",
    };

    return (
        <>
            <Dialog
                open={open}
                as="div"
                className="relative z-[100] focus:outline-none transition duration-150 ease-out"
                transition
                onClose={close}
            >
                <DialogBackdrop
                    className="fixed inset-0 bg-black/30 data-[closed]:opacity-0 duration-150 ease-out"
                    transition
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6">
                        <DialogPanel
                            transition
                            className="w-full max-w-2xl rounded-xl bg-white/60 p-6 px-8 backdrop-blur-2xl duration-150 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <form>
                                <DialogTitle
                                    as="h2"
                                    className="text-base/7 font-semibold text-black"
                                >
                                    Give your new journal entry a title!
                                </DialogTitle>
                                <Textarea
                                    disabled
                                    // value={data.title}
                                    className="mt-3 mb-3 block w-full resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-indigo-500/75"
                                    rows={1}
                                />
                                <DialogTitle
                                    as="h2"
                                    className="text-base/7 font-semibold text-black"
                                >
                                    How are you feeling today?
                                </DialogTitle>
                                <div className="mt-1 grid grid-cols-3 gap-x-5 space-y-3 w-full h-3/4 justify-center items-center pb-4">
                                    {Object.keys(feelingEmoji).map((key) => (
                                        <ButtonEmojiDisabled
                                            key={key}
                                            emoji={feelingEmoji[key]}
                                            modalMode={true}
                                        />
                                    ))}
                                </div>
                                <DialogTitle
                                    as="h2"
                                    className="text-base/7 font-semibold text-black"
                                >
                                    Tell us how your day went!
                                </DialogTitle>
                                <Textarea
                                    disabled
                                    // value={data.content}
                                    className="mt-3 block w-full resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-indigo-500/75"
                                    rows={11}

                                />

                                <div className="mt-6 flex justify-end">
                                    <Button
                                        onClick={close}
                                        className="inline-flex items-center gap-2 rounded-md bg-red-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-red-800 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-red-400"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
