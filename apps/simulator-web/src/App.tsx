import React from 'react';
import styles from './App.module.css';
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import { PreviewArea } from './components/PreviewArea/PreviewArea';

const App: React.FC = () => {
	return (
		<div className={styles.container}>
			<ConfigPanel />
			<PreviewArea />
		</div>
	);
};

export default App;
