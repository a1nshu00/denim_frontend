import React, { useContext, createContext, FC, useState } from 'react'

type AccessTokenContext = [string, React.Dispatch<React.SetStateAction<string>>]

const AccessToken = createContext<AccessTokenContext>(null)

const AccessTokenProvider: FC = (props) => {
    const [accessToken, setAccessToken] = useState<string>(null)
    return <AccessToken.Provider value={[accessToken, setAccessToken]} {...props} />
}


const useAccessToken = (): AccessTokenContext => useContext<AccessTokenContext>(AccessToken)

// const [accessToken, setAccessToken] = useAccessToken();

export { AccessTokenProvider, useAccessToken }