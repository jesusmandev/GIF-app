
import type { Gif } from '../interface/gif.interface';
import type { GiphyResponse } from '../interface/giphy.response';
import { giphyApi } from '../api/giphy.api';

export const getGifsByQuery = async(query: string): Promise<Gif[]> => {

    const response = await giphyApi<GiphyResponse>('/search', {
        params: {
            q:query,
            limit:10,
        }
})

return response.data.data.map( (gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),

}) )
//    fetch(`https://api.giphy.com/v1/gifs/search?api_key=UuYxOP5Jx4rDIZTJRg2DGeCstlnDgNeD&q=${query}&limit=25&offset=0&rating=g&lang=es&bundle=messaging_non_clips`);
};