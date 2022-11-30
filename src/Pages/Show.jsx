/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Card from '../Components/Card'
import Axios from '../libs/Axios'

const Index = () => {
	const [show, setShow] = useState(null)

	let { id } = useParams()

	useEffect(() => {
		const FetchData = async () => {
			const { data } = await Axios(`/api/{lang}/api/title/{key}/${id}`)
			setShow(data)
			console.log(data)
		}

		FetchData()
	}, [id])

	return show ? (
		show.title ? (
			<>
				<div className='mt-16'>
					<div className='flex justify-center items-center'>
						<div className='h-[43rem] bg-gradient-to-r overflow-auto from-indigo-500 to-indigo-800 -mt-12 w-full absolute top-0 skew-y-3 shadow-lg'>
							<div
								style={{ backgroundImage: `url(${show.image})` }}
								className='h-[43rem] w-full flex justify-center items-center absolute opacity-25 blur-sm bg-cover bg-center'
							></div>
						</div>

						<div className='z-10 flex flex-col lg:flex-row lg:container pt-12 lg:mx-32'>
							<div
								data-aos='fade-up'
								className='p-10 self-center'
							>
								<img
									alt={show.title}
									src={show.image}
									className='rounded-xl shadow-xl h-[35rem]'
								/>
							</div>

							<div
								data-aos='fade-up'
								className='p-10 lg:w-2/3'
							>
								<Card className='px-8 py-2 shadow-md rounded-md relative text-black lg:text-white text-left lg:min-h-[20rem] bg-slate-100 lg:bg-gray-200/10 dark:bg-gray-200/10 dark:text-white mb-0'>
									<div className='my-4'>
										{show.imDbRating
											? [...Array(5)].map((x, i) => (
													<FontAwesomeIcon
														key={i}
														className={
															(show.imDbRating / 2).toFixed(0) >= i + 1
																? 'text-gray-700 dark:text-gray-300 lg:text-gray-300 text-md'
																: 'text-gray-300 dark:text-gray-700 lg:text-gray-700 text-md'
														}
														icon={faStar}
													/>
											  ))
											: [...Array(5)].map((x, i) => (
													<FontAwesomeIcon
														key={i}
														className='text-gray-400 text-xs'
														icon={faStar}
													/>
											  ))}
										<span className='text-sm mx-2'>({(show.imDbRating / 2).toFixed(1)})</span>
									</div>
									<h1 className='text-3xl font-medium	amy-4'>
										{show.title} • {show.year}
									</h1>
									<p className='text-md font-base my-4 mb-16'>{show.plot}</p>
									<div className='absolute bottom-5'>{show.genres}</div>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</>
		) : (
			<div className='flex flex-row justify-center items-center h-screen'>
				Couldn't find the requested information
			</div>
		)
	) : (
		<div className='flex flex-row justify-center items-center h-screen'>Please Wait.. </div>
	)
}

export default Index
