/**
 *
 * @param object
 * @returns {*[]}
 */
export const flatObjectAnyString = (object) => {
    const res = [];
    flatObjectAnyStringRecursive(object, res)
    return res;
}
/**
 *
 * @param object
 * @param res
 * @returns {*[]|*}
 */
const flatObjectAnyStringRecursive = (object, res = []) => {
    if (!object) {
        return res;
    }
    if (!Object.values(object).some(p => typeof p === 'string' || Array.isArray(p) || typeof p === 'object')) {
        return res;
    }
    res.push(object);
    for (let i in object) {
        if (Array.isArray(object[i])) {
            continue;
        }
        if (typeof object[i] === 'object') {
            return flatObjectAnyStringRecursive(object[i], res);
        }
    }

    return res;
}