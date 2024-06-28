import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './style.css';
import slideRight from '../assets/slide-right-white-icon.svg'
import slideLeft from '../assets/slide-left-white-icon.svg'
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { addProductToCart } from '../component/Homepage/store/action';


const ProductCard = ({ product, showEllipse }) => {
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();


  const clickHandler = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isEmpty(product)) dispatch(addProductToCart(product))
  };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  const cleanImageUrls = (data) => {
    const concatenatedString = data.join('');
    const cleanedString = concatenatedString.replace(/^\["|"]$/g, '');
    const urls = cleanedString.split('","').map(url => url.replace(/^"|"$/g, ''));
    return urls;
  };


  const SliderNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 sm:-right-[5px]"
      >
        <img
          className="inline-block"
          src={slideRight}
          alt="stars"
          width={12}
          height={24}
        />
      </button>
    );
  };

  const SliderPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 sm:-left-[5px]"
      >
        <img
          className="inline-block"
          src={slideLeft}
          alt="stars"
          width={12}
          height={34}
        />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    // autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="relative flex w-[12.813rem] flex-shrink-0 flex-col justify-end bg-white sm:w-[9.875rem]">
        <div>
          <div className="px-2.5 pb-2 pt-3 sm:px-2 sm:py-2.5">
            <div className='slider'>
              {/* {cleanImageUrls(product?.images).length > 1 ? ( */}
              {product?.images.length > 1 ? (
                <Slider {...settings}>
                  {/* {cleanImageUrls(product?.images).map((imgSrc, index) => ( */}
                  {product?.images.map((imgSrc, index) => (
                    <div key={index.toString()} className='test'>
                      <img
                        className="mx-auto h-32 w-32 sm:h-[7.5rem] sm:w-[7.5rem]"
                        src={imgSrc}
                        alt="product"
                        width={128}
                        height={128}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  className="mx-auto h-32 w-32 sm:h-[7.5rem] sm:w-[7.5rem]"
                  src={cleanImageUrls(product?.images)[0]}
                  alt="product"
                  width={128}
                  height={128}
                />
              )}
            </div>
            <p className="mt-3 font-ms text-[0.688rem] font-semibold leading-3.5 text-pink1">
              {product?.title}
            </p>
            <p
              className={`${showEllipse ? 'ellipse' : ''
                } mt-2 font-ms text-[0.688rem] font-normal leading-3.5 text-black sm:mt-1`}
            >
              {product?.description}
            </p>
            <div className="mt-2 flex items-center justify-between sm:mt-1 sm:flex-col sm:items-start">
              <p className="font-ms text-[0.688rem] font-semibold leading-3.5 text-black">
                ₹ {product?.price}
              </p>
            </div>
          </div>
        </div >

        <button
          onClick={(e) => clickHandler(e, product)}
          className="mt-4 w-full bg-purple-500 p-2 font-ms text-sm font-semibold leading-5 text-white"
        >
          Add to cart
        </button>
      </div >
      {/* <NotifyModal showModal={showModal} setShowModal={closeModal} /> */}
    </>
  )
};

export default ProductCard;
