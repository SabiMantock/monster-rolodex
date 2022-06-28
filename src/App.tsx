import { ChangeEvent, useEffect, useState } from "react";

import CardList from "./components/card-list/card-list.component";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component";
import { fetchUserData } from "./utils/getUserData";

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchUserData<Monster[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setMonsters(users)
    };
    fetchUsers()
  }, []);

  useEffect(() => {
    const newFiltered = monsters.filter((monster) => {
      const name = monster.name.toLowerCase();
      return name.includes(searchField);
    });

    setFilteredMonsters(newFiltered);
  }, [monsters, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchField(event.target.value.toLowerCase());
  };


  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>

      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
