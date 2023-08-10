export const home = '/'

export const result = '/results'

export const account = {
  index: '/account',
  login: '/account/login',
  register: '/account/register',
}

export const series = {
  index: '/series',
}

export const films = {
  index: '/films',
}

export const detailInfo = {
  index: (id: number) => `/detail-infor/${id}`,
}
