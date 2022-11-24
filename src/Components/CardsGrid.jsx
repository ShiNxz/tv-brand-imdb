import Show from './ShowCard'

const CardsGrid = ({ items, title }) => {
	return (
		<div
			className='p-4 lg:px-24 -mt-48'
			id='shows'
		>
			{items && items.length > 0 ? (
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 md:gap-9 lg:gap-8 1xl:gap-12'>
					{items.map((show) => (
						<Show
							key={show.id}
							id={show.id}
							title={show.title}
							year={show.year}
							rank={show.rank}
							image={show.image}
							imDbRating={show.imDbRating}
							crew={show.crew}
							description={show.description}
						/>
					))}
				</div>
			) : (
				<div className='h-56 text-center text-4xl dark:text-slate-200'>Loading...</div>
			)}
		</div>
	)
}

export default CardsGrid
