import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, Outlet } from 'react-router-dom';
import { useGetPokemons } from '../../hooks/useGetPokemons';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [search, setSearch]: [string, (search: string) => void] = useState('');

  const handleChange = (e: { target: { value: string; }; }) => {
    setSearch(e.target.value);
  };

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      <div>
        <h1 className={classes.title}>Pokemon Library</h1>
        <div className={classes.searchWrapper}>
          <input type="text" 
            onChange={handleChange} 
            className={classes.inputText}
            placeholder="Search a Pokemon name"/>
        </div>
      </div>
      <ul className={classes.pokemonList}>
        {pokemons.map((pkmn) => {
          if (search == "" || pkmn.name.toLowerCase().includes(search.toLowerCase())) {
            return (
              <>
                <Link to={`/pokemon/${pkmn.name}`} state={{ selectedValue: pkmn }}>
                  <li key={pkmn.id}
                    className={classes.listItem}
                  >
                    <div>
                      <img className={classes.pmknImg} src={pkmn.image} alt={pkmn.name} />
                    </div>
                    <div className={classes.pkmnTitle}>
                      {pkmn.name}
                    </div>
                    <div>
                      {pkmn.number}
                    </div>
                    <div>
                      {pkmn.types?.map((type) => (
                        <span className={classes.type} key={type}>{type}</span>
                      ))}
                    </div>
                  </li>
                </Link>
                <Outlet />
              </>
            );
          } 
        }
      )}
    </ul>
  </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
    },
    title: {
      margin: '20px',
      float: 'left'
    },
    searchWrapper: {
      margin: '20px',
      float: 'right'
    },
    inputText: {
      color: 'black',
      width: '200px',
      height: '25px'
    },
    pokemonList: {
      display: 'flex',
      margin: '0',
      padding: '0',
      float: 'left',
      textAlign: 'left',
      flexWrap: 'wrap'
    },
    listItem: {
      margin: '10px',
      padding: '10px',
      listStyle: 'none',
      flex: '0 0 20%',
      '&:hover': {
        backgroundColor: '#7C89A3',
        borderRadius: '5px'
      },
      transition: '0.3s'
    },
    pkmnTitle: {
    fontSize: '24px',
    marginBottom: '5px'
    },
    pmknImg: {
      width: '250px',
      height: '250px',
      borderRadius: '5px'
    },
    type: {
      marginRight: '4px'
    }
  },
  { name: 'PokemonList' }
);
