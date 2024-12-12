import { MovieDetail } from "@/app/entities/MovieDetail";
import ScrollContainer from "@/components/ui/scroll-container";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PersonMovies = ({ movies }: { movies: MovieDetail[] }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-[auto,1fr,auto] gap-4 px-1 sm:px-1 md:px-2 pb-6 lg:pt-4 lg:px-3 lg:pb-8" style={{ gridAutoRows: '1fr' }}>
      <div className="border border-gray-300 rounded-md p-6 mb-4 flex-grow">
        {/* Content for the first div */}
      </div>
      <div className="border border-gray-300 rounded-md p-0 mb-4 flex-grow overflow-hidden">
        <h2 className="text-xl font-semibold pb-10">Movies</h2>
        <ScrollContainer>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {movies.map(
              (movie) =>
                movie.poster_path && (
                  <button
                    key={movie.id}
                    onClick={() => router.push(`/movies/${movie.id}`)}
                    className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] cursor-pointer hover:opacity-80 snap-center"
                    aria-label={`View details for ${movie.title ?? 'Unknown title'}`}
                    style={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title ?? 'Unknown title'}
                      width={300}
                      height={400}
                      className="rounded-md shadow-md"
                      style={{ width: 'auto', height: 'auto' }}
                      sizes="(min-width:300px) and (max-width:739px) 150px, (min-width:740px) and (max-width:999px) 200px, (min-width:1000px) and (max-width:1319px) 250px, 300px"
                    />
                  </button>
                )
            )}
          </div>
        </ScrollContainer>
      </div>
      <div className="border border-gray-300 rounded-md p-6 mb-4 flex-grow">
        {/* Content for the third div */}
      </div>
    </div>
  );
};

export default PersonMovies;