
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Renders children only if user.role is in allowed list.
 */
export default function RoleGuard({ allow=['admin'], children, fallback=null }){
  const { user } = useAuth();
  if(user && allow.includes(user.role)) return <>{children}</>;
  return fallback ?? null;
}
