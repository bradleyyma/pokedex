export const filter_obj = (allowed, init_obj) => {
    console.log(allowed, init_obj)
    return(
        Object.keys(init_obj)
            .filter(key => allowed.includes(key))
            .reduce( (obj, key) => {
                return {
                    ...obj,
                    [key]: init_obj[key]
                };
            }, {})
    )
}