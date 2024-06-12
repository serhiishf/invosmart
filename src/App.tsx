import './App.scss';
import { Input, InputBase } from './components/ui';

function App() {
  return (
    <div className="App">
      {' '}
      <Input label="Label" />
      <InputBase />
      <Input label="Password" type="password" />
    </div>
  );
}

export default App;
