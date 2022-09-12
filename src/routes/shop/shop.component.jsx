import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/category/category.actions';
import './shop.style.scss';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap  = async () => {
            const categories = await getCategoriesAndDocuments();
            dispatch(setCategories(categories));
        }

        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}></Route>
            <Route path=":category" element={<Category />}></Route>
        </Routes>
    );
};

export default Shop;