import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Laptop, TrendingUp, Building, Heart, BookOpen, DollarSign } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

interface CategoryCardProps {
  category: Category;
  delay?: number;
  onPress: () => void;
}

const iconMap = {
  laptop: Laptop,
  'trending-up': TrendingUp,
  building: Building,
  heart: Heart,
  book: BookOpen,
  'dollar-sign': DollarSign,
};

export function CategoryCard({ category, delay = 0, onPress }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Laptop;

  return (
    <Animated.View entering={FadeInRight.delay(delay)}>
      <TouchableOpacity 
        style={[styles.container, { borderColor: `${category.color}20` }]} 
        onPress={onPress}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${category.color}15` }]}>
          <IconComponent size={24} color={category.color} />
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.jobCount}>{category.count} jobs</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginLeft: 20,
    width: 140,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  jobCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
});