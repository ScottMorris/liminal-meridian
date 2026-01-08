import React from 'react';

const App: React.FC = () => {
	// Simple simulator layout: two stacked "display" surfaces
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '20px',
				padding: '20px',
				backgroundColor: '#f0f0f0',
				minHeight: '100vh',
			}}
		>
			<h1>Liminal Meridian Simulator</h1>

			{/* Top Display: Colour e-paper */}
			<div
				style={{
					width: '600px',
					height: '400px',
					border: '2px solid #333',
					backgroundColor: 'white',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<span style={{ color: '#666' }}>Top Display (Colour)</span>
			</div>

			{/* Bottom Display: Monochrome touch */}
			<div
				style={{
					width: '600px',
					height: '200px',
					border: '2px solid #333',
					backgroundColor: '#e0e0e0',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<span style={{ color: '#666' }}>Bottom Display (Touch)</span>
			</div>
		</div>
	);
};

export default App;
