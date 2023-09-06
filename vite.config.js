import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias     : {
        '@'          : path.resolve(__dirname, 'src'),
        '@hooks'     : path.resolve(__dirname, 'src/hooks'),
        '@api'     : path.resolve(__dirname, 'src/api'),
        '@routes'     : path.resolve(__dirname, 'src/routes'),
        '@config'     : path.resolve(__dirname, 'src/config'),
        '@pages'     : path.resolve(__dirname, 'src/pages'),
        '@layout'     : path.resolve(__dirname, 'src/layout'),
        '@service'     : path.resolve(__dirname, 'src/service'),
        '@assets'    : path.resolve(__dirname, 'src/assets'),
        '@provider'    : path.resolve(__dirname, 'src/provider'),
        '@store'    : path.resolve(__dirname, 'src/store'),
        '@components': path.resolve(__dirname, 'src/components')
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
},
})
