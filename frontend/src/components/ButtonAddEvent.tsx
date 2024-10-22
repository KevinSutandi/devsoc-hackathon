import {
    PlusIcon
} from '@heroicons/react/24/outline';

export default function ButtonAddEvent({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <button onClick={() => setOpen(!open)} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-2xl text-sm items-center flex">
            New Journal Entry
            <PlusIcon className="h-5 w-5 inline ml-2" />
        </button>
    );
}