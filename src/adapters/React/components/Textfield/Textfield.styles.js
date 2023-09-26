
export default {
    input: {
        name: 'Estilos del campo de texto',
        description: 'Aquí puedes describir los estilos del propio campo de texto',
        properties: {
            backgroundColor: {
                type: 'style_property',
                props: {
                    key: 'backgroundColor',
                    label: 'Color de fondo',
                    type: 'color'
                }
            },
            color: {
                type: 'style_property',
                props: {
                    key: 'color',
                    label: 'Color de letras',
                    type: 'color'
                }
            },
            margin: {
                type: 'style_property',
                props: {
                    key: 'margin',
                    type: 'number',
                    label: 'Margen',
                },
            },
            padding: {
                type: 'style_property',
                props: {
                    key: 'padding',
                    label: 'Espacio de relleno',
                    type: 'number',
                },
            }

        }
    },
}