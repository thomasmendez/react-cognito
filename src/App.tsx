import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { fetchAuthSession } from 'aws-amplify/auth';

import '@aws-amplify/ui-react/styles.css'

import config from './auth/config.ts'
import './App.css'
import { useEffect, useState } from 'react'

Amplify.configure(config)

function App() {
  const [sessionToken, setSessionToken] = useState<string | undefined>(undefined)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(import.meta.env.VITE_API_GATEWAY_ENDPOINT, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          "firstName": "John",
          "lastName": "Doe"
        })
      })
      const resData = await response.json()
      console.log(JSON.stringify(resData))
      setData(resData)
    }

    async function fetchSessionToken() {
      const session = await fetchAuthSession();
      const sessionToken = session.tokens?.idToken?.toString()
      console.log(sessionToken)
      setSessionToken(sessionToken)
    }

    fetchSessionToken()

    if (sessionToken !== undefined) {
      fetchData()
    }
  }, [sessionToken])

  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <p>LoginId: {user?.signInDetails?.loginId}</p>
            <p>Username: {user?.username}</p>
            <p>AuthFlowType: {user?.signInDetails?.authFlowType}</p>
            <p>Response Data: {JSON.stringify(data)}</p>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </Authenticator>
    </div>
  )
}

export default App
