import { RotatingLines } from 'react-loader-spinner';


export const Loader = () => {
    return (
        <div className='Loader'>
            <RotatingLines
                strokeColor="#303f9f"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};