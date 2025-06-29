import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Upload, FileText, Settings, LogOut, Bell, Shield } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  const handleResumeUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        // Simulate ATS score calculation
        setTimeout(() => {
          const randomScore = Math.floor(Math.random() * 40) + 60; // 60-100
          setResumeUploaded(true);
          setAtsScore(randomScore);
          
          Alert.alert(
            'Resume Uploaded!',
            `Your ATS score is ${randomScore}/100. View detailed analysis for improvement tips.`,
            [
              { text: 'OK' },
              { text: 'View Analysis', onPress: () => router.push('/resume-analysis') }
            ]
          );
        }, 2000);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload resume. Please try again.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: async () => {
          await logout();
          router.replace('/auth/login');
        }}
      ]
    );
  };

  // Redirect to login if not authenticated
  if (!user) {
    router.replace('/auth/login');
    return null;
  }

  const menuItems = [
    {
      id: '1',
      title: 'Resume Upload',
      subtitle: resumeUploaded ? 'Resume uploaded' : 'Upload your resume',
      icon: Upload,
      onPress: handleResumeUpload,
      showBadge: !resumeUploaded,
    },
    {
      id: '2',
      title: 'ATS Score Check',
      subtitle: atsScore ? `Current score: ${atsScore}/100` : 'Check your resume score',
      icon: FileText,
      onPress: () => router.push('/resume-analysis'),
      disabled: !resumeUploaded,
    },
    {
      id: '3',
      title: 'Notifications',
      subtitle: 'Job alerts and updates',
      icon: Bell,
      onPress: () => {},
    },
    {
      id: '4',
      title: 'Privacy & Security',
      subtitle: 'Manage your account security',
      icon: Shield,
      onPress: () => {},
    },
    {
      id: '5',
      title: 'Settings',
      subtitle: 'App preferences',
      icon: Settings,
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User size={40} color="#3B82F6" />
          </View>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          {atsScore && (
            <View style={styles.atsScoreContainer}>
              <Text style={styles.atsScoreLabel}>ATS Score</Text>
              <Text style={[
                styles.atsScoreValue,
                { color: atsScore >= 80 ? '#10B981' : atsScore >= 60 ? '#F59E0B' : '#EF4444' }
              ]}>
                {atsScore}/100
              </Text>
            </View>
          )}
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Applications</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Saved Jobs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Interviews</Text>
          </View>
        </Animated.View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(300 + index * 50)}
            >
              <TouchableOpacity
                style={[styles.menuItem, item.disabled && styles.menuItemDisabled]}
                onPress={item.onPress}
                disabled={item.disabled}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, item.disabled && styles.menuIconDisabled]}>
                    <item.icon size={20} color={item.disabled ? '#CBD5E1' : '#3B82F6'} />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, item.disabled && styles.menuItemTitleDisabled]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.menuItemSubtitle, item.disabled && styles.menuItemSubtitleDisabled]}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                {item.showBadge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>!</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Logout Button */}
        <Animated.View entering={FadeInDown.delay(600)} style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#DBEAFE',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 16,
  },
  atsScoreContainer: {
    alignItems: 'center',
  },
  atsScoreLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginBottom: 4,
  },
  atsScoreValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuIconDisabled: {
    backgroundColor: '#F1F5F9',
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
    marginBottom: 2,
  },
  menuItemTitleDisabled: {
    color: '#94A3B8',
  },
  menuItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  menuItemSubtitleDisabled: {
    color: '#CBD5E1',
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  bottomSpacing: {
    height: 40,
  },
});