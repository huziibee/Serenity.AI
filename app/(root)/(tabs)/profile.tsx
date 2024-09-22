import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";

const Profile = () => {
  // Sample user object
  const user = {
    firstName: "John",
    lastName: "Doe",
    primaryEmailAddress: {
      emailAddress: "",
    },
    primaryPhoneNumber: {
      phoneNumber: "",
    },
    externalAccounts: [
      {
        imageUrl: "",
      },
    ],
    imageUrl: "",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.title}>My profile</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoInnerContainer}>
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputField}
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputField}
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputField}
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputField}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    fontFamily: 'JakartaBold',
    marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 20,
  },
  infoInnerContainer: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputField: {
    padding: 15,
  },
});

export default Profile;
