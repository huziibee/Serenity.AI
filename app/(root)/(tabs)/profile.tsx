import React, { useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity, Platform, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Camera } from "lucide-react-native";


interface InputFieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  editable = true 
}) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          !editable && styles.inputDisabled
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        editable={editable}
      />
    </View>
  </View>
);

interface ProfileCardProps {
  title: string;
  children: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const Profile: React.FC = () => {
  // Sample user data with proper typing
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    imageUrl: "https://cdn-icons-png.freepik.com/256/11419/11419168.png?semt=ais_hybrid",
    location: "New York, USA",
    emergencyContact: {
      name: "Jane Doe",
      relation: "Sister",
      phone: "+1 234 567 8901"
    },
    preferences: {
      notifications: true,
      darkMode: false,
      language: "English"
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.title}>My Profile</Text>

        {/* Profile Image Section */}
        <View style={styles.imageWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
              defaultSource={require('@/assets/images/favicon.png')}
            />
            {/* <TouchableOpacity style={styles.cameraButton}>
              <Camera size={20} color="#ffffff" />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.userName}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>

        {/* Personal Information */}
        <ProfileCard title="Personal Information">
          <InputField
            label="First Name"
            value={user.firstName}
            onChangeText={(text) => setUser(prev => ({...prev, firstName: text}))}
          />
          <InputField
            label="Last Name"
            value={user.lastName}
            onChangeText={(text) => setUser(prev => ({...prev, lastName: text}))}
          />
          <InputField
            label="Email"
            value={user.email}
            onChangeText={(text) => setUser(prev => ({...prev, email: text}))}
          />
          <InputField
            label="Phone"
            value={user.phone}
            onChangeText={(text) => setUser(prev => ({...prev, phone: text}))}
          />
        </ProfileCard>

        {/* Emergency Contact */}
        <ProfileCard title="Emergency Contact">
          <InputField
            label="Name"
            value={user.emergencyContact.name}
            onChangeText={(text) => setUser(prev => ({
              ...prev, 
              emergencyContact: {...prev.emergencyContact, name: text}
            }))}
          />
          <InputField
            label="Relation"
            value={user.emergencyContact.relation}
            onChangeText={(text) => setUser(prev => ({
              ...prev, 
              emergencyContact: {...prev.emergencyContact, relation: text}
            }))}
          />
          <InputField
            label="Phone"
            value={user.emergencyContact.phone}
            onChangeText={(text) => setUser((prev) => ({
              ...prev, 
              emergencyContact: {...prev.emergencyContact, phone: text}
            }))}
          />
        </ProfileCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a154b',
    marginBottom: 20,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#9333EA',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#9333EA',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
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
    fontWeight: '600',
    color: '#4a154b',
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    padding: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  inputDisabled: {
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
  },
});

export default Profile;