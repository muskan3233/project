import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, MapPin, Briefcase, Clock, DollarSign, User } from 'lucide-react-native';
import { useState } from 'react';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  currentFilters: {
    location: string;
    jobType: string;
    experience: string;
    salary: string;
    workType: string;
  };
}

const JOB_TYPES = ['Full-Time', 'Part-Time', 'Freelance', 'Contract', 'Internship'];
const WORK_TYPES = ['Remote', 'On-site', 'Hybrid'];
const EXPERIENCE_LEVELS = ['Entry Level', '1-3 years', '3-5 years', '5+ years'];
const SALARY_RANGES = ['₹0-5 LPA', '₹5-10 LPA', '₹10-20 LPA', '₹20+ LPA'];

export function FilterModal({ visible, onClose, onApply, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState(currentFilters);

  const handleApply = () => {
    onApply(filters);
  };

  const handleClear = () => {
    const emptyFilters = {
      location: '',
      jobType: '',
      experience: '',
      salary: '',
      workType: '',
    };
    setFilters(emptyFilters);
  };

  const FilterSection = ({ title, icon: Icon, children }: any) => (
    <View style={styles.filterSection}>
      <View style={styles.filterHeader}>
        <Icon size={20} color="#3B82F6" />
        <Text style={styles.filterTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

  const OptionButton = ({ title, isSelected, onPress }: any) => (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="none" transparent={true}>
      <Animated.View entering={FadeIn} style={styles.overlay}>
        <Animated.View entering={SlideInDown} style={styles.modal}>
          <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Filter Jobs</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* Location */}
              <FilterSection title="Location" icon={MapPin}>
                <TextInput
                  style={styles.textInput}
                  placeholder="City, State, or Country"
                  value={filters.location}
                  onChangeText={(text) => setFilters(prev => ({ ...prev, location: text }))}
                />
              </FilterSection>

              {/* Job Type */}
              <FilterSection title="Job Type" icon={Briefcase}>
                <View style={styles.optionsGrid}>
                  {JOB_TYPES.map((type) => (
                    <OptionButton
                      key={type}
                      title={type}
                      isSelected={filters.jobType === type}
                      onPress={() => setFilters(prev => ({ 
                        ...prev, 
                        jobType: prev.jobType === type ? '' : type 
                      }))}
                    />
                  ))}
                </View>
              </FilterSection>

              {/* Work Type */}
              <FilterSection title="Work Type" icon={Clock}>
                <View style={styles.optionsGrid}>
                  {WORK_TYPES.map((type) => (
                    <OptionButton
                      key={type}
                      title={type}
                      isSelected={filters.workType === type}
                      onPress={() => setFilters(prev => ({ 
                        ...prev, 
                        workType: prev.workType === type ? '' : type 
                      }))}
                    />
                  ))}
                </View>
              </FilterSection>

              {/* Experience */}
              <FilterSection title="Experience Level" icon={User}>
                <View style={styles.optionsGrid}>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <OptionButton
                      key={level}
                      title={level}
                      isSelected={filters.experience === level}
                      onPress={() => setFilters(prev => ({ 
                        ...prev, 
                        experience: prev.experience === level ? '' : level 
                      }))}
                    />
                  ))}
                </View>
              </FilterSection>

              {/* Salary */}
              <FilterSection title="Salary Range" icon={DollarSign}>
                <View style={styles.optionsGrid}>
                  {SALARY_RANGES.map((range) => (
                    <OptionButton
                      key={range}
                      title={range}
                      isSelected={filters.salary === range}
                      onPress={() => setFilters(prev => ({ 
                        ...prev, 
                        salary: prev.salary === range ? '' : range 
                      }))}
                    />
                  ))}
                </View>
              </FilterSection>
            </ScrollView>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginVertical: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    backgroundColor: '#F8FAFC',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  optionButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
});