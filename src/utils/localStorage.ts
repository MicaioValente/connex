export const saveToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const getCurrentToken = () => {
  console.log('token ', localStorage.getItem('token'))
  return localStorage.getItem('token')
}

export const deleteToken = () => {
  return localStorage.removeItem('token')
}

export const saveUser = (user: string) => {
  const userJSON = JSON.stringify(user)
  localStorage.setItem('user', userJSON)
}

export const deleteUser = () => {
  console.log(localStorage.removeItem('user'))
  return localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return JSON.parse(user!)
}
