import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Category from "./Category";
import { apiState } from "./../constant";
import CategoryDropdown from "./CategoryDropdown";
import { getCategoryList } from "../component/Homepage/store/action";
import Loader from "./Loader";


const CategoryLeftMenu = ({ selectCategory }) => {
    const { LOADING, SUCCESS, ERROR } = apiState;

    const [searchParams] = useSearchParams();
    const category = searchParams.get('filter') || '';

    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.products.categoryList);
    const categoryListState = useSelector((state) => state.products.categoryListState);



    useEffect(() => {
        if (!categoryList.length) dispatch(getCategoryList());
    }, []);

    if (categoryListState === ERROR) {
        return <h3 className='text-center text-red-600 text-base font-rb p-4'>Something went wrong please try again later!</h3>
    }

    return (
        <div className="w-1/4 pt-4 sm:w-full sm:pt-0">
            {categoryListState === LOADING ? (
                <div className='flex justify-center items-center p-4'>
                    <Loader />
                </div>
            ) : null}
            {categoryListState === SUCCESS && categoryList.length ? (
                <>
                    <div className="sm:hidden">
                        <>
                            <p className="font-ms text-lg font-medium leading-5.5 text-black">List of Categories</p>
                            {categoryList.map((cat) => (
                                <Category
                                    key={cat?.id}
                                    category={cat?.name}
                                    selectedCat={category || ''}
                                    selectCategory={selectCategory}
                                />
                            ))}
                        </>
                    </div>
                    <div className="hidden sm:block">
                        <CategoryDropdown
                            list={categoryList}
                            selectedCat={category || ''}
                            selectCategory={selectCategory}
                        />
                    </div>
                </>
            ) : null}
        </div>

    )
}

export default CategoryLeftMenu;