import { alias, oneWay } from '@ember/object/computed';
import $ from 'jquery';
import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import { isBlank } from '@ember/utils';

const departamentos = [
  'Alta Verapaz',
  'Baja Verapaz',
  'Chimaltenango',
  'Chiquimula',
  'Petén',
  'El Progreso',
  'Quiché',
  'Escuintla',
  'Guatemala',
  'Huehuetenango',
  'Izabal',
  'Jalapa',
  'Jutiapa',
  'Quetzaltenango',
  'Retalhuleu',
  'Sacatepéquez',
  'San Marcos',
  'Santa Rosa',
  'Sololá',
  'Suchitepéquez',
  'Totonicapán',
  'Zacapa'];

const municipios = {
  'Alta Verapaz': [
    'Chahal',
    'Lanquín',
    'San Juan Chamelco',
    'Santa María Cahabón',
    'Tucurú',
    'Chisec',
    'Panzós',
    'San Pedro Carchá',
    'Senahú',
    'Cobán',
    'Raxruhá',
    'Santa Catalina La Tinta',
    'Tactic',
    'Fray Bartolomé de las Casas',
    'San Cristóbal Verapaz',
    'Santa Cruz Verapaz',
    'Tamahú'],
  'Baja Verapaz': [
    'Cubulco',
    'Salamá',
    'Granados',
    'San Jerónimo',
    'Purulhá',
    'San Miguel Chicaj',
    'Rabinal',
    'Santa Cruz el Chol'],
  'Chimaltenango': [
    'Acatenango',
    'Patzicía',
    'San José Poaquil',
    'Santa Cruz Balanyá',
    'Chimaltenango',
    'Patzún',
    'San Juan Comalapa',
    'Tecpán',
    'El Tejar',
    'Pochuta',
    'San Martín Jilotepeque',
    'Yepocapa',
    'Parramos',
    'San Andrés Itzapa',
    'Santa Apolonia',
    'Zaragoza' ],
  'Chiquimula': [
    'Camotán',
    'Ipala',
    'San Jacinto',
    'Chiquimula',
    'Jocotán',
    'San José La Arada',
    'Concepción Las Minas',
    'Olopa',
    'San Juan Ermita',
    'Esquipulas',
    'Quezaltepeque'],
  'El Progreso': [
    'El Jícaro',
    'San Antonio La Paz',
    'Guastatoya',
    'San Cristóbal Acasaguastlán',
    'Morazán',
    'Sanarate',
    'San Agustín Acasaguastlán',
    'Sansare'],
  'Escuintla': [
    'Escuintla',
    'La Gomera',
    'San José',
    'Tiquisate',
    'Guanagazapa',
    'Masagua',
    'San Vicente Pacaya',
    'Iztapa',
    'Nueva Concepción',
    'Santa Lucía Cotzumalguapa',
    'La Democracia',
    'Palín',
    'Siquinalá'],
  'Guatemala': [
    'Amatitlán',
    'Guatemala',
    'San José Pinula',
    'San Pedro Sacatepéquez',
    'Villa Nueva',
    'Chinautla',
    'Mixco',
    'San Juan Sacatepéquez',
    'San Raymundo',
    'Chuarrancho',
    'Palencia',
    'San Miguel Petapa',
    'Santa Catarina Pinula',
    'Fraijanes',
    'San José del Golfo',
    'San Pedro Ayampuc',
    'Villa Canales'],
  'Huehuetenango': [
    'Aguacatán',
    'Cuilco',
    'La Libertad',
    'San Gaspar Ixchil',
    'San Mateo Ixtatán',
    'San Rafael La Independencia',
    'Santa Ana Huista',
    'Santiago Chimaltenango',
    'Chiantla',
    'Huehuetenango',
    'Malacatancito',
    'San Ildefonso Ixtahuacán',
    'San Miguel Acatán',
    'San Rafael Petzal',
    'Santa Bárbara',
    'Tectitán',
    'Colotenango',
    'Jacaltenango',
    'Nentón',
    'San Juan Atitán',
    'San Pedro Necta',
    'San Sebastián Coatán',
    'Santa Cruz Barillas',
    'Todos Santos Cuchumatánes',
    'Concepción Huista',
    'La Democracia',
    'San Antonio Huista',
    'San Juan Ixcoy',
    'San Pedro Soloma',
    'San Sebastián',
    'Santa Eulalia',
    'Unión Cantinil'],
  'Izabal': [
    'El Estor',
    'Puerto Barrios',
    'Livingston',
    'Los Amates',
    'Morales'],
  'Jalapa': [
    'Jalapa',
    'San Luis Jilotepeque',
    'Mataquescuintla',
    'San Manuel Chaparrón',
    'Monjas',
    'San Pedro Pinula',
    'San Carlos Alzatate'],
  'Jutiapa': [
    'Agua Blanca',
    'Conguaco',
    'Jerez',
    'Quesada',
    'Zapotitlán',
    'Asunción Mita',
    'El Adelanto',
    'Jutiapa',
    'San José Acatempa',
    'Atescatempa',
    'El Progreso',
    'Moyuta',
    'Santa Catarina Mita',
    'Comapa',
    'Jalpatagua',
    'Pasaco',
    'Yupiltepeque'],
  'Petén': [
    'Dolores',
    'Melchor de Mencos',
    'San Francisco',
    'Sayaxché',
    'Flores',
    'Poptún',
    'San José',
    'La Libertad',
    'San Andrés',
    'San Luis',
    'Las Cruces',
    'San Benito',
    'Santa Ana'],
  'Quetzaltenango': [
    'Almolonga',
    'Coatepeque',
    'Flores Costa Cuca',
    'Olintepeque',
    'San Carlos Sija',
    'San Mateo',
    'Cabricán',
    'Colomba',
    'Génova',
    'Palestina de Los Altos',
    'San Francisco La Unión',
    'San Miguel Sigüilá',
    'Cajolá',
    'Concepción Chiquirichapa',
    'Huitán',
    'Quetzaltenango',
    'San Juan Ostuncalco',
    'Sibilia',
    'Cantel',
    'El Palmar',
    'La Esperanza',
    'Salcajá',
    'San Martín Sacatepéquez',
    'Zunil'],
  'Quiché': [
    'Canillá',
    'Chichicastenango',
    'Joyabaj',
    'Sacapulas',
    'San Juan Cotzal',
    'Zacualpa',
    'Chajul',
    'Chinique',
    'Nebaj',
    'San Andrés Sajcabajá',
    'San Pedro Jocopilas',
    'Chicamán',
    'Cunén',
    'Pachalum',
    'San Antonio Ilotenango',
    'Santa Cruz del Quiché',
    'Chiché',
    'Ixcán',
    'Patzité',
    'San Bartolomé Jocotenango',
    'Uspantán'],
  'Retalhuleu': [
    'Champerico',
    'San Andrés Villa Seca',
    'Santa Cruz Muluá',
    'El Asintal',
    'San Felipe',
    'Nuevo San Carlos',
    'San Martín Zapotitlán',
    'Retalhuleu',
    'San Sebastián'],
  'Sacatepéquez': [
    'Alotenango',
    'Magdalena Milpas Altas',
    'San Lucas Sacatepéquez',
    'Santa María de Jesús',
    'La Antigua Guatemala',
    'Pastores',
    'San Miguel Dueñas',
    'Santiago Sacatepéquez',
    'Ciudad Vieja',
    'San Antonio Aguas Calientes',
    'Santa Catarina Barahona',
    'Santo Domingo Xenacoj',
    'Jocotenango',
    'San Bartolomé Milpas Altas',
    'Santa Lucía Milpas Altas',
    'Sumpango'],
  'San Marcos': [
    'Ayutla',
    'El Quetzal',
    'Ixchiguán',
    'Ocós',
    'San Cristóbal Cucho',
    'San Miguel Ixtahuacán',
    'Sibinal',
    'Tejutla',
    'Catarina',
    'El Rodeo',
    'La Reforma',
    'Pajapita',
    'San José Ojetenam',
    'San Pablo',
    'Sipacapa',
    'Comitancillo',
    'El Tumbador',
    'Malacatán',
    'Río Blanco',
    'San Lorenzo',
    'San Pedro Sacatepéquez',
    'Tacaná',
    'Concepción Tutuapa',
    'Esquipulas Palo Gordo',
    'Nuevo Progreso',
    'San Antonio Sacatepéquez',
    'San Marcos',
    'San Rafael Pie de La Cuesta',
    'Tajumulco'],
  'Santa Rosa': [
    'Barberena',
    'Guazacapán',
    'San Juan Tecuaco',
    'Santa Rosa de Lima',
    'Casillas',
    'Nueva Santa Rosa',
    'San Rafaél Las Flores',
    'Taxisco',
    'Chiquimulilla',
    'Oratorio',
    'Santa Cruz Naranjo',
    'Cuilapa',
    'Pueblo Nuevo Viñas',
    'Santa María Ixhuatán'],
  'Sololá': [
    'Concepción',
    'San Antonio Palopó',
    'San Marcos La Laguna',
    'Santa Catarina Palopó',
    'Santa María Visitación',
    'Nahualá',
    'San José Chacayá',
    'San Pablo La Laguna',
    'Santa Clara La Laguna',
    'Santiago Atitlán',
    'Panajachel',
    'San Juan La Laguna',
    'San Pedro La Laguna',
    'Santa Cruz La Laguna',
    'Sololá',
    'San Andrés Semetabaj',
    'San Lucas Tolimán',
    'Santa Catarina Ixtahuacan',
    'Santa Lucía Utatlán'],
  'Suchitepéquez': [
    'Chicacao',
    'Pueblo Nuevo',
    'San Bernardino',
    'San Juan Bautista',
    'Santa Bárbara',
    'Cuyotenango',
    'Río Bravo',
    'San Francisco Zapotitlán',
    'San Lorenzo',
    'Santo Domingo',
    'Mazatenango',
    'Samayac',
    'San Gabriel',
    'San Miguel Panán',
    'Santo Tomás La Unión',
    'Patulul',
    'San Antonio',
    'San José El Ídolo',
    'San Pablo Jocopilas',
    'Zunilito'],
  'Totonicapán': [
    'Momostenango',
    'San Francisco El Alto',
    'San Andrés Xecul',
    'Santa Lucía La Reforma',
    'San Bartolo',
    'Santa María Chiquimula',
    'San Cristóbal Totonicapán',
    'Totonicapán'],
  'Zacapa': [
    'Cabañas',
    'La Unión',
    'Usumatlán',
    'Estanzuela',
    'Río Hondo',
    'Zacapa',
    'Gualán',
    'San Diego',
    'Huité',
    'Teculután']
};

