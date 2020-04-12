const schemaAdemicCertificate = {
    $schema: 'http://json-schema.org/draft-07/schema',
    description: 'Un esquema de activos digitales que representan certificados academicos',
    properties: {
        '$evidence': {
            'description': 'A path to the evidence JSON with data needed to verify the asset.',
            'type': 'string',
        },
        '$schema': {
            'description': 'A path to JSON Schema definition file.',
            'type': 'string',
        },
        id: {
            description: 'Id del certificado emitido por el centro al alumno',
            type: 'integer',
        },
        'pdf': {
            'description': 'A public property that can be a valid URI pointing to a resource with mime type image/pdf representing the asset to which this NFT represents',
            'type': 'string',
        },
        centro: {
            description: 'Centro formativo que emite el certificado',
            type: 'string',
        },
        titulo: {
            description: 'Nombre del programa o curso certificado',
            type: 'string',
        },
        homologacion: {
            description: 'Código de homologación necesario en algunos programas',
            type: 'string',
        },
        alumno: {
            description: 'Alumno al que se le emite el certificado academico',
            properties: {
                nombre: {
                    description: 'Nombre del alumno',
                    type: 'string',
                },
                apellidos: {
                    description: 'Apellidos del alumno',
                    type: 'string',
                },
                numero: {
                    description: 'Número de identificación del alumno, nif, nie, dni',
                    type: 'string',
                },
                nacimiento: {
                    description: 'Información referente al nacimiento del alumno',
                    properties: {
                        fecha: {
                            description: 'Fecha de nacimiento en milisegundos',
                            type: 'integer',
                        },
                        localidad: {
                            description: 'Localidad de nacimiento',
                            type: 'string',
                        },
                        provincia: {
                            description: 'Provincia de nacimiento',
                            type: 'string',
                        },
                        pais: {
                            description: 'País de nacimiento',
                            type: 'string',
                        }
                    },
                    type: 'object'
                }
            },
            type: 'object'
        },
        modalidad: {
            description: 'Modalidad utilizada para realizar el curso, online, presencial, semipresencial',
            type: 'string',
        },
        horasTotales: {
            description: 'Horas totales que supone la realizacion del curso',
            type: 'string',
        },
        realizadoEn: {
            description: 'Lugar en el que se realiza el programa formativa en el caso de ser presencial, semipresencial...',
            type: 'string',
        },
        nota: {
            description: 'Nota alcanzada por el alumno en la tituación',
            typte: 'string',
        },
        fecha: {
            description: 'Fecha en la que el alumno alcanza la titulación en milisegundos UTC.',
            type: 'integer',
        },
        emitidoEn: {
            description: 'Lugar desde el que se emite el certificado del certificado academico',
            type: 'string',
        },
        asignaturas: {
            description: 'Asignaturas que componen cada curso',
            items: {
                curso: {
                    description: 'Curso al que pertenece la asignatura',
                    type: 'integer',
                },
                nombre: {
                    description: 'Nombre de la asignatura',
                    type: 'string',
                },
                horas: {
                    description: 'Número de horas de la asignatura',
                    type: 'string',
                },
                nota: {
                    description: 'Nota de la asignatura',
                    type: 'string',
                },
                fecha: {
                    description: 'Fecha en alcanzar la nota sobre la asignatura en milisegundos UTC',
                    type: 'integer',
                }
            },
            type: 'array'
        }
    },
    required: ['$schema', 'id', 'pdf', 'centro', 'titulo', 'alumno', 'modalidad', 'nota', 'fecha', 'emitidoEn'],
    title: 'Academic Certificate Asset',
    type: 'object',
};

/**
 * schemaId: 292e4a1a4c1f74c57ff6c2b180f9f2be5ab1346dfa692c03e4c74ed541417b23
 * Ejemplo
 * {
    id: 1,
    centro: 'UNIR',
    titulo: 'Experto Universitario en desarrollo Blockchain',
    homologacion: 'EUDB-20200401-A',
    alumno: {
         nombre: 'Javier',
        apellidos: 'Montesinos Morcillo',
        numero: '52357721S',
        nacimiento: {
            fecha: 81558000000,
            localidad: 'Badajoz',
            provincia: 'Badajoz',
            pais: 'España',
        },
    },
    modalidad: 'Online',
    nota: '10',
    fecha: 1584313200000,
    lugar: 'Logroño',
    asignaturas: [
      {
          curso: 1,
        nombre: 'Criptografía',
        horas: '35',
        nota: '8,5',
        fecha: 1584313200000,
      },
      {
          curso: 1,
        nombre: 'Redes Blockchain',
        horas: '40',
        nota: '9,5',
        fecha: 1584313200000,
      }
    ],
  
}
 */