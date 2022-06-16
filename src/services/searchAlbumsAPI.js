const searchAlbumsAPI = async (artist) => {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results } = await APIResponse.json();

  const response = results.map(
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100: artworkUrl100.replaceAll('100x100', '500x500'),
      releaseDate,
      trackCount,
    }),
  );
  return response;
};

export default searchAlbumsAPI;
