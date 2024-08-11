// import { axiosInstance } from './api';
import { MainLayout } from './layout';
import { Home } from './pages';
function App() {
    // const handleApiCall = () => {
    //     axiosInstance.get('');
    // };
    return (
        <MainLayout>
            <Home />
        </MainLayout>
    );
}

export default App;
