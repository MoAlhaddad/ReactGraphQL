import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import client from './graphql/client.js'
import './index.css'
import App from './App.jsx'
import {ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';




ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    
    <App />
    
    </ApolloProvider>
  </StrictMode>,
)
