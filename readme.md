# LWT

LWT es una librería en construcción (hecha para aprendizaje y profundización de conocimientos) cuya funcionalidad 
base es la creación de frontales web mediante una interfaz gráfica (*drag and drop*) y la gestión de componentes
*in-built* y la configuración de los componentes en el frontal, sus propiedades de estilo, comportamiento etc.

El objetivo de esta librería es el poder realizar frontales con un nivel de complejidad medio, especializado en 
frontales basado en formularios y que personas de un nivel tecnico que no incluya la programación puedan diseñar frontales
y comportamientos de los frontales de una manera más sencilla.

Uno de los objetivos es que la librería no esté acoplada a un sistema de renderizado, como podría ser el de React, sino que
estuviera lo más desacoplado posible para que añadir más motores de renderizado sea lo más directo posible. Los componentes
visuales están compuestos por dos conceptos, la lógica del componente (como se comporta con el resto de componentes y 
la propia librería) y la lógica del renderizado del propio componente.

El siguiente trozo de código es un ejemplo de la lógica de renderizado. Este caso es React, pero podría incluirse, en el futuro, más librerías
de renderizado como Angular o Svelte.

```jsx
export const Textfield = ({component, type, ...props}) => {
    const startAdornment = () => {
        if (type === 'color') {
            return <InputAdornment position="start">
                <input style={{width: '25px'}} value={props.value} onInput={props.onInput} type="color"/>
            </InputAdornment>
        }
        return null;
    }
    return <TextField InputProps={{startAdornment: startAdornment(), style: props.input_sx ?? {}}} InputLabelProps={{style: props.label_sx ?? {}}} {...props} />
}
```

Este trozo de código sería un ejemplo del esquema de definición del componente y la lógica del componente.

```javascript

export default {
    type: 'textfield',
    key:'textfield',
    builder: {
        icon: 'text_fields',
        group: 'basic',
        key:'textfield',
        name: "Campo de Texto",
        index : 0,
        styles: textfieldStyles
    },
    class: Textfield,
    editSchema: textfieldEditor,
    defaultProps: {
        fullWidth: true,
        label: 'Campo de Texto',
        multiline: false,
        minRows: 1,
        maxRows: null,
        styles: {},
        variant:'filled',
    }
}
```

Como se puede apreciar el código anterior no tiene apenas lógica del componente puesto que la mayoría de funcionalides
básicas están abstraidas en plugins que incorporan todos los componentes por defecto. Qué plugin se añaden por defectos
se definen al declarar la clase de la librería **LWT**.

## Plugins

Los plugins forman una parte fundamental de la librería y su uso básico es extender la funcionalidad de los componentes
de manera que se pueda compartir funcionalidad común en uno o más componentes. Los plugins se pueden definir de manera global
para que se apliquen a todos los componentes y de manera local para añadir plugins específicos a los componentes que se quiera.
Las funcionalidades van desde añadir una capa extra visual por encima del componente, a modificar el comportamiento del componente
o añadir propiedades útiles al componente.

El siguiente ejemplo es la declaración de un plugin y parte de su lógica:

```javascript
export default {
    name: 'input',
    reactComponent: InputDecorator,
    hooks: {
        modifyEditSchema: inputEditor,
        onComponentInstanciate: inputComponentInstanciate,
    },
}
export const InputDecorator = ({component, options, contains, parent, ...props}) => {
    const {value, setValueByComponent, buildKey} = useStateStore();
    const componentValue = get(value, buildKey(component));

    const onInput = (e) => {
        if (component.props.key) {
            setValueByComponent(component, e.target?.value ?? e);
        }
        props.onInput && props.onInput(e);
        props.onChange && props.onChange(e);
    }
    return cloneElement(contains, {onInput, onChange: onInput, ...props,  value: componentValue ?? '', truekey: buildKey(component)});
}

```

En la propiedas hooks se definen los hooks que se llamarán cuando ciertas acciones o condiciones aparezcan en el plugin,
como cuando se instancia el componente, y el reactComponent (pendiente de refactorizar para permitir varias librerías de renderizado)
el componente visual que actuará como capa por encima del componente que incluye el plugin.