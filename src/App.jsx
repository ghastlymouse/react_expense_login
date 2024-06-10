import React from 'react'
import Router from './routes/Router'
import GlobalStyle from './GlobalStyle'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={Router} />;
    </>
  )
}

export default App