import { useEffect, useState } from 'react'

import CardList from './components/card-list/card-list.component'
import './App.css'
import SearchBox from './components/search-box/search-box.component'
import { fetchUserData } from './utils/getUserData'

const App = () => {
  const [searchField, setSearchField] = useState('')
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  useEffect(() => {
    fetchUserData(setMonsters)
  }, [])

  useEffect(() => {
    const newFiltered = monsters.filter(monster => {
      const name = monster.name.toLowerCase()
      return name.includes(searchField)
    })

    setFilteredMonsters(newFiltered)
  }, [monsters, searchField])

  const onSearchChange = e => {
    setSearchField(e.target.value.toLowerCase())
  }

  // const filteredMonster = monsters.filter(monster => {
  //   const name = monster.name.toLowerCase()
  //   return name.includes(searchField)
  // })

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
        className='monsters-search-box'
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App
