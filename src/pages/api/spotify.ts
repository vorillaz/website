import type { APIRoute } from "astro";

const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const basic = Buffer.from(
    `${import.meta.env.SPOTIFY_CLIENT_ID}:${
      import.meta.env.SPOTIFY_CLIENT_SECRET
    }`,
    "utf8"
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token as string,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const GET: APIRoute = async () => {
  try {
    const response = await getNowPlaying();
    if (!response) {
      return new Response(JSON.stringify({ isPlaying: false }), {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      });
    }
    if (response.status === 204 || response.status > 400) {
      return new Response(JSON.stringify({ isPlaying: false }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    const song = await response.json();

    if (song.item === null) {
      return new Response(JSON.stringify({ isPlaying: false }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((_artist: any) => _artist.name)
      .join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return new Response(
      JSON.stringify({
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
};
