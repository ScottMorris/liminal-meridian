export interface SurfaceConfig {
	cropLeft?: number;
	cropRight?: number;
	cropTop?: number;
	cropBottom?: number;
}

export interface DeviceConfig {
	topSurface?: SurfaceConfig;
	bottomSurface?: SurfaceConfig;
}
