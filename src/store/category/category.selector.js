export const selectCategoriesMap = (state) => state.categories.categories
    .reduce((accu, category) => {
        const { title, items } = category;
        accu[title.toLowerCase()] = items;
        return accu;
    }, {});