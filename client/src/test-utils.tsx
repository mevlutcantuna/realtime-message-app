import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store'

const WithProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    )
}

const renderWithProviders = (
    ui: React.ReactElement,
    options?: RenderOptions
) => {
    return render(ui, { wrapper: WithProviders, ...options })
}

export * from '@testing-library/react'

export { renderWithProviders as render }
