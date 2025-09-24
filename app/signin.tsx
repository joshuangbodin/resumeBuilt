import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/supabase/supabase";

import ScreenHeader from "@/components/ScreenHeader";
import BackButton from "@/components/BackButton";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { vh, vw } from "@/helpers/responsive";

const SignInOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // theme colors
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");
  const textMuted = useThemeColor({}, "textMuted");
  const primary = useThemeColor({}, "tint");

  // Step 1: request OTP
  const requestOtp = async () => {
    if (!email) return Alert.alert("Enter your email");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    setLoading(false);
    if (error) Alert.alert("Error", error.message);
    else {
      Alert.alert("OTP Sent", "Check your email for the login code");
      setStage("verify");
    }
  };

  // Step 2: verify OTP
  const verifyOtp = async () => {
    if (!otp) return Alert.alert("Enter the OTP code");
    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    setLoading(false);
    if (error) Alert.alert("Error", error.message);
    else if (data?.session) {
      router.replace("/home");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScreenHeader title="Authenticate" left={<BackButton />} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <ThemedText type="title" style={styles.title}>{stage === "request" ?'Welcome!': '6-digit OTP'}</ThemedText>

          {stage === "request" ? (
            <>
              <ThemedText style={[styles.subtitle, { color: textMuted }]}>
                Sign-in / Sign-Up with your email
              </ThemedText>

              {/* Email input */}
              <TextInput
                style={[
                  styles.input,
                  { borderColor, color: textColor, backgroundColor: cardColor },
                ]}
                placeholder="Enter your email"
                placeholderTextColor={textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              {/* Send OTP button */}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: primary }]}
                disabled={loading}
                onPress={requestOtp}
              >
                <ThemedText style={styles.buttonText}>
                  {loading ? "Sending..." : "Send OTP"}
                </ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <ThemedText style={[styles.subtitle, { color: textMuted }]}>
                Enter the OTP we sent to {email}
              </ThemedText>

              {/* OTP input */}
              <TextInput
                style={[
                  styles.input,
                  { borderColor, color: textColor, backgroundColor: cardColor },
                ]}
                placeholder="Enter OTP code"
                placeholderTextColor={textMuted}
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
              />

              {/* Verify OTP button */}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: primary }]}
                disabled={loading}
                onPress={verifyOtp}
              >
                <ThemedText style={styles.buttonText}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </ThemedText>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInOtp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: vw(6),
    paddingTop: vh(5),
  },
  title: {
    fontSize: vw(7),
    fontWeight: "700",
    marginBottom: vh(1),
  },
  subtitle: {
    fontSize: vw(4),
    marginBottom: vh(4),
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: vh(2),
    paddingHorizontal: vw(4),
    fontSize: vw(4),
    marginBottom: vh(2.5),
    textAlign: "center",
  },
  button: {
    width: "100%",
    paddingVertical: vh(2.2),
    borderRadius: 12,
    alignItems: "center",
    marginTop: vh(1),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: vw(4),
  },
});
