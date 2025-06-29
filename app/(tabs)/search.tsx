import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { JobCard } from '@/components/JobCard';
import { FilterModal } from '@/components/FilterModal';

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

const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'TechCorp India',
    location: 'Bangalore, India',
    type: 'Full-Time',
    salary: '₹15-25 LPA',
    isRemote: true,
    postedDate: '2 days ago',
    description: 'We are looking for an experienced React Native developer...',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'Mumbai, India',
    type: 'Full-Time',
    salary: '₹8-12 LPA',
    isRemote: false,
    postedDate: '1 day ago',
    description: 'Join our team to build amazing web applications...',
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'TechGiant',
    location: 'Delhi, India',
    type: 'Full-Time',
    salary: '₹20-30 LPA',
    isRemote: true,
    postedDate: '3 days ago',
    description: 'Lead product strategy and development...',
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'AI Solutions',
    location: 'Hyderabad, India',
    type: 'Full-Time',
    salary: '₹12-18 LPA',
    isRemote: false,
    postedDate: '4 days ago',
    description: 'Work with machine learning and data analysis...',
  },
  {
    id: '5',
    title: 'Software Engineer',
    company: 'Microsoft',
    location: 'Seattle, USA',
    type: 'Full-Time',
    salary: '$100-140k',
    isRemote: true,
    postedDate: '1 week ago',
    description: 'Develop cloud-based solutions...',
  },
];

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(params.query as string || '');
  const [filteredJobs, setFilteredJobs] = useState(SAMPLE_JOBS);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experience: '',
    salary: '',
    workType: '',
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredJobs(SAMPLE_JOBS);
    } else {
      const filtered = SAMPLE_JOBS.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    let filtered = SAMPLE_JOBS;

    if (searchQuery.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (newFilters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }

    if (newFilters.jobType) {
      filtered = filtered.filter(job => job.type === newFilters.jobType);
    }

    if (newFilters.workType === 'Remote') {
      filtered = filtered.filter(job => job.isRemote);
    } else if (newFilters.workType === 'On-site') {
      filtered = filtered.filter(job => !job.isRemote);
    }

    setFilteredJobs(filtered);
    setIsFilterModalVisible(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      location: '',
      jobType: '',
      experience: '',
      salary: '',
      workType: '',
    };
    setFilters(emptyFilters);
    setFilteredJobs(SAMPLE_JOBS);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, companies, skills..."
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, activeFiltersCount > 0 && styles.filterButtonActive]}
          onPress={() => setIsFilterModalVisible(true)}
        >
          <Filter size={20} color={activeFiltersCount > 0 ? '#FFFFFF' : '#3B82F6'} />
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Animated.View entering={FadeInDown} style={styles.activeFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <View key={key} style={styles.activeFilterChip}>
                  <Text style={styles.activeFilterText}>{value}</Text>
                </View>
              );
            })}
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      )}

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredJobs.length} jobs found
        </Text>
      </View>

      <ScrollView style={styles.jobsList} showsVerticalScrollIndicator={false}>
        {filteredJobs.map((job, index) => (
          <JobCard 
            key={job.id} 
            job={job} 
            delay={index * 50}
            onPress={() => {}}
          />
        ))}
        
        {filteredJobs.length === 0 && (
          <Animated.View entering={FadeInDown} style={styles.noResultsContainer}>
            <Text style={styles.noResultsTitle}>No jobs found</Text>
            <Text style={styles.noResultsText}>
              Try adjusting your search criteria or filters
            </Text>
          </Animated.View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApply={applyFilters}
        currentFilters={filters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  activeFiltersContainer: {
    paddingLeft: 20,
    paddingBottom: 16,
  },
  activeFilterChip: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  clearFiltersButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  clearFiltersText: {
    color: '#64748B',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  jobsList: {
    flex: 1,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSpacing: {
    height: 20,
  },
});