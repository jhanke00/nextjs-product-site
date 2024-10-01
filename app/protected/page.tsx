'use client';

import ProtectedRoute from '@components/ProtectedRoute';

const Protected = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Protected Page</h1>
        <p>Only accessible by signed-in users.</p>
      </div>
    </ProtectedRoute>
  );
};

export default Protected;
