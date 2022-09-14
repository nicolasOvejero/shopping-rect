import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import './category.style.scss';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/category/category.selector';
import Spinner from "../../components/spinner/spinner.component";

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            {
                isLoading ? <Spinner /> :
                    (
                        <div className="category-container">
                        {
                            products && products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                        </div>
                    )
            }
        </Fragment>
    );
};

export default Category;