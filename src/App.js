import { Page } from "./Components/Page";

import { BrowserRouter as Router } from 'react-router-dom';

document.documentElement.className = 'dark';

function App() {
    
    return <Router>
        <Page/>
    </Router>
}

export default App;
