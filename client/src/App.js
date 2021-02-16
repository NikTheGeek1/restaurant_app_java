import { useEffect, useState } from 'react';
import './App.css';
import RestaurantCanvas from './components/RestaurantCanvas/RestaurantCanvas';

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
      const dummyTableData = [
        { available: Math.random() > 0.5 },
        { available: Math.random() > 0.5 },
        { available: Math.random() > 0.5 },
        { available: Math.random() > 0.5 },
        { available: Math.random() > 0.5 },
        { available: Math.random() > 0.5 },
        { available: Math.random() > 0.5 },
        { available: Math.random() > 0.5 }
      ];
      setTableData(dummyTableData);

  }, []);
  
  return (
    <main className="App">
      <RestaurantCanvas tableData={tableData} />
    </main>
  );
}

export default App;
