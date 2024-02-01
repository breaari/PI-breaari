// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

// })

export default {
    // Directorio de salida para la construcción del proyecto
    build: {
      outDir: 'dist',
    },
  
    // Configuración del servidor de desarrollo
    server: {
      port: 5173, // Puerto para el servidor de desarrollo
    },
  
    // Opciones para el manejo de importaciones
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  
    // Configuración de rutas relativas
    base: '/',
  
    // Configuración para trabajar con rutas relativas en GitHub Pages
    // Descomentar y ajustar según sea necesario
    // base: '/nombre-del-repositorio/',
  };
