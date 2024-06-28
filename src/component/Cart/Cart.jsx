import { useDispatch, useSelector } from "react-redux";
import { decreaseProduct, deleteProduct, increaseProduct } from "../Homepage/store/action";

const Cart = () => {

    const cartProduct = useSelector((state) => state.products.cartProduct);
    const dispatch = useDispatch();

    console.log(cartProduct, 'cartProduct');

    const totalAmount = cartProduct.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <section
            className="pb-12 pt-10 relative overflow-hidden sm:pt-4.5 sm:pb-7"
            style={{
                background:
                    'linear-gradient(180deg, #F2E8FF 0%, #F8F3FF 0.01%, #F8F2FF 0.02%, #F5E8FF 44%, #F1DBFF 100%)'
            }}>
            <div className="container mx-auto px-1 sm:px-4">
                <>
                    <div className='flex gap-x-2.5 pb-4.5 border-b border-[#121212]/10 mt-7.5 sm:mt-7'>
                        <div className='w-[66%]'>
                            <p className='text-black/60 text-xs font-medium leading-3 font-ms'>Product</p>
                        </div>
                        <div className='w-[20%] sm:hidden'>
                            <p className='text-black/60 text-xs font-medium leading-3 font-ms'>Quantity</p>
                        </div>
                        <div className='w-[14%] sm:w-[34%]'>
                            <p className='text-black/60 text-xs font-medium leading-3 font-ms text-right'>Total</p>
                        </div>
                    </div>

                    {cartProduct.length ? (
                        <>
                            {cartProduct.map((product) => (
                                <div key={product.id} className='pb-10 border-b border-[#121212]/10 sm:pb-7.5'>
                                    <div key={'d'} className='flex pt-10 gap-x-2.5 sm:pt-7.5 sm:gap-x-[5%] sm:gap-y-4 sm:flex-wrap sm:justify-end'>
                                        <div className='w-[66%] sm:order-1 sm:w-[70%]'>
                                            <div className="flex gap-8 sm:gap-4">
                                                <div className="relative flex h-[6.75rem] w-[6.75rem] shrink-0 items-center justify-center border-[0.5px] border-grey5 sm:h-24 sm:w-24">
                                                    <img
                                                        src={product.images[0] || ''}
                                                        alt="product"
                                                        className="p-1"
                                                    />
                                                </div>
                                                <div className='max-w-[25rem]'>
                                                    <div className='flex items-center gap-x-1.5'>
                                                        <p className="font-ms text-xs font-semibold text-pink1">
                                                            {product?.title}
                                                        </p>
                                                    </div>
                                                    <p className="mt-0.5 font-ms text-[0.938rem] leading-5 font-medium text-black">
                                                        {product?.description}
                                                    </p>
                                                    <p className="mt-0.5 font-ms text-sm font-normal text-black/90">
                                                        ₹ {product?.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='w-[17%] sm:order-3 sm:w-[65.5%]'>
                                            <div className='flex gap-x-5'>
                                                <div onClick={() => dispatch(decreaseProduct(product?.id))} className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-white border border-gray-500">
                                                    <p className="text-sm text-black font-rb">-</p>
                                                </div>
                                                <div className="flex items-center justify-center w-9 h-6 rounded bg-white border border-gray-500">
                                                    <p className="text-sm text-black font-rb">{product?.quantity}</p>
                                                </div>
                                                <div onClick={() => dispatch(increaseProduct(product?.id))} className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-white border border-gray-500">
                                                    <p className="text-sm text-black font-rb">+</p>
                                                </div>
                                                <div className='flex items-center justify-center'>
                                                    <div onClick={() => dispatch(deleteProduct(product?.id))} className="flex items-center justify-center py-1 px-2 rounded bg-white border border-gray-500 cursor-pointer">
                                                        <p className="text-sm text-black font-rb">Delete</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='w-[17%] pl-10 sm:order-2 sm:pl-0 sm:w-[25%]'>
                                            <p className="mt-3.5 font-ms text-base font-medium text-black text-right sm:mt-0.5">
                                                ₹ {product?.price * product?.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className='flex justify-end pt-12 sm:pt-9 sm:flex-col'>
                                <div className='flex items-center justify-end gap-x-5 flex-wrap sm:justify-center'>
                                    <p className="font-hv text-base font-medium text-black/90 sm:text-sm">
                                        Total:
                                    </p>
                                    <p className="font-ms text-lg font-semibold text-black/80 sm:text-base">
                                        ₹ {totalAmount}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : <p className='text-xl text-black font-rb font-medium text-center mt-8'>No Data</p>}
                </>
            </div>
        </section>
    )
}

export default Cart;