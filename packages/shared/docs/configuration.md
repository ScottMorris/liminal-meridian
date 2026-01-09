# Device Configuration

The `DeviceConfig` interface provides a standardized schema for hardware-specific configuration, allowing the software to adapt to different physical deployments (e.g., prototypes with bezels, different enclosures, or specific calibration needs).

## Purpose

The Surfaces components (`TopSurface`, `BottomSurface`) are designed to be "dumb" and render at full resolution. However, physical hardware often has constraints—such as bezels covering part of the screen—that require the UI layout to adjust.

The `DeviceConfig` allows the **Host Application** (Simulator or Device Shell) to inject these constraints into the components at runtime.

## Schema

defined in `@liminal/shared/types/config.ts`:

```typescript
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
```

## Usage Pattern

### 1. Loading Configuration (Host Application)

In a real deployment, the host application is responsible for loading this configuration. Common sources include:

*   A local `config.json` file.
*   Environment variables.
*   A remote configuration service.

**Example (Node.js Host):**

```typescript
import { readFileSync } from 'fs';
import type { DeviceConfig } from '@liminal/shared/types/config';

function loadConfig(): DeviceConfig {
    try {
        const data = readFileSync('/etc/liminal/device-config.json', 'utf8');
        return JSON.parse(data);
    } catch {
        return {}; // Default config
    }
}
```

### 2. Injecting Configuration (Components)

The host application passes the relevant configuration parts to the surface components.

**Example (React):**

```tsx
const App = () => {
    const config = loadConfig();
    const bottomCropLeft = config.bottomSurface?.cropLeft || 0;
    const bottomCropRight = config.bottomSurface?.cropRight || 0;

    return (
        <BottomSurface
            profile={profile}
            cropLeft={bottomCropLeft}
            cropRight={bottomCropRight}
            {...otherProps}
        />
    );
};
```

## Simulator Support

The Simulator (`apps/simulator-web`) includes a "Bezel Configuration" panel that generates a `DeviceConfig` in real-time, allowing developers to test how layouts respond to physical constraints without flashing hardware.
