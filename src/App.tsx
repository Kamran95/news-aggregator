import { axiosInstance } from './api';

function App() {
    const handleApiCall = () => {
        axiosInstance.get('');
    };
    return (
        <div className="App">
            <button onClick={handleApiCall} className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
                ...
            </button>
        </div>
    );
}

export default App;
