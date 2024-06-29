import React, { useEffect } from 'react';
import JournalEntry from '../components/JournalEntry';
import { useJournal } from '../context/JournalContext';

// TODO: Add monthly dividers

const Journal: React.FC = () => {
	const { entryData, fetchJournalData } = useJournal();

	useEffect(() => {
		fetchJournalData();
	}, [])

  return (
	<div className='p-5'>
		<div className='p-2 w-full rounded-2xl h-full'>	
			<h1 className='text-4xl font-bold my-5'>Journal</h1>
			<div className='flex flex-col-reverse'>
				{entryData.map((data: { createdAt: string; content: string; title: string; }) => ( 
					<JournalEntry date={data.createdAt} text={data.content} title={data.title}/>
				))}
			</div>
		</div>
	</div>
	);
};

export default Journal;