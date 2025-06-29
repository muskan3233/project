import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bookmark, Trash2, Share } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Animated, { FadeInDown, SlideOutRight } from 'react-native-reanimated';
import { JobCard } from '@/components/JobCard';
import { useSavedJobs } from '@/hooks/useSavedJobs';

export default function SavedJobsScreen() {
  const { savedJobs, loading, removeJob, refreshSavedJobs } = useSavedJobs();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshSavedJobs();
    setRefreshing(false);
  };

  const handleJobPress = (job: any) => {
    router.push({
      pathname: '/job/[id]',
      params: { id: job.id }
    });
  };

  const handleRemoveJob = async (jobId: string) => {
    await removeJob(jobId);
  };

  const handleShareJob = (job: any) => {
    // In a real app, implement native sharing
    console.log('Sharing job:', job.title);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Saved Jobs</Text>
          <Text style={styles.subtitle}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Saved Jobs</Text>
        <Text style={styles.subtitle}>{savedJobs.length} jobs saved</Text>
      </View>

      {savedJobs.length === 0 ? (
        <Animated.View entering={FadeInDown} style={styles.emptyContainer}>
          <Bookmark size={64} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>No saved jobs yet</Text>
          <Text style={styles.emptyText}>
            Save jobs you're interested in to view them here
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.browseButtonText}>Browse Jobs</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <ScrollView 
          style={styles.jobsList} 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {savedJobs.map((job, index) => (
            <Animated.View
              key={job.id}
              entering={FadeInDown.delay(index * 100)}
              exiting={SlideOutRight}
            >
              <View style={styles.jobCardContainer}>
                <JobCard 
                  job={job} 
                  delay={0}
                  onPress={() => handleJobPress(job)}
                  showSavedDate={true}
                />
                <View style={styles.jobActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleShareJob(job)}
                  >
                    <Share size={18} color="#64748B" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => handleRemoveJob(job.id)}
                  >
                    <Trash2 size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          ))}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  jobsList: {
    flex: 1,
  },
  jobCardContainer: {
    position: 'relative',
  },
  jobActions: {
    position: 'absolute',
    right: 20,
    top: 20,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  removeButton: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  },
  bottomSpacing: {
    height: 20,
  },
});