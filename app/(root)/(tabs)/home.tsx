import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  gradient?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, gradient }) => (
  <View style={[
    styles.card,
    gradient && { backgroundColor: '#f8f0ff' }
  ]}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const MoodButton: React.FC<{ emoji: string; selected: boolean; onPress: () => void }> = ({ 
  emoji, 
  selected, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.moodButton,
        selected && styles.moodButtonSelected
      ]}
    >
      <Text style={styles.moodEmoji}>{emoji}</Text>
    </TouchableOpacity>
  );
};

const WellnessTracker: React.FC<{
  label: string;
  value: number;
  unit: string;
  maxValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}> = ({ label, value, unit, maxValue, onIncrement, onDecrement }) => (
  <View style={styles.wellnessItem}>
    <View style={styles.wellnessHeader}>
      <Text style={styles.wellnessLabel}>{label}</Text>
      <View style={styles.wellnessControls}>
        <TouchableOpacity 
          onPress={onDecrement}
          style={styles.controlButton}
        >
          <Text style={styles.controlText}>−</Text>
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <Text style={styles.wellnessValue}>{value}</Text>
          <Text style={styles.wellnessUnit}>{unit}</Text>
        </View>
        <TouchableOpacity 
          onPress={onIncrement}
          style={styles.controlButton}
        >
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.progressContainer}>
      <View 
        style={[
          styles.progressBar, 
          { width: `${(value / maxValue) * 100}%` }
        ]} 
      />
    </View>
  </View>
);

const Dashboard: React.FC = () => {
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [moodScore, setMoodScore] = useState<number>(4);
  const [sleepHours, setSleepHours] = useState<number>(7.5);
  const [waterGlasses, setWaterGlasses] = useState<number>(3);
  const [steps, setSteps] = useState<number>(6000);
  
  const moodEmojis = ["😢", "😕", "😐", "🙂", "😊"];
  
  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const response = await fetch("http://192.168.1.62:5000/affirm");
        const data = await response.json();
        setAffirmation(data.affirmations[0]?.affirmation);
      } catch (error) {
        setAffirmation("You are capable of amazing things. Take each moment one step at a time.");
      }
    };

    fetchAffirmation();
  }, []);

  const incrementSleep = () => setSleepHours(prev => Math.min(prev + 0.5, 12));
  const decrementSleep = () => setSleepHours(prev => Math.max(prev - 0.5, 0));
  
  const incrementWater = () => setWaterGlasses(prev => Math.min(prev + 1, 12));
  const decrementWater = () => setWaterGlasses(prev => Math.max(prev - 1, 0));
  
  const incrementSteps = () => setSteps(prev => Math.min(prev + 1000, 20000));
  const decrementSteps = () => setSteps(prev => Math.max(prev - 1000, 0));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Mindful Moments</Text>
        
        <DashboardCard title="Today's Affirmation" gradient>
          <Text style={styles.affirmation}>
            {affirmation || "Loading affirmation..."}
          </Text>
        </DashboardCard>

        <DashboardCard title="Mood Check-In">
          <View style={styles.moodContainer}>
            {moodEmojis.map((emoji, index) => (
              <MoodButton
                key={index}
                emoji={emoji}
                selected={moodScore === index + 1}
                onPress={() => setMoodScore(index + 1)}
              />
            ))}
          </View>
          <Text style={styles.moodLabel}>
            How are you feeling today?
          </Text>
        </DashboardCard>

        <DashboardCard title="Daily Wellness">
          <WellnessTracker
            label="Sleep"
            value={sleepHours}
            unit="hours"
            maxValue={12}
            onIncrement={incrementSleep}
            onDecrement={decrementSleep}
          />
          
          <WellnessTracker
            label="Water Intake"
            value={waterGlasses}
            unit="glasses"
            maxValue={12}
            onIncrement={incrementWater}
            onDecrement={decrementWater}
          />
          
          <WellnessTracker
            label="Steps"
            value={steps}
            unit="steps"
            maxValue={20000}
            onIncrement={incrementSteps}
            onDecrement={decrementSteps}
          />
        </DashboardCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4a154b',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2d3748',
  },
  affirmation: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4a4a4a',
    lineHeight: 24,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  moodButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#f7f7f7',
  },
  moodButtonSelected: {
    backgroundColor: '#e9d5ff',
    transform: [{ scale: 1.1 }],
  },
  moodEmoji: {
    fontSize: 30,
  },
  moodLabel: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  wellnessItem: {
    marginBottom: 20,
  },
  wellnessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  wellnessLabel: {
    fontSize: 16,
    color: '#4a4a4a',
    flex: 1,
  },
  wellnessControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginHorizontal: 12,
    minWidth: 60,
    justifyContent: 'center',
  },
  wellnessValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a154b',
    marginRight: 4,
  },
  wellnessUnit: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
  },
});

export default Dashboard;