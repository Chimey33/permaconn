import React from 'react';
import {ProductsPage} from "./components/pages/ProductsPage";
import {QueryClient, QueryClientProvider} from "react-query";

export const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ProductsPage/>
        </QueryClientProvider>
    );
}

export default App;
