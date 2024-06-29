import React, { useEffect, useState } from 'react';
import JournalEntry from '../components/JournalEntry';
import { axiosInstanceWithAuth } from '../api/Axios';

interface JournalEntryData {
	content: string;
	createdAt: string;
	id: number;
	image: string;
	profileUid: string;
	title: string;
	updatedAt: string;
}
// TODO: Add monthly dividers

const Journal: React.FC = () => {
	const [entryData, setEntryData] = useState<Array<JournalEntryData>>(new Array<JournalEntryData>);
	const fetchData = async () => {
		try {
			const data = await axiosInstanceWithAuth.post("/journals");
			setEntryData(data.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [fetchData])


  return (
	<div className='p-5'>
		<div className='p-2 w-full rounded-2xl h-full'>	
			<h1 className='text-4xl font-bold my-5'>Journal</h1>
			<div className='flex flex-col-reverse'>
				{entryData.map(data => ( 
					<JournalEntry date={data.createdAt} text={data.content} title={data.title}/>
				))}
			</div>
		</div>
	</div>
	);
};

export default Journal;