import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming 
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

export function LoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const SkeletonCard = () => (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={styles.headerText}>
          <View style={styles.titleSkeleton} />
          <View style={styles.subtitleSkeleton} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.lineSkeleton} />
        <View style={styles.shortLineSkeleton} />
      </View>
    </Animated.View>
  );

  return (
    <View>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  titleSkeleton: {
    height: 20,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 8,
    width: '70%',
  },
  subtitleSkeleton: {
    height: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    width: '50%',
  },
  content: {
    gap: 12,
  },
  lineSkeleton: {
    height: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    width: '100%',
  },
  shortLineSkeleton: {
    height: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    width: '60%',
  },
});