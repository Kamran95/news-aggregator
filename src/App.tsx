import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout';
import { routeConfig } from './constants';
function App() {
    return (
        <Router>
            <MainLayout>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {routeConfig.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </Suspense>
            </MainLayout>
        </Router>
    );
}

export default App;
