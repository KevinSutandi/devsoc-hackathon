import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'

export default function ShowDetailModal({ open, close }: { open: boolean, close: () => void }) {

    return (
        <>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none transition duration-150 ease-out" transition onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0 duration-150 ease-out" transition />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6">
                        <DialogPanel
                            transition
                            className="w-full max-w-2xl rounded-xl bg-white/60 p-6 px-8 backdrop-blur-2xl duration-150 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h2" className="text-base/7 font-semibold text-black">
                                Show Detail
                            </DialogTitle>
                            <div className='mt-4'>
                                <label className='font-bold text-lg'>
                                    Title of this day's entry
                                </label>
                                <input
                                    disabled
                                    className=
                                    ' block w-full resize-none rounded-lg border-none bg-white/50 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-indigo-500/75'
                                />
                            </div>
                            <div className='mt-3'>
                                <label className='font-bold text-lg'>
                                    How you felt:
                                </label>
                                <Textarea
                                    disabled
                                    className=
                                    'block w-full resize-none rounded-lg border-none bg-white/50 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-indigo-500/75'

                                    rows={11}
                                />
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-indigo-800 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-indigo-400"
                                    onClick={close}
                                >
                                    Submit
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
