import Card from '../Components/Card'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../libs/fetcher'
import config from '../config.json'
import CardsGrid from '../Components/CardsGrid'
import SearchInput from '../Components/SearchInput'
import { useDebounce } from 'use-debounce'
import Axios from '../libs/Axios'

const Index = () => {
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [foundItems, setFoundItems] = useState([])
	const [searchQuery] = useDebounce(query, 200)

	useEffect(() => {
		if (searchQuery === '') return

		handleSearch(searchQuery)
	}, [searchQuery])

	const handleSearch = async (searchQuery) => {
		setLoading(true)
		const { data } = await Axios(`/api/{lang}/API/search/{key}/${searchQuery}`)
		setFoundItems(data?.results)
		setLoading(false)
	}

	// fetch the top 250 movies from imdb
	const { data: topMovies } = useSWR(
		`${config.base_uri}/${config.default_lang}/API/Top250Movies/${config.public_key}`,
		fetcher,
		{
			revalidateOnFocus: false,
		}
	)

	// fetch the top 250 tv serieses from imdb
	const { data: TopTVs } = useSWR(
		`${config.base_uri}/${config.default_lang}/API/Top250TVs/${config.public_key}`,
		fetcher,
		{
			revalidateOnFocus: false,
		}
	)

	return (
		<>
			<div className='mt-16'>
				<div className='h-[40rem] flex justify-center items-center'>
					<div className='bg-gradient-to-r overflow-auto from-indigo-500 to-indigo-800 h-[43rem] -mt-12 w-full absolute top-0 skew-y-3'>
						<div className='bg-header h-[43rem] w-full flex justify-center items-center absolute opacity-25 blur-sm bg-cover bg-center'></div>
					</div>
					<Card className='w-4/6 xl:w-2/6 h-2/5 flex justify-center text-center items-center flex-col p-4 lg:p-10'>
						<span className='text-white font-bold text-base xl:text-3xl'>
							TV Show and web series database.
						</span>
						<SearchInput
							query={query}
							setQuery={setQuery}
						/>
					</Card>
				</div>
			</div>
			{searchQuery === '' ? (
				<>
					<CardsGrid
						items={topMovies?.items}
						title='Top 250 Movies'
					/>
					<CardsGrid
						items={TopTVs?.items}
						title='Top 250 TVs'
					/>
				</>
			) : loading ? (
				<div className='flex flex-row items-center justify-center text-xl h-32 mb-32'>
					Please wait while we are searching for:
					<code className='bg-rose-900/70 border mx-2 text-white px-0.5'>{searchQuery}</code>
					...
				</div>
			) : !foundItems ? (
				<div className='flex flex-row items-center justify-center text-xl h-32 mb-32'>
					Error: coulnd't "{searchQuery}"...
				</div>
			) : (
				<CardsGrid
					items={foundItems}
					title='Search Results'
				/>
			)}
		</>
	)
}

export default Index
