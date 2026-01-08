import React from 'react';
import styles from './App.module.css';
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import { PreviewArea } from './components/PreviewArea/PreviewArea';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
	const { mode, setMode, resolvedTheme } = useTheme();

	return (
		<div className={styles.container} data-theme={resolvedTheme}>
			<ConfigPanel themeMode={mode} onThemeChange={setMode} />
			<PreviewArea />
		</div>
	);
};

export default App;
