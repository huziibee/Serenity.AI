// import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Href } from "expo-router";

import 'react-native-gesture-handler';

const Page = () => {
  // const { isSignedIn } = useAuth();

  if (false) return <Redirect href={"/(root)/(tabs)/home" as Href} />;

  return <Redirect href={"/(auth)/welcome" as Href} />;
};

export default Page;
