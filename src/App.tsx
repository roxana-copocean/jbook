import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { store } from './state/store';
import CellList from './components/cell-list';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<CellList />
			</div>
		</Provider>
	);
};
export default App;
