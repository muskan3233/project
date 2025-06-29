import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Mic, MapPin, Briefcase, Globe, Clock, Building } from 'lucide-react-native';
import { useState, useRef } from 'react';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as Speech from 'expo-speech';
import { JobCard } from '@/components/JobCard';
import { CategoryCard } from '@/components/CategoryCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useAuth } from '@/hooks/useAuth';

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
}

const FEATURED_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'TechCorp India',
    location: 'Bangalore, India',
    type: 'Full-Time',
    salary: '₹15-25 LPA',
    isRemote: true,
    postedDate: '2 days ago',
    description: 'We are looking for an experienced React Native developer to join our mobile team...',
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Mumbai, India',
    type: 'Full-Time',
    salary: '₹8-15 LPA',
    isRemote: false,
    postedDate: '1 day ago',
    description: 'Join our creative team to design beautiful and functional user experiences...',
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, USA',
    type: 'Full-Time',
    salary: '$120-180k',
    isRemote: true,
    postedDate: '3 days ago',
    description: 'Work on cutting-edge technology that impacts billions of users worldwide...',
  },
];

const CATEGORIES = [
  { id: '1', name: 'IT & Software', icon: 'laptop', count: 1250, color: '#3B82F6' },
  { id: '2', name: 'Sales & Marketing', icon: 'trending-up', count: 890, color: '#10B981' },
  { id: '3', name: 'Government Jobs', icon: 'building', count: 560, color: '#F59E0B' },
  { id: '4', name: 'Healthcare', icon: 'heart', count: 450, color: '#EF4444' },
  { id: '5', name: 'Education', icon: 'book', count: 320, color: '#8B5CF6' },
  { id: '6', name: 'Finance', icon: 'dollar-sign', count: 780, color: '#06B6D4' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Get first name from full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  const handleVoiceSearch = () => {
    if (Platform.OS === 'web') {
      // Web fallback - just focus the input
      searchInputRef.current?.focus();
      return;
    }

    setIsListening(true);
    // In a real app, you would integrate with speech recognition
    // For now, we'll simulate voice input
    setTimeout(() => {
      setSearchQuery('React Native Developer');
      setIsListening(false);
      if (Speech.speak) {
        Speech.speak('Searching for React Native Developer jobs');
      }
    }, 2000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchQuery }
      });
    }
  };

  const handleJobPress = (job: Job) => {
    router.push({
      pathname: '/job/[id]',
      params: { id: job.id }
    });
  };

  // Redirect to login if not authenticated
  if (!user) {
    router.replace('/auth/login');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
          <Text style={styles.greeting}>
            {getGreeting()}, {getFirstName(user.fullName)}! 👋
          </Text>
          <Text style={styles.subtitle}>Find your dream job with WorkLynk</Text>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#64748B" />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search jobs, companies..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity 
              onPress={handleVoiceSearch}
              style={[styles.micButton, isListening && styles.micButtonActive]}
            >
              <Mic size={20} color={isListening ? '#FFFFFF' : '#3B82F6'} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Quick Filters */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.filterChip}>
              <MapPin size={16} color="#3B82F6" />
              <Text style={styles.filterChipText}>Remote</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Briefcase size={16} color="#3B82F6" />
              <Text style={styles.filterChipText}>Full-Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Globe size={16} color="#3B82F6" />
              <Text style={styles.filterChipText}>International</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Clock size={16} color="#3B82F6" />
              <Text style={styles.filterChipText}>Part-Time</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        {/* Job Categories */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((category, index) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                delay={index * 100}
                onPress={() => router.push({
                  pathname: '/search',
                  params: { category: category.name }
                })}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Featured Jobs */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Jobs</Text>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {isLoading ? (
            <LoadingSkeleton count={3} />
          ) : (
            FEATURED_JOBS.map((job, index) => (
              <JobCard 
                key={job.id} 
                job={job} 
                delay={index * 100}
                onPress={() => handleJobPress(job)}
              />
            ))
          )}
        </Animated.View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  greeting: {
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
  },
  micButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EBF4FF',
  },
  micButtonActive: {
    backgroundColor: '#3B82F6',
  },
  filtersContainer: {
    paddingLeft: 20,
    marginBottom: 30,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  filterChipText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  bottomSpacing: {
    height: 20,
  },
});