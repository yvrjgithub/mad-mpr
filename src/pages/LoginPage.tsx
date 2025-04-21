import React from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;