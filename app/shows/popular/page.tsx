"use client";

import { useEffect, useState } from 'react';
import { TVShow } from "@/app/entities/TVShow";
import { MedalIcon, Tv2Icon } from 'lucide-react';
import { DefaultLayout } from '@/components/DefaultLayout';
import { useRouter } from 'next/navigation';
import { getLogin } from '@/repository/auth';
import DisplayShow from '@/components/DisplayShow';

const OnTheAir = () => {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (getLogin() === false) {
      router.push('/login');
    }
    else {
      setIsLogged(true);
      const fetchShows = async () => {
        try {
          const response = await fetch('/api/shows/popular');
          if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          setShows(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des films:", error);
          setError("Une erreur est survenue lors de la récupération des films.");
        }
      };

      fetchShows();
    }
  }, [router]);

  if (isLogged === false) {
    return null;
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen  p-6 sm:p-8 space-y-12 w-full">
        {/* Discover Title with Icon */}
        <div className="flex items-center space-x-3 mb-8 justify-center w-full">
          <MedalIcon className="h-8 w-8"  />
          <h1 className="text-4xl font-bold text-center">Popular</h1>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Tv2Icon className="h-6 w-6 " />
          <h2 className="text-2xl font-semibold">Shows</h2>
        </div>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {shows.map((show) => (
              <DisplayShow key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default OnTheAir;