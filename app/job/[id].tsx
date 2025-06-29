import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Clock, Bookmark, Share2, ExternalLink, Building } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSavedJobs } from '@/hooks/useSavedJobs';

const JOB_DETAILS = {
  '1': {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'TechCorp India',
    location: 'Bangalore, India',
    type: 'Full-Time',
    salary: '₹15-25 LPA',
    isRemote: true,
    postedDate: '2 days ago',
    description: `We are looking for an experienced React Native developer to join our mobile development team. You will be responsible for building high-quality mobile applications that serve millions of users.

Key Responsibilities:
• Develop and maintain React Native applications for iOS and Android
• Collaborate with cross-functional teams to define and implement new features
• Write clean, maintainable, and efficient code
• Optimize applications for maximum performance and scalability
• Participate in code reviews and maintain high coding standards

Requirements:
• 4+ years of experience in React Native development
• Strong knowledge of JavaScript/TypeScript
• Experience with Redux or similar state management libraries
• Familiarity with native mobile development (iOS/Android)
• Understanding of mobile app deployment processes
• Bachelor's degree in Computer Science or related field

Benefits:
• Competitive salary and stock options
• Health insurance and wellness programs
• Flexible work arrangements
• Professional development opportunities
• Modern office with state-of-the-art equipment`,
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Redux', 'iOS', 'Android'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Stock Options', 'Remote Work'],
    companySize: '1000-5000 employees',
    industry: 'Technology',
  },
  '2': {
    id: '2',
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Mumbai, India',
    type: 'Full-Time',
    salary: '₹8-15 LPA',
    isRemote: false,
    postedDate: '1 day ago',
    description: `Join our creative team to design beautiful and functional user experiences for web and mobile applications.

Key Responsibilities:
• Create user-centered designs by understanding business requirements
• Design wireframes, prototypes, and high-fidelity mockups
• Conduct user research and usability testing
• Collaborate with developers to ensure design implementation
• Maintain design systems and style guides

Requirements:
• 3+ years of UI/UX design experience
• Proficiency in Figma, Sketch, or Adobe Creative Suite
• Strong understanding of design principles and user psychology
• Experience with responsive and mobile-first design
• Portfolio showcasing design process and outcomes

Benefits:
• Creative work environment
• Health and dental insurance
• Professional development budget
• Flexible working hours
• Team outings and events`,
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'User Testing'],
    benefits: ['Health Insurance', 'Creative Environment', 'Flexible Hours', 'Professional Development'],
    companySize: '100-500 employees',
    industry: 'Design',
  },
  '3': {
    id: '3',
    title: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, USA',
    type: 'Full-Time',
    salary: '$120-180k',
    isRemote: true,
    postedDate: '3 days ago',
    description: `Work on cutting-edge technology that impacts billions of users worldwide. Join our engineering team to build scalable systems and innovative products.

Key Responsibilities:
• Design and develop large-scale distributed systems
• Write high-quality, well-tested code
• Collaborate with product managers and designers
• Participate in technical design reviews
• Mentor junior engineers and contribute to team growth

Requirements:
• Bachelor's degree in Computer Science or equivalent
• 2+ years of software development experience
• Strong programming skills in Java, Python, or Go
• Experience with distributed systems and cloud platforms
• Excellent problem-solving and communication skills

Benefits:
• Competitive compensation and equity
• Comprehensive health benefits
• Generous parental leave
• Learning and development opportunities
• Free meals and snacks`,
    skills: ['Java', 'Python', 'Go', 'Distributed Systems', 'Cloud Computing'],
    benefits: ['Competitive Salary', 'Health Benefits', 'Parental Leave', 'Free Meals'],
    companySize: '10000+ employees',
    industry: 'Technology',
  },
};

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { saveJob, removeJob, isJobSaved } = useSavedJobs();
  
  const job = JOB_DETAILS[id as string] || JOB_DETAILS['1'];
  const isSaved = isJobSaved(job.id);

  const handleBack = () => {
    router.back();
  };

  const handleSave = async () => {
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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this job: ${job.title} at ${job.company}`,
        title: job.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleApply = () => {
    Alert.alert(
      'Apply for Job',
      'This would redirect to the application process.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log('Apply pressed') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInUp} style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Share2 size={20} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleSave} 
            style={[styles.actionButton, isSaved && styles.actionButtonActive]}
          >
            <Bookmark 
              size={20} 
              color={isSaved ? '#FFFFFF' : '#64748B'} 
              fill={isSaved ? '#FFFFFF' : 'none'} 
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Job Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.jobHeader}>
          <View style={styles.companyLogo}>
            <Text style={styles.companyLogoText}>
              {job.company.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>
          
          <View style={styles.jobMeta}>
            <View style={styles.metaItem}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.metaText}>{job.location}</Text>
              {job.isRemote && (
                <View style={styles.remoteBadge}>
                  <Text style={styles.remoteBadgeText}>Remote</Text>
                </View>
              )}
            </View>
            
            <View style={styles.metaItem}>
              <Clock size={16} color="#64748B" />
              <Text style={styles.metaText}>Posted {job.postedDate}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Building size={16} color="#64748B" />
              <Text style={styles.metaText}>{job.companySize}</Text>
            </View>
          </View>

          <View style={styles.salaryContainer}>
            <Text style={styles.salaryLabel}>Salary</Text>
            <Text style={styles.salaryValue}>{job.salary}</Text>
            <Text style={styles.jobType}>{job.type}</Text>
          </View>
        </Animated.View>

        {/* Skills */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skillsContainer}>
            {job.skills.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Description */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>{job.description}</Text>
        </Animated.View>

        {/* Benefits */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits & Perks</Text>
          <View style={styles.benefitsContainer}>
            {job.benefits.map((benefit) => (
              <View key={benefit} style={styles.benefitItem}>
                <View style={styles.benefitDot} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Apply Button */}
      <Animated.View entering={FadeInUp.delay(500)} style={styles.applyContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <ExternalLink size={20} color="#FFFFFF" />
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </Animated.View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  content: {
    flex: 1,
  },
  jobHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#DBEAFE',
  },
  companyLogoText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  jobTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 32,
  },
  companyName: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginBottom: 20,
  },
  jobMeta: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    flex: 1,
  },
  remoteBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  remoteBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#16A34A',
  },
  salaryContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  salaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 4,
  },
  salaryValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#059669',
    marginBottom: 4,
  },
  jobType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  skillText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    lineHeight: 24,
  },
  benefitsContainer: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  benefitText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    flex: 1,
  },
  bottomSpacing: {
    height: 100,
  },
  applyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  applyButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});