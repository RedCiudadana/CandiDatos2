import Candidate from './candidate';

/**
 * Modelo para candidatos a diputos de parlacem
 *
 * @class Model.Parlacen
 * @extends Model.Candidate
 */
export default Candidate.extend({
  // Atributes

  // Tipo de elección
  type: 'parlacem',

  electionName: 'Diputados Parlacen'
});
