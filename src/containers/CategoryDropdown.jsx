import slideLeftIcon from '../assets/slide-left-icon.svg'
const CategoryDropdown = ({ list, selectedCat, selectCategory }) => {

  const handleChange = (e) => {
    selectCategory(e.target.value);
  }

  return (
    <div className="w-full flex mt-2 border-[0.7px] border-purple-500">
      <div className='w-[40%] px-4 py-2.5 bg-purple-500'>
        <p className="text-center font-ms text-xs font-normal text-white">Select Category</p>
      </div>
      <div className='relative w-[60%]'>
        <select
          className='w-full overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer appearance-none bg-white pl-2.5 pr-8 py-2.5 font-ms text-xs font-normal text-black outline-none'
          onChange={(e) => handleChange(e)}
          name="product-tab">
          <option className='text-center' value=''>
            Select
          </option>
          {list.map((item) => (
            <option selected={selectedCat.toLowerCase() === item?.name.toLowerCase()} className='text-center' value={item?.name} key={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
        <img
          className="absolute right-3.5 top-1/2 -translate-y-1/2 -rotate-90 w-3.5 h-3.5 shrink-0"
          src={slideLeftIcon}
          alt="supplier"
          width={14}
          height={14}
        />
      </div>
    </div>
  );
};

export default CategoryDropdown;
