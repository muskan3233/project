import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  isRemote: boolean;
  postedDate: string;
  description: string;
  savedDate?: string;
}

const SAVED_JOBS_KEY = '@saved_jobs';

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Load saved jobs from storage
  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      const stored = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (stored) {
        setSavedJobs(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading saved jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (job: Job) => {
    try {
      const jobWithSaveDate = {
        ...job,
        savedDate: new Date().toLocaleDateString()
      };
      
      const updatedJobs = [...savedJobs, jobWithSaveDate];
      setSavedJobs(updatedJobs);
      await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedJobs));
      return true;
    } catch (error) {
      console.error('Error saving job:', error);
      return false;
    }
  };

  const removeJob = async (jobId: string) => {
    try {
      const updatedJobs = savedJobs.filter(job => job.id !== jobId);
      setSavedJobs(updatedJobs);
      await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedJobs));
      return true;
    } catch (error) {
      console.error('Error removing job:', error);
      return false;
    }
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.some(job => job.id === jobId);
  };

  return {
    savedJobs,
    loading,
    saveJob,
    removeJob,
    isJobSaved,
    refreshSavedJobs: loadSavedJobs
  };
}