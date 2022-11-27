import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: Array<string>;
  resistant: Array<string>;
  weaknesses: Array<string>;
  fleeRate: string;
  maxCP: string;
  maxHP: string;
  image: string;
};

export type PokemonDimension = {
  maximum: string;
  minimum: string;
}

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = (id: string, name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id: id,
      name: name
    },
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || [], [data]);

  return {
    pokemon,
    ...queryRes,
  };
};
