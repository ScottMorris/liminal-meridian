export type DisplayMode =
	| 'mono1' // 1bpp
	| 'mono2' // 2bpp (4 greys)
	| 'palette6' // 6-colour indexed
	| 'palette7'; // 7-colour indexed

export type DisplayTarget = 'top' | 'bottom';

export interface DisplayResolution {
	width: number;
	height: number;
}
