import Routers from "@routes"
import { SnackbarProvider } from "notistack"
import { AccessTokenProvider } from "./provider/accessToken"
import { store } from '@store'
import { Provider } from 'react-redux'
import { createTheme } from "react-data-table-component"
import { AuthProvider } from "@provider"


createTheme('solarized', {
    text: {
      primary: '#022',
      secondary: '#025',
    },
    background: {
      default: 'rgba(105, 108, 255, 0.07)',
    },
    divider: {
      default: '#FFFFFF',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark');

createTheme('solarized2', {
  text: {
    primary: '#022',
    secondary: '#025',
  },
  background: {
    default: 'rgba(200, 200, 200, 0.07)',
  },
  divider: {
    default: '#FFFFFF',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

const App = () => {
    return (
        <AccessTokenProvider>
            <SnackbarProvider maxSnack={4} autoHideDuration={3000} anchorOrigin={{horizontal:'right', vertical: 'bottom'}}>
                <Provider store={store}>
                    <AuthProvider>
                      <Routers />
                    </AuthProvider>
                </Provider>
            </SnackbarProvider>
        </AccessTokenProvider>
    )
}


export default App
