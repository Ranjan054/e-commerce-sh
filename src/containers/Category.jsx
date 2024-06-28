const Category = ({ category, selectedCat, selectCategory }) => {
  return (
    <div className={`${selectedCat.toLowerCase() === category.toLowerCase() ? 'bg-purple-500 font-medium' : 'font-normal'} mt-2.5 w-full`}>
      <div onClick={() => selectCategory(category)} className='w-full px-[1.063rem] py-2 block cursor-pointer'>
        <p className="text-left font-ms text-base leading-5 text-grey7">{category}</p>
      </div>
    </div>
  );
};

export default Category;
