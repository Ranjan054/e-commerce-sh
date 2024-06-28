import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCard from "../../containers/ProductCard";
import CategoryLeftMenu from "../../containers/CategoryLeftMenu";
import Loader from '../../containers/Loader';
import { getProductList } from './store/action';
import { apiState } from "../../constant";
import AutoComplete from '../../containers/AutoComplete';


const Homepage = () => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.productList);
    const productListState = useSelector((state) => state.products.productListState);
    const searchQuery = useSelector((state) => state.products.searchQuery);

    const [productList, setProductList] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(() => parseInt(searchParams.get('page')) || 1);
    const [limit] = useState(() => parseInt(searchParams.get('limit')) || 10);
    const [sort, setSort] = useState(() => searchParams.get('sort') || '');
    const [filter, setFilter] = useState(() => searchParams.get('filter') || '');

    const { LOADING, SUCCESS, ERROR } = apiState;


    useEffect(() => {
        if (!productList.length) dispatch(getProductList({ page, limit }));
    }, []);

    const updateSearchParams = (params) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });
        setSearchParams(newParams);
    };


    useEffect(() => {
        updateSearchParams({ page, limit });
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        if (products.length && !sort && !filter) {
            setProductList(products.slice(startIndex, endIndex))
        }

    }, [page, products]);

    useEffect(() => {
        if (sort && productList.length) {
            updateSearchParams({ sort });
            const pList = [...productList]
            if (sort === 'asc') {
                setProductList(pList.sort((a, b) => a.price - b.price))
            } else {
                setProductList(pList.sort((a, b) => b.price - a.price))
            }
        } else {
            updateSearchParams({ page, limit, sort: null, filter: null });
        }
    }, [sort]);

    useEffect(() => {
        if (filter && products) {
            updateSearchParams({ filter });
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const pList = products.slice(startIndex, endIndex);
            setProductList(pList.filter(el => el?.category?.name === filter) || [])
        } else {
            updateSearchParams({ page, limit, sort: null, filter: null });
        }
    }, [filter, products]);

    useEffect(() => {
        if (productList.length) {
            const pList = [...productList];
            setProductList(pList.filter(el => el?.title.toLowerCase().includes(searchQuery.toLowerCase())) || [])
        }
    }, [searchQuery]);

    const selectCategory = (cat) => {
        setFilter(cat || '');
    }

    const onClickPrevious = () => {
        if (page > 1) {
            setPage(page - 1);
            setSort('')
            setFilter('')
            window.scrollTo(0, 0);
        }
    };

    const onClickNext = () => {
        setPage(page + 1);
        setSort('')
        setFilter('')
        window.scrollTo(0, 0);
    };

    const onSortClick = () => {
        if (sort === 'asc') {
            setSort('desc')
        } else {
            setSort('asc')
        }
    };

    if (productListState === ERROR) {
        return <h3 className='text-center text-red-600 text-2xl font-rb p-4'>Something went wrong please try again later!</h3>
    }

    return (
        <section
            className="pb-12 pt-10 relative overflow-hidden sm:pt-4.5 sm:pb-7"
            style={{
                background:
                    'linear-gradient(180deg, #F2E8FF 0%, #F8F3FF 0.01%, #F8F2FF 0.02%, #F5E8FF 44%, #F1DBFF 100%)'
            }}>
            <div className="container mx-auto px-1 sm:px-4">
                <AutoComplete />
                <div className="flex sm:block">
                    <CategoryLeftMenu selectCategory={selectCategory} />
                    <div className="w-9/12 border-l-[0.75px] border-grey5 pl-5 pt-4 sm:w-full sm:border-none sm:pl-0">
                        {productListState === LOADING ? (
                            <div className='flex justify-center items-center p-4'>
                                <Loader />
                            </div>
                        ) : null}

                        {productListState === SUCCESS ? (
                            <>
                                <div className='flex justify-end'>
                                    <button
                                        onClick={() => onSortClick()}
                                        className="rounded-md bg-white px-6 py-2 border mb-4 sm:px-4 sm:py-1"
                                    >
                                        <span className="font-ms text-xl font-normal leading-6 text-black sm:text-sm">Sort</span>
                                    </button>
                                </div>

                                <div className="flex flex-wrap justify-center gap-4 sm:gap-2.5">
                                    {productList.length ? (
                                        productList.map(product => (
                                            <ProductCard key={product.id} product={product} showEllipse={true} />
                                        ))
                                    ) : (
                                        <p className='text-xl text-black font-rb font-medium text-center'>No Data</p>
                                    )}
                                </div>

                                <div className="mt-7.5 flex flex-row justify-center gap-x-[0.313rem] sm:mt-5">
                                    <div>
                                        <button
                                            disabled={page < 2}
                                            className={`${page < 2 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} min-w-[2.375rem] rounded-md border border-grey1 bg-white px-3.5 py-1.5 text-center sm:px-3 sm:py-1`}
                                            onClick={onClickPrevious}
                                        >
                                            <span className="font-ms text-[0.938rem] font-medium leading-5 text-grey8 sm:text-xs sm:leading-4">
                                                Prev
                                            </span>
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className="ml-auto min-w-[2.375rem] rounded-md border border-grey1 bg-white px-3.5 py-1.5 text-center sm:px-3 sm:py-1"
                                            onClick={onClickNext}
                                        >
                                            <span className="font-ms text-[0.938rem] font-medium leading-5 text-grey8 sm:text-xs sm:leading-4">
                                                Next
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Homepage;