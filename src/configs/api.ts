import { APIHost } from '@/utils/contants'

export const API_PATHS = {
  detailAccount: `${APIHost}/account/`,
  detailMovie: `${APIHost}/movie/`,
  detailTvShow: `${APIHost}/tv/`,
  searchMulti: `${APIHost}/search/multi?query=`,
  trendingAll: `${APIHost}/trending/all/week`,
  trendingMovie: `${APIHost}/trending/movie/week`,
  trendingTvShow: `${APIHost}/trending/tv/week`,
  //   trailerMovies: `${APIHost}/movie/11/videos`,
  //   trailerTvshow: `${APIHost}/tv/11/videos`,
  //   similarMovies: `${APIHost}/movie/11/similar`,
  //   recommendMovies: `${APIHost}/movie/11/recommendations`,
}
