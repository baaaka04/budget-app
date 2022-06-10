export function groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
        if (!acc[currentValue[criteria]]) {
            acc[currentValue[criteria]] = [];
        }
        acc[currentValue[criteria]].push(currentValue);
        return acc;
    }, {});
    return newObj;
}

export function getJSONfromCSV(csv) {
    const trs = csv.trim().split("\n")
        .map((line) => line.split(","))
        .map((array) => {
            const category = array[0];
            const subCategory = array[1];
            const opex = array[2];
            const date = array[3].slice(5);
            const sum = array[4];

            const obj = {
                category: category,
                subCategory: subCategory,
                opex, // упрощение синтаксиса двух строк выше
                date,
                sum,
            };
            return obj;
        });
    return trs
};