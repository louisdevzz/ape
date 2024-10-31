import { useState } from 'react';

interface UserPoints {
  username: string;
  points: number;
  timestamp: number;
}

export const useMongodb = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savePoints = async (username: string, points: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          points,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save points');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save points');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getPoints = async (username: string): Promise<number> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/points?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch points');
      }

      const data = await response.json();
      return data.totalPoints || 0;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch points');
      return 0;
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateUser = async (username: string, invitedBy?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          invitedBy,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create/update user');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create/update user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (username: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    savePoints,
    getPoints,
    createOrUpdateUser,
    getUser,
    loading,
    error,
  };
};
