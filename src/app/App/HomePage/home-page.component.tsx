import { MenuBar } from '../components/menu-bar';
import "./home-page.style.scss";

export const HomePage = () => {
    return (
        <div className='home-page'>
            <div className='page-container'>
                <section className='left-content'>
                    <div className='label'>FARMHOME</div>
                    <MenuBar />
                </section>
            </div>
        </div>
    );
};