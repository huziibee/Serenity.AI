import React from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const Dashboard: React.FC = () => {
  // Dummy data for charts
  const heartRateData = {
    labels: ["9AM", "12PM", "3PM", "6PM", "9PM"],
    datasets: [
      {
        data: [70, 85, 75, 80, 72]
      }
    ]
  };

  const stressData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [3, 5, 2, 4, 1]
      }
    ]
  };

  const stepsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [8000, 10000, 6000, 9000, 11000]
      }
    ]
  };

  const affirmation = "You are capable of amazing things. Believe in yourself!";

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Mental Health Dashboard</Text>
        <DashboardCard title="Daily Affirmation">
          <Text style={styles.affirmation}>{affirmation}</Text>
        </DashboardCard>
        <DashboardCard title="Heart Rate">
          <LineChart
            data={heartRateData}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
        </DashboardCard>

        <DashboardCard title="Stress Levels">
          <BarChart
            data={stressData}
            width={screenWidth - 60}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(130, 202, 157, ${opacity})`
            }}
          />
        </DashboardCard>

        <DashboardCard title="Steps Taken">
          <BarChart
            data={stepsData}
            width={screenWidth - 60}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(255, 198, 88, ${opacity})`
            }}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  affirmation: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4a4a4a',
  },
});

export default Dashboard;