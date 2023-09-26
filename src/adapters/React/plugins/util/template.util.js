



export const interpolate = ({string, data = {}}) => {
    const compiled = _.template(string);

    return compiled(data);
}