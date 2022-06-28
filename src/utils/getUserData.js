export const fetchUserData = async setMonsters => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  setMonsters(data)
}
