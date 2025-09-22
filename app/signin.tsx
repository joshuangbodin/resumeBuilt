import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/supabase/supabase";

const SignInOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Step 1: request OTP (numeric code, not link)
  const requestOtp = async () => {
    if (!email) return Alert.alert("Enter your email");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true }, // auto-register if user doesn't exist
    });

    setLoading(false);
    if (error) Alert.alert("Error", error.message);
    else {
      Alert.alert("OTP Sent", "Check your email for the login code");
      setStage("verify");
    }
  };

  // Step 2: verify OTP code
  const verifyOtp = async () => {
    if (!otp) return Alert.alert("Enter the OTP code");
    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,       // numeric code from email
      type: "email",    // 👈 ensures it's treated as OTP (not magic link)
    });

    setLoading(false);
    if (error) Alert.alert("Error", error.message);
    else if (data?.session) {
      router.replace("/(tabs)/home"); // redirect to your app's home
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Welcome 👋</Text>

        {stage === "request" ? (
          <>
            <Text style={styles.subtitle}>Sign in with your email OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              disabled={loading}
              onPress={requestOtp}
            >
              <Text style={styles.buttonText}>
                {loading ? "Sending..." : "Send OTP"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>
              Enter the OTP we sent to {email}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP code"
              placeholderTextColor="#888"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              disabled={loading}
              onPress={verifyOtp}
            >
              <Text style={styles.buttonText}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInOtp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAFB",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1D1B20",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#49454F",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CAC4D0",
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#1D1B20",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#6750A4", // Material3 primary
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
