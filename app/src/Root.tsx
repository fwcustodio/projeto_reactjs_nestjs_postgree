import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import RoutesConfig from './routes';
import UnexpectedError from './resources/UnexpectedError';
import { CircularProgress } from '@mui/material';

import { AuthProvider } from './contexts/auth';

const Root: React.FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ErrorBoundary FallbackComponent={UnexpectedError}>
        <AuthProvider>
          <Routes>
            {RoutesConfig.map(({ path, element, ...args }) => {
              const Element = element;
              return <Route key={path} path={path} element={<Element />} {...args}></Route>;
            })}
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Root;
