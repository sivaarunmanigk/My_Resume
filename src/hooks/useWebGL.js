import { useEffect, useState } from 'react';

/**
 * Detects WebGL availability and capability level.
 * Returns: { supported: bool, level: 'webgl2' | 'webgl1' | 'none' }
 */
export function useWebGL() {
  const [webgl, setWebgl] = useState({ supported: true, level: 'webgl2' });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      let level = 'none';

      if (canvas.getContext('webgl2')) {
        level = 'webgl2';
      } else if (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) {
        level = 'webgl1';
      }

      setWebgl({ supported: level !== 'none', level });
    } catch {
      setWebgl({ supported: false, level: 'none' });
    }
  }, []);

  return webgl;
}
