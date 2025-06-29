import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle, AlertCircle, XCircle, FileText, Target, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const ATS_ANALYSIS = {
  score: 78,
  status: 'Good',
  sections: {
    formatting: { score: 85, status: 'Good', feedback: 'Clean layout with consistent formatting' },
    keywords: { score: 72, status: 'Needs Work', feedback: 'Missing 3 key technical skills' },
    experience: { score: 90, status: 'Excellent', feedback: 'Well-structured experience section' },
    skills: { score: 68, status: 'Needs Work', feedback: 'Add more relevant technical skills' },
    education: { score: 95, status: 'Excellent', feedback: 'Complete education information' },
  },
  improvements: [
    'Add React Native, TypeScript, and Node.js to skills section',
    'Include more action verbs in experience descriptions',
    'Add quantifiable achievements (e.g., "Improved app performance by 30%")',
    'Include relevant certifications or courses',
    'Optimize for mobile development keywords',
  ],
  matchedKeywords: ['JavaScript', 'React', 'iOS', 'Android', 'Git', 'Agile'],
  missingKeywords: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'REST API'],
};

export default function ResumeAnalysisScreen() {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Excellent':
        return <CheckCircle size={20} color="#10B981" />;
      case 'Good':
        return <CheckCircle size={20} color="#3B82F6" />;
      case 'Needs Work':
        return <AlertCircle size={20} color="#F59E0B" />;
      default:
        return <XCircle size={20} color="#EF4444" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInUp} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ATS Score Analysis</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overall Score */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            <Text style={[styles.scoreValue, { color: getScoreColor(ATS_ANALYSIS.score) }]}>
              {ATS_ANALYSIS.score}
            </Text>
            <Text style={styles.scoreLabel}>/ 100</Text>
          </View>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreStatus}>{ATS_ANALYSIS.status}</Text>
            <Text style={styles.scoreDescription}>
              Your resume has a good chance of passing ATS filters
            </Text>
          </View>
        </Animated.View>

        {/* Section Breakdown */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={styles.sectionTitle}>Section Breakdown</Text>
          {Object.entries(ATS_ANALYSIS.sections).map(([key, section], index) => (
            <View key={key} style={styles.sectionItem}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  {getStatusIcon(section.status)}
                  <Text style={styles.sectionName}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </View>
                <Text style={[styles.sectionScore, { color: getScoreColor(section.score) }]}>
                  {section.score}%
                </Text>
              </View>
              <Text style={styles.sectionFeedback}>{section.feedback}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Keywords Analysis */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <Text style={styles.sectionTitle}>Keywords Analysis</Text>
          
          <View style={styles.keywordSection}>
            <View style={styles.keywordHeader}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.keywordTitle}>Matched Keywords</Text>
            </View>
            <View style={styles.keywordsList}>
              {ATS_ANALYSIS.matchedKeywords.map((keyword) => (
                <View key={keyword} style={[styles.keywordChip, styles.matchedKeyword]}>
                  <Text style={styles.matchedKeywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.keywordSection}>
            <View style={styles.keywordHeader}>
              <XCircle size={20} color="#EF4444" />
              <Text style={styles.keywordTitle}>Missing Keywords</Text>
            </View>
            <View style={styles.keywordsList}>
              {ATS_ANALYSIS.missingKeywords.map((keyword) => (
                <View key={keyword} style={[styles.keywordChip, styles.missingKeyword]}>
                  <Text style={styles.missingKeywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Improvement Suggestions */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Improvement Suggestions</Text>
          {ATS_ANALYSIS.improvements.map((improvement, index) => (
            <View key={index} style={styles.improvementItem}>
              <Target size={16} color="#3B82F6" />
              <Text style={styles.improvementText}>{improvement}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryButton}>
            <FileText size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Download Optimized Resume</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <TrendingUp size={20} color="#3B82F6" />
            <Text style={styles.secondaryButtonText}>View Improvement Tips</Text>
          </TouchableOpacity>
        </Animated.View>

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
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scoreContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F8FAFC',
    margin: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scoreCircle: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
  },
  scoreLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: -8,
  },
  scoreInfo: {
    alignItems: 'center',
  },
  scoreStatus: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  scoreDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  sectionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  sectionScore: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  sectionFeedback: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
  keywordSection: {
    marginBottom: 20,
  },
  keywordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  keywordTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  matchedKeyword: {
    backgroundColor: '#DCFCE7',
    borderColor: '#BBF7D0',
  },
  matchedKeywordText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#16A34A',
  },
  missingKeyword: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  missingKeywordText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#DC2626',
  },
  improvementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
    paddingLeft: 4,
  },
  improvementText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#475569',
    lineHeight: 24,
    flex: 1,
  },
  actionSection: {
    paddingHorizontal: 20,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF4FF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  bottomSpacing: {
    height: 40,
  },
});