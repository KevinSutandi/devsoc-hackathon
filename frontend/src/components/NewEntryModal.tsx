import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Textarea,
} from "@headlessui/react";
import { axiosInstanceWithAuth } from "../api/Axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newEntrySchema } from "../utils/journal.schema";
import { z } from "zod";
import { useJournal } from "../context/JournalContext";
import ButtonEmoji from "./ButtonEmoji";
import { useEmoji } from "../context/EmojiContext";

type NewEntryProps = z.infer<typeof newEntrySchema>;

export default function MyModal({ open, close }: { open: boolean; close: () => void; }) {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(newEntrySchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const feelingEmoji: { [key: string]: string } = {
    happy: "😊",
    neutral: "😐",
    sad: "😕",
    angry: "😡",
    worried: "😰",
    laughing: "😂",
  };

  const emojiToString: { [key: string]: string } = {
    "😊": 'HAPPY',
    "😐": 'NEUTRAL',
    "😕": 'SAD',
    "😡": 'ANGRY',
    "😰": 'WORRIED',
    "😂": 'LAUGHING',
  };

  const { fetchJournalData } = useJournal();

  const { currentEmoji } = useEmoji();
  const onSubmit = async (data: NewEntryProps) => {
    try {
      const response = await axiosInstanceWithAuth.post("/daily/create", {
        title: data.title,
        content: data.content,
        mood: emojiToString[currentEmoji],
        date: new Date(),
      });
      console.log(response);
      fetchJournalData();
      setValue("title", "");
      setValue("content", "");
      close();
    } catch (error) {
      console.log(error);
    }
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle
                  as="h2"
                  className="text-base/7 font-semibold text-black"
                >
                  Give your new journal entry a title!
                </DialogTitle>
                <Textarea
                  className="mt-3 mb-3 block w-full resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-indigo-500/75"
                  rows={1}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm">{errors.title.message}</p>
                )}
                <DialogTitle
                  as="h2"
                  className="text-base/7 font-semibold text-black"
                >
                  How are you feeling today?
                </DialogTitle>
                <div className="mt-1 grid grid-cols-3 gap-x-5 space-y-3 w-full h-3/4 justify-center items-center pb-4">
                  {Object.keys(feelingEmoji).map((key) => (
                    <ButtonEmoji
                      key={key}
                      emoji={feelingEmoji[key]}
                      onClick={() => {}}
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
                  className="mt-3 block w-full resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-indigo-500/75"
                  rows={11}
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-red-600 text-sm">
                    {errors.content.message}
                  </p>
                )}
                <div className="mt-6 flex justify-end">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-indigo-800 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-indigo-400"
                    type="submit"
                  >
                    Submit
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
