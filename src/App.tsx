import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import config from './auth/config.ts'
import './App.css'

Amplify.configure(config)

function App() {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <p>LoginId: {user?.signInDetails?.loginId}</p>
            <p>Username: {user?.username}</p>
            <p>AuthFlowType: {user?.signInDetails?.authFlowType}</p>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </Authenticator>
    </div>
  )
}

export default App
