const empty_string = () => {
    return ""
}

const equal =(value, test) => {
    console.log(value, test);

    return true;
}
export default {
    findChildrenInObjectArray: (value, key, toMatch) => {
        if (!Array.isArray(value)) {
            return false;
        }

        return value.find(p => p[key] === toMatch);
    },
    equal,
    array_len(array) {
        if (!array || !Array.isArray(array)) {
            return 0;
        }
        return array.length
    },
    str_len(str) {
      return str.length
    },
    empty_string,
}

export function useDotAccessOperatorCustom(name, get, obj, type) {
    if (type === 'single-quoted'){
        return get(name)
    }
    return _.get(obj, name, undefined);
}
