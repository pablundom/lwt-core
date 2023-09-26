


export default  {
    margin: {
        type: 'style_property',
        props: {
            key: 'margin',
            type:'number',
            label: 'Margen',
            validation: {
                number: true
            }
        },
    },
    padding: {
        type: 'style_property',
        props: {
            key: 'padding',
            type:'number',
            label: 'Espacio de relleno',
            validation: {
                number: true
            }
        },
    }
}