export default Controller.extend({

  // Esto está muy feo, se conoce como "pequeños cambios"

  departamentos: departamentos,
  datosMunicipios: municipios,
  distritos: departamentos.concat(['Distrito Central']),

  municipioDisabled: false,

  departamento: null,
  municipio: null,
  partido: null,
  distrito: null,

  municipios: computed('departamento', function() {
    return this.datosMunicipios[this.departamento];
  }),

  profiles: computed(
    'departamento',
    'municipio',
    'distrito',
    'partido',
    'model',
    function() {
      if(!this.departamento
        && !this.municipio
        && !this.partido
        && !this.distrito) {
        return this.model;
      }

      return this.model.filter((candidate) => {

        if (this.partido
          && candidate.partido.get('id') !== this.partido.get('id')) {
          return false;
        }

        if (this.departamento
          && candidate.get('departamento') !== this.departamento) {
          return false;
        }

        if (this.departamento
          && this.municipio
          && candidate.get('municipio') !== this.municipio) {
          return false;
        }

        if (this.distrito
          && candidate.get('distrito') !== this.distrito) {
          return false;
        }

        return true;
      });
  }),

  currentSelector: computed(
    'a',
    function() {
      if(!this.a) {
        return '*';
      }

      let selectors = [];

      if (this.a) {
        selectors.push('.a');
      }

      return selectors.join(', ');
    }
  ),

  _applyFilter() {

    var $container = $('#portfolio');

    $container.isotope({transitionDuration: '0.65s'});

    $container.isotope({filter: this.currentSelector});

    return false;
  },

  observerToMunicipio: observer('departamento', function() {
    this.set('municipioDisabled', !isBlank(this.departamento));
    this.set('municipio', null);
  }),

  // Pagination

  // setup our query params
  queryParams: ["page", "perPage"],

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 50,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedContent: pagedArray('profiles', {
    page: alias("parent.page"),
    perPage: alias("parent.perPage")
  }),

  // binding the property on the paged array
  // to a property on the controller
  totalPages: oneWay("pagedContent.totalPages"),

  actions: {
    applyFilter() {
      return this._applyFilter();
    },

    toProfile(profile) {
      this.transitionToRoute('perfil', profile.typeCommonName, profile.id);
      return false;
    }
  }
});
