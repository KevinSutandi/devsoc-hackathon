import React, { useEffect, useState } from 'react';
import JournalEntry from '../components/JournalEntry';
import { axiosInstanceWithAuth } from '../api/Axios';
import Cookies from 'js-cookie';

interface JournalEntryData {
	date: Date;
	text: String;
	title: String;
}

const STUB_TEXT_SHORT = 'Today was a mix of productivity and relaxation. I spent the morning working on my customer data analysis project. It\'s fascinating to see the patterns emerge as I dive deeper into the variables influencing churn rates. In the afternoon, I took a break and went for a long walk in the park. The fresh air and sunshine were just what I needed to recharge. Looking forward to continuing my work tomorrow with a fresh perspective.';
const STUB_TEXT_MED = 'Today started off with a productive work session. I\'m analyzing customer churn data for a telecommunications company, and it\'s been interesting to see how factors like monthly revenue, overage minutes, and credit ratings play into customer retention. I feel like I\'m starting to get a clearer picture of the key drivers of churn, which is exciting. After a solid few hours of work, I decided to take a break and enjoy the beautiful weather. I went for a long walk in the park and even brought a book with me to read on one of the benches. The combination of sunshine and a good story was incredibly refreshing. In the evening, I met up with some friends for dinner. We had a great time catching up and sharing stories. It\'s always nice to unwind with good company after a day of deep focus. Tomorrow, I\'ll dive back into the data, hopefully with some new insights from today\'s reflections.';
const STUB_TEXT_LONG = 'Today was quite fulfilling and balanced. My morning began with diving into the customer churn analysis project I\'ve been working on for the telecommunications company. It\'s a complex but rewarding task. I\'m focusing on variables like monthly revenue, monthly minutes, total recurring charges, and various customer demographics. It\'s intriguing to see how each factor correlates with churn rates. For instance, higher overage minutes seem to be a significant predictor of churn, which aligns with the hypothesis that unexpected charges lead to customer dissatisfaction. Mid-morning, I took a short break and made myself a cup of coffee. I find that stepping away from the screen for a few minutes helps clear my mind and often leads to new insights. After my break, I returned to my analysis with renewed focus and noticed some interesting patterns related to customer income groups and credit ratings. These findings could be crucial for developing targeted retention strategies. In the early afternoon, I decided to step outside and enjoy the beautiful weather. I went for a long walk in the park near my home. The fresh air and the vibrant green of the trees were incredibly refreshing. I brought along a book I\'ve been reading about the impact of technology on modern communication, which provided a nice contrast to my data-heavy morning. Sitting on a park bench, engrossed in the book, I felt a deep sense of calm. Returning home, I spent some time jotting down thoughts and ideas that had come to me during the walk. Sometimes, a change of scenery can spark creativity and lead to breakthroughs. I made a few notes on potential new angles to explore in my analysis, including the impact of service areas on customer churn. In the evening, I met up with friends for dinner at a cozy little restaurant downtown. It was wonderful to catch up and hear what everyone has been up to. We talked about everything from work to weekend plans, and the conversation was filled with laughter and good vibes. It\'s always refreshing to connect with friends and share experiences. After dinner, I headed home and spent a bit more time reviewing my notes from earlier in the day. I feel like I\'m on the verge of uncovering some significant insights that could really help the company improve their customer retention strategies. Overall, today was a great mix of productivity, relaxation, and social interaction. I\'m looking forward to seeing where my analysis leads tomorrow and how I can continue to refine my approach.';

// TODO: Add monthly dividers

const Journal: React.FC = () => {
	const [curMonth, setCurMonth] = useState<number>(0);
	const data = new Array<JournalEntryData>();

	// Generating stub data for the meantime
	for (let i = 0; i < 6; i++) {
		const temp: JournalEntryData = {
			date: new Date(`2024-06-${28-i}`),
			text: STUB_TEXT_MED,
			title: 'Entry Title Here',
		}
		if (i === 3) temp.text = STUB_TEXT_SHORT;
		if (i === 5) temp.text = STUB_TEXT_LONG;
		data.push(temp);
	}
	// Delete the code above
	const fetchData = async () => {
		try {
			const data = await axiosInstanceWithAuth.post("/journals",
				{ uid: Cookies.get('uid') }
			);
			console.log(data)
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [])


  return (
	<div className='p-5'>
		<div className='p-2 w-full rounded-2xl h-full'>	
			<h1 className='text-4xl font-bold my-5'>Journal</h1>
			{data.map(data => ( 
				<JournalEntry date={data.date} text={data.text} title={data.title}/>
			))}
		</div>
	</div>
  );
};

export default Journal;