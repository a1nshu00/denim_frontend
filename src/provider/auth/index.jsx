
import React, { useContext, createContext, FC, useState, useEffect } from 'react'
import { Box } from "@mui/material";
import { Loader } from "@components";
import { enqueueSnackbar } from "notistack"
import { AuthService } from "@service";
import { useNavigate } from "react-router-dom";
import { useMemo } from 'react';



const AuthUser = createContext(null)

const AuthServiceProvider = {}

const AuthProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [authUser, setAuthUser]   = useState({})
    const [userPermissions, setUserPermissions] = useState([])
    const navigate                  = useNavigate();

    useEffect(function(){
        checkLogin();
    }, [])

    AuthServiceProvider.Auth = authUser

    const canAccess = (permission, userPermissions) => {

        if (Array.isArray(permission)) {
            for (const currentPermission of permission) {
                if (!userPermissions.includes(currentPermission)) {
                    return false;
                }
            }
            return true;
        }

        if (!userPermissions.includes(permission)) {
            return false;
        }
        
        return true;
    }


    const checkLogin = async () => {      
        const {status, permissions, userType = 'ADMIN'} = await AuthService.check(true);
        if (status) {
            setUserPermissions(permissions);

            setAuthUser({
                gate : (permission) => {return canAccess(permission, permissions)},
                userType : (type) => {return type.toUpperCase() == userType.toUpperCase() }
            });

            return setTimeout(() => setIsLoading(false), 300)
        }

        navigate('/login');
        setTimeout(() => setIsLoading(false), 100);
        enqueueSnackbar('Please login to continue', { variant : 'info' });
    }

    if (isLoading) {
        return <Box style={{ 
            height:'100vh',
            width:'100vw',
            display:'flex', justifyContent:"center", alignItems:'center'
        }}>
            <Loader loading={isLoading} block/>
        </Box>;
    }

    return <AuthUser.Provider value={authUser} {...props} /> 
}

export default AuthProvider

const useAuth = () => useContext(AuthUser)

export { useAuth, AuthServiceProvider  }
