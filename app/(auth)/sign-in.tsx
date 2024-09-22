import React, { useState } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    console.log('Sign in pressed with:', form);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={images.signUpCar} style={styles.image} resizeMode="cover" />
          <View style={styles.overlay} />
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            style={styles.signInButton}
          />

          <Link href="/sign-up" style={styles.signUpLink}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={styles.signUpHighlight}>Sign Up</Text>
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  welcomeText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 40,
    left: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  formContainer: {
    padding: 24,
    paddingTop: 32,
  },
  signInButton: {
    marginTop: 32,
  },
  signUpLink: {
    marginTop: 24,
  },
  signUpText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4B5563',
  },
  signUpHighlight: {
    color: '#0286FF',
    fontWeight: 'bold',
  },
});

export default SignIn;