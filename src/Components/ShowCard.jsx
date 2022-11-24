import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Show = ({ id, title, year, description, image, imDbRating, crew }) => {
	return (
		<div
			data-aos='fade-up'
			className='overflow-hidden rounded-lg h-full w-[100%] z-20 bg-white dark:bg-gray-800 cursor-pointer m-auto duration-500 shadow-md hover:shadow-xl !hover:-translate-y-1'
		>
			<Link
				to={`/show/${id}`}
				className='w-full block h-full'
			>
				<img
					alt='#'
					src={image}
					className='max-h-80 w-full object-cover'
				/>
				<div className='w-full p-4'>
					{imDbRating
						? [...Array(5)].map((x, i) => (
								<FontAwesomeIcon
									key={i}
									className={
										(imDbRating / 2).toFixed(0) >= i + 1
											? 'text-gray-700 dark:text-gray-300 text-xs'
											: 'text-gray-300 dark:text-gray-700 text-xs'
									}
									icon={faStar}
								/>
						  ))
						: [...Array(5)].map((x, i) => (
								<FontAwesomeIcon
									key={i}
									className='text-gray-900 text-xs'
									icon={faStar}
								/>
						  ))}
					<p className='text-gray-800 dark:text-white text-md font-medium mb-2'>
						{title} • {description ? description : year}
					</p>
					<p className='text-gray-400 dark:text-gray-300 font-light text-sm'>{crew}...</p>
				</div>
			</Link>
		</div>
	)
}

export default Show
