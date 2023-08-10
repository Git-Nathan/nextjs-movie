// Config
const ACCESS_TOKEN_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjI3ZGM3MWYzOTQxZGViNTY3NzQ1ZjE1ZmZhYmIyMCIsInN1YiI6IjY0Y2IxMzE0NzY0Yjk5MDBhZTExYTMyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D1-2CGtmDzoI-tKaGq6BBucl1XE5nqcTwdYARw3KPWQ'

const APIHost = 'https://api.themoviedb.org/3'

async function fetchApi(
  method: 'get' | 'post' | 'delete' | 'put',
  path: string,
  body?: any,
): Promise<any> {
  const response = await fetch(APIHost + path, {
    method,
    body: typeof body === 'object' ? JSON.stringify(body) : body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
    },
    cache: 'no-store',
  })

  if (response.status === 401) {
    // handle unauthorized error here.
  }

  return response.json()
}

// Api methods
export const getBySearch = (search_query: string, locale: string) =>
  fetchApi(
    'get',
    `/search/multi?` +
      new URLSearchParams({ query: search_query, language: locale }),
  )

// export const getDetail

export const getMovieById = (id: string, locale: string, media: string) =>
  fetchApi(
    'get',
    `/${media}/${id}?` + new URLSearchParams({ language: locale }),
  )

export const getTvShowById = (id: string) => fetchApi('get', `/tv/${id}`)

// export const getSimilal

export const getSimilalMovies = (id: string, locale: string, media: string) =>
  fetchApi(
    'get',
    `/${media}/${id}/similar?` + new URLSearchParams({ language: locale }),
  )

export const getSimilalTvShow = (id: string) =>
  fetchApi('get', `/tv/${id}/similar`)

// export const getRecommend

export const getRecommendMovies = (id: string) =>
  fetchApi('get', `/movie/${id}/recommendations`)

export const getRecommendTvShow = (id: string) =>
  fetchApi('get', `/tv/${id}/recommendations`)

// export const getVideoTrailer

export const getVideoTrailer = (id: number, type: string) =>
  fetchApi('get', `/${type}/${id}/videos`)

// export const getTrending

export const getTrendingAll = () => fetchApi('get', `/trending/all/week`)
