import { useState } from "react";
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from "./shared/components/SearchBar";
import { MeshBackground } from './shared/components/MeshBackground';
import { BubbleCursor } from './shared/components/BubbleCursor';
import { PreviousSearches } from './gifs/Components/PreviousSearches';
import { GifList } from "./gifs/Components/GifList";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interface/gif.interface";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = (term: string) => {
    handleSearch(term);
  };

  const handleSearch = async (query: string = '') => {
    query = query.trim().toLocaleLowerCase();
    if (query.length === 0) return;

    if (!previousTerms.includes(query)) {
      setPreviousTerms([query, ...previousTerms].slice(0, 8));
    }

    const fetchedGifs = await getGifsByQuery(query);
    setGifs(fetchedGifs);
  };

  return (
    <>
      <MeshBackground />
      <BubbleCursor />
      
      <main className="relative z-10 min-h-screen flex flex-col items-center pt-10 pb-20">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center">
          <CustomHeader 
            title="Buscador Universal" 
            description="Explora un infinito océano de GIFs en el cosmos digital." 
          />

          <div className="w-full -mt-4 mb-4">
            <SearchBar placeholder="Ingresa tu búsqueda estelar..." onQuery={handleSearch} />
          </div>

          {previousTerms.length > 0 && (
            <div className="w-full mb-8">
              <PreviousSearches 
                searches={previousTerms} 
                onLabelClicked={handleTermClicked}
              />
            </div>
          )}

          <div className="w-full mt-4">
            <GifList gifs={gifs} />
          </div>
        </div>
      </main>
    </>
  );
};
