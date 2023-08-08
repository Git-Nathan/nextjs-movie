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
export const getBySearch = (search_query: string) =>
  fetchApi(
    'get',
    `/search/movie?` + new URLSearchParams({ query: search_query }),
  )

export const getById = (id: string) => fetchApi('get', `/movie/${id}`)

// export const getSimilal