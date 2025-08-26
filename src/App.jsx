import AppRoutes from "./Routes.jsx";
import {DataProvider} from "./DataProvider/DataProvider.jsx";


function App() {
    return(
        <DataProvider>
            <AppRoutes />
        </DataProvider>
    );
}

export default App;
