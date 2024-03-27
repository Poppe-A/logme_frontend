export const BASE_URL = 'http://localhost:8200'

export const API_URLS = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    signup: `${BASE_URL}/auth/signup`,
    whoami: `${BASE_URL}/auth/whoami`,
  },
  sport: {
    all: `${BASE_URL}/sport`,
    sessions: `${BASE_URL}/sport/session`,
    serie: `${BASE_URL}/sport/session/serie`
  }
}
