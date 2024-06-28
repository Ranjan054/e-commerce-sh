import { Link } from 'react-router-dom';
import cartIcon from '../../assets/cart.svg'
import { useSelector } from 'react-redux';

const Header = () => {

    const cartProduct = useSelector((state) => state.products.cartProduct);

    return (
        <header className="bg-black">
            <div className="container mx-auto px-1 sm:px-4">
                <nav className="flex items-center py-4 justify-between">
                    <Link to={'/'} className="relative z-20">
                        <h3 className='font-rb text-lg leading-5.5 font-semibold text-white'>E-Commerce</h3>
                    </Link>
                    <Link to={'/cart'} className="flex h-[2.125rem] w-[2.125rem] relative items-center justify-center rounded-full bg-white">
                        <div className="relative h-4.5 w-4.5">
                            <img src={cartIcon} alt="cart" />
                        </div>
                        {cartProduct.length ? (
                            <div className="absolute -right-1 -top-2 h-4 w-4 rounded-full bg-purple-400 text-white text-center text-[0.688rem] font-ms font-medium">
                                {cartProduct.length}
                            </div>
                        ) : null}
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;