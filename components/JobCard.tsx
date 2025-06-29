import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MapPin, Clock, Bookmark } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSavedJobs } from '@/hooks/useSavedJobs';

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

interface JobCardProps {
  job: Job;
  delay?: number;
  onPress: () => void;
  showSavedDate?: boolean;
}

export function JobCard({ job, delay = 0, onPress, showSavedDate }: JobCardProps) {
  const { saveJob, removeJob, isJobSaved } = useSavedJobs();
  const isSaved = isJobSaved(job.id);

  const handleSaveToggle = async () => {
    if (isSaved) {
      const success = await removeJob(job.id);
      if (success) {
        Alert.alert('Job Removed', 'Job has been removed from your saved list');
      }
    } else {
      const success = await saveJob(job);
      if (success) {
        Alert.alert('Job Saved', 'Job has been added to your saved list');
      }
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay)}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.header}>
          <View style={styles.companyInitial}>
            <Text style={styles.companyInitialText}>
              {job.company.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.bookmarkButton, isSaved && styles.bookmarkButtonActive]} 
            onPress={handleSaveToggle}
          >
            <Bookmark 
              size={20} 
              color={isSaved ? '#FFFFFF' : '#64748B'} 
              fill={isSaved ? '#FFFFFF' : 'none'} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.detailText}>{job.location}</Text>
            {job.isRemote && (
              <View style={styles.remoteBadge}>
                <Text style={styles.remoteBadgeText}>Remote</Text>
              </View>
            )}
          </View>
          
          <View style={styles.bottomRow}>
            <View style={styles.leftDetails}>
              <Text style={styles.jobType}>{job.type}</Text>
              <Text style={styles.salary}>{job.salary}</Text>
            </View>
            
            <View style={styles.timeContainer}>
              <Clock size={14} color="#64748B" />
              <Text style={styles.postedDate}>
                {showSavedDate && job.savedDate ? `Saved ${job.savedDate}` : job.postedDate}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyInitial: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  companyInitialText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  headerText: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 2,
    lineHeight: 24,
  },
  companyName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  bookmarkButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bookmarkButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  details: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    flex: 1,
  },
  remoteBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  remoteBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#16A34A',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  jobType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  salary: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postedDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
});