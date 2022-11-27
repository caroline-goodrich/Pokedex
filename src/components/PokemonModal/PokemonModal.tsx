import { createUseStyles } from 'react-jss';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { useLocation, useNavigate } from 'react-router-dom';

export const PokemonModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pkmn = location.state.selectedValue
  const { pokemon, loading } = useGetPokemon(pkmn.id, pkmn.name);
  const classes = useStyles();

  if(loading)
    return(<div>Loading...</div>)  
       
  if (Object.keys(pokemon).length === 0)
    return (
      <div className={classes.modalDiv}>
        <div className={classes.modal}>
          <button onClick={() => navigate(-1)} className={classes.button}>X</button>
          <h1 className={classes.errorMessage}>
            Whoops! Currently we don't have any data for that pokemon. Try another one!
          </h1>
        </div>
      </div>
    );
  
  return (
    <div className={classes.modalDiv}>
      <div className={classes.modal}>
        <button onClick={() => navigate(-1)} className={classes.button}>X</button>
        <div>
          <img src={pokemon.image} alt={pokemon.name} className={classes.pkmnImg} />
        </div>
        <div className={classes.pkmnDetails}>
          <div className={classes.title}>
            {pokemon.name}
          </div>
          <ul>
            <li className={classes.pkmnDetail}>
              <span className={classes.label}>Classification:</span>
              {pokemon.classification}
            </li >
            <li className={classes.pkmnDetail}>
            <span className={classes.label}>Types:</span>
                {pokemon.types?.map((type) => (
                  <span className={classes.multiLine} key={type}>{type}</span>
                ))}
            </li>
            <li className={classes.pkmnDetail}>
            <span className={classes.label}>Resistant:</span>
               {pokemon.resistant?.map((type) => (
                  <span  className={classes.multiLine} key={type}>{type}</span>
                ))}
            </li>
            <li className={classes.pkmnDetail}>
              <span className={classes.label}>Weaknesses:</span>
               {pokemon.weaknesses?.map((weakness) => (
                  <span className={classes.multiLine} key={weakness}>{weakness}</span>
                ))}
            </li>
            <li className={classes.pkmnDetail}>
              <div className={classes.label}>Minimum Weight: {pokemon.weight?.minimum}</div>
              <div className={classes.label}>Maximum Weight: {pokemon.weight?.maximum}</div>
            </li>
            <li className={classes.pkmnDetail}>
              <div className={classes.label}>Minimum Height: {pokemon.height?.minimum}</div>
              <div className={classes.label}>Maximum Height: {pokemon.height?.maximum}</div>
            </li>
            <li className={classes.pkmnDetail}> Flee Rate: {pokemon.fleeRate}</li>
            <li className={classes.pkmnDetail}> Max CP: {pokemon.maxCP}</li>
            <li className={classes.pkmnDetail}> Max HP: {pokemon.maxHP}</li>
          </ul>
        </div>
      </div>
    </div> 
  );
}
const useStyles = createUseStyles(
  {
    modalDiv: {
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      top: '0',
      backgroundColor: '#5B7085',
      display: 'flex',
      overflow: 'hidden'
    },
    modal: {
      width: '825px',
      height: '500px',
      position: 'absolute',
      top: '10%',
      left: '15%',
      backgroundColor: '#fff',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    errorMessage: {
      color: '#171E2b',
      textAlign: 'center'
    },
    leftContainer: {
      display: 'inline-flex'
    },
    button: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#171E2b',
      borderRadius: '50%',
      marginLeft: '10px',
      textAlign: 'center',
      top: '-10px',
      right: '-10px',
      position: 'absolute',
      cursor: 'pointer'
    },
    pkmnImg: {
      float: 'left',
      width: '400px',
      height: '400px'
    },
    pkmnDetails: {
      display: 'inline-grid',
      marginLeft: '30px',
      borderLeft: '1px solid #171E2b'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      paddingLeft: '20px',
      color: '#171E2b'
    },
    pkmnDetail: {
      marginTop: '10px',
      color: '#171E2b'
    },
    label: {
      color: '#171E2b',
      marginRight: '5px'
    },
    multiLine: {
        marginRight: '4px',
        color: '#171E2b'
    }
  },
  { name: 'PokemonModal' }
);