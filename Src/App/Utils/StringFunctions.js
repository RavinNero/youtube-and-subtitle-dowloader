module.exports = {
    async toSnakeCase(str) {
        const strArr = str.split(' ');

        const snakeArr = strArr.reduce((acc, val) => {
           return acc.concat(val.toLowerCase());
        }, []);

        return snakeArr.join('_');
    }
}