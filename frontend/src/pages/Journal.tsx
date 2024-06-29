import React, { useEffect } from 'react';
import JournalEntry from '../components/JournalEntry';
import { useJournal } from '../context/JournalContext';

const groupByMonth = (entries: Array<{ createdAt: string; content: string; title: string; }>) => {
  const groupedEntries: { [key: string]: Array<{ createdAt: string; content: string; title: string; }> } = {};

  entries.forEach(entry => {
    const date = new Date(entry.createdAt);
		var extractedMonth = date.getMonth() + 1;
		var month = 'January';
		switch (extractedMonth) {
			case extractedMonth = 1: {
				month = 'January';
				break;
			}
			case extractedMonth = 2: {
				month = 'February';
				break;
			}
			case extractedMonth = 3: {
				month = 'March';
				break;
			}
			case extractedMonth = 4: {
				month = 'April';
				break;
			}
			case extractedMonth = 5: {
				month = 'May';
				break;
			}
			case extractedMonth = 6: {
				month = 'June';
				break;
			}
			case extractedMonth = 7: {
				month = 'July';
				break;
			}
			case extractedMonth = 8: {
				month = 'August';
				break;
			}
			case extractedMonth = 9: {
				month = 'September';
				break;
			}
			case extractedMonth = 10: {
				month = 'October';
				break;
			}
			case extractedMonth = 11: {
				month = 'November';
				break;
			}
			case extractedMonth = 12: {
				month = 'December';
				break;
			}
			default: {
				month = date.getFullYear().toString();
				break;
			}
		}
    const monthYear = `${month} ${date.getFullYear()}`; 

    if (!groupedEntries[monthYear]) {
      groupedEntries[monthYear] = [];
    }

    groupedEntries[monthYear].push(entry);
  });

  return groupedEntries;
};

const Journal: React.FC = () => {
	const { entryData, fetchJournalData } = useJournal();

	useEffect(() => {
		fetchJournalData();
	}, [])

	const groupedEntries = groupByMonth(entryData);

  return (
	<div className='p-5'>
		<div className='p-2 w-full rounded-2xl h-full'>	
			<h1 className='text-4xl font-bold my-5'>Journal</h1>
			<div className='flex flex-col-reverse'>
				{Object.keys(groupedEntries).map(monthYear => (
					<div key={monthYear}>
						<div className='flex align-middle justify-center text-center'>
							<div className='text-lg my-2 w-1/4'>{monthYear}</div>
							<div className='border-slate-200 border-2 rounded-md h-[1px] w-full my-auto mx-4'></div>
						</div>
						{groupedEntries[monthYear].map((data, index) => (
							<JournalEntry key={index} date={data.createdAt} text={data.content} title={data.title} />
						))}
					</div>
				))}
			</div>
		</div>
	</div>
	);
};

export default Journal;