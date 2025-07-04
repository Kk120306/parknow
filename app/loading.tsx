import Loader from './components/Loader';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <Loader />
        </div>
    );
};

export default Loading;
