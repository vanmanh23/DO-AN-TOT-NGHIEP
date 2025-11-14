import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes } from '@generouted/react-router'
import {Toaster}  from './components/ui/sonner'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Routes />
    <Toaster />
  </React.Fragment>
)
