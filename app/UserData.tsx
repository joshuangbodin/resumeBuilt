import BackButton from "@/components/BackButton";
import ScreenHeader from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { vh, vw } from "@/helpers/responsive";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import useStore from "@/hooks/use-store-context";
import { setResumeData } from "@/store/state/actionController";
import { storeReducer } from "@/store/state/reducer";
import { ResumeInput } from "@/types/app.types";
import { router } from "expo-router";
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

export default function ResumeForm() {
  const isDark = useColorScheme() === "dark";
  const {store ,setStore} = useStore()
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [jobRole, setJobRole] = useState("");

  // Experience state
  const [experiences, setExperiences] = useState<
    {
      company: string;
      role: string;
      duration: string;
      responsibilities: string;
    }[]
  >([]);
  const [expInput, setExpInput] = useState({
    company: "",
    role: "",
    duration: "",
    responsibilities: "",
  });
  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null);

  // Education state
  const [educations, setEducations] = useState<
    { institution: string; degree: string; duration: string }[]
  >([]);
  const [eduInput, setEduInput] = useState({
    institution: "",
    degree: "",
    duration: "",
  });
  const [editingEduIndex, setEditingEduIndex] = useState<number | null>(null);

  // Skills state
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(
    null
  );

  // Add or Update Experience
  const handleSaveExperience = () => {
    if (editingExpIndex !== null) {
      const updated = [...experiences];
      updated[editingExpIndex] = expInput;
      setExperiences(updated);
      setEditingExpIndex(null);
    } else {
      setExperiences([...experiences, expInput]);
    }
    setExpInput({ company: "", role: "", duration: "", responsibilities: "" });
  };

  const handleEditExperience = (index: number) => {
    setExpInput(experiences[index]);
    setEditingExpIndex(index);
  };

  const handleDeleteExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // Add or Update Education
  const handleSaveEducation = () => {
    if (editingEduIndex !== null) {
      const updated = [...educations];
      updated[editingEduIndex] = eduInput;
      setEducations(updated);
      setEditingEduIndex(null);
    } else {
      setEducations([...educations, eduInput]);
    }
    setEduInput({ institution: "", degree: "", duration: "" });
  };

  const handleEditEducation = (index: number) => {
    setEduInput(educations[index]);
    setEditingEduIndex(index);
  };

  const handleDeleteEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  // Add or Update Skill
  const handleSaveSkill = () => {
    if (!skillInput.trim()) return;
    if (editingSkillIndex !== null) {
      const updated = [...skills];
      updated[editingSkillIndex] = skillInput.trim();
      setSkills(updated);
      setEditingSkillIndex(null);
    } else {
      setSkills([...skills, skillInput.trim()]);
    }
    setSkillInput("");
  };

  const handleEditSkill = (index: number) => {
    setSkillInput(skills[index]);
    setEditingSkillIndex(index);
  };

  const handleDeleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Proceed
  const proceed = () => {
    
    // if (!fullName || !contact || !jobRole) {
    //   Alert.alert("Please Fill out all Basic Information");
    //   return;
    // }

    let resumeData: ResumeInput = {
      name: fullName,
      contact: contact,
      jobRole: jobRole,
      experience: experiences,
      education: educations,
      skills: skills,
    };

    setStore(storeReducer(store , setResumeData(resumeData)))
    console.log(storeReducer(store , setResumeData(resumeData)))

    router.push({
      pathname: "/ai",
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" :  "padding"}
    >
      <ScreenHeader title="Resume Builder" left={<BackButton />} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Basic Info */}
        <ThemedText style={styles.header}>Basic Information</ThemedText>
        <ThemedText style={styles.label}>Full Name</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={fullName}
          onChangeText={setFullName}
          placeholder="John Doe"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <ThemedText style={styles.label}>Contact Details</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={contact}
          onChangeText={setContact}
          placeholder="Email or phone"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <ThemedText style={styles.label}>Desired Job Role</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={jobRole}
          onChangeText={setJobRole}
          placeholder="Frontend Developer"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />

        {/* Work Experience */}
        <ThemedText style={styles.header}>Work Experience</ThemedText>
        {/* --- unchanged inputs and list --- */}
        {/* Company */}
        <ThemedText style={styles.label}>Company</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={expInput.company}
          onChangeText={(text) => setExpInput({ ...expInput, company: text })}
          placeholder="Company Name"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <ThemedText style={styles.label}>Role</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={expInput.role}
          onChangeText={(text) => setExpInput({ ...expInput, role: text })}
          placeholder="Software Engineer"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <ThemedText style={styles.label}>Duration</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={expInput.duration}
          onChangeText={(text) => setExpInput({ ...expInput, duration: text })}
          placeholder="Jan 2020 - Dec 2021"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <ThemedText style={styles.label}>Responsibilities</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={expInput.responsibilities}
          onChangeText={(text) =>
            setExpInput({ ...expInput, responsibilities: text })
          }
          placeholder="Developed features..."
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint,
            },
          ]}
          onPress={handleSaveExperience}
        >
          <ThemedText style={styles.addButtonText}>
            {editingExpIndex !== null ? "Update Experience" : "Add Experience"}
          </ThemedText>
        </TouchableOpacity>

        {experiences.map((exp, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
              },
            ]}
          >
            <ThemedText style={styles.cardText}>
              {exp.role} at {exp.company} ({exp.duration})
            </ThemedText>
            <ThemedText style={styles.cardSubText}>
              {exp.responsibilities}
            </ThemedText>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleEditExperience(index)}>
                <ThemedText style={styles.editText}>Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteExperience(index)}>
                <ThemedText style={styles.deleteText}>Delete</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Education */}
        <ThemedText style={styles.header}>Education</ThemedText>
        {/* --- unchanged inputs and list --- */}
        <ThemedText style={styles.label}>Institution</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={eduInput.institution}
          onChangeText={(text) =>
            setEduInput({ ...eduInput, institution: text })
          }
          placeholder="University Name"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <ThemedText style={styles.label}>Degree</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={eduInput.degree}
          onChangeText={(text) => setEduInput({ ...eduInput, degree: text })}
          placeholder="BSc Computer Science"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <ThemedText style={styles.label}>Duration</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={eduInput.duration}
          onChangeText={(text) => setEduInput({ ...eduInput, duration: text })}
          placeholder="2017 - 2021"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint,
            },
          ]}
          onPress={handleSaveEducation}
        >
          <ThemedText style={styles.addButtonText}>
            {editingEduIndex !== null ? "Update Education" : "Add Education"}
          </ThemedText>
        </TouchableOpacity>

        {educations.map((edu, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
              },
            ]}
          >
            <ThemedText style={styles.cardText}>
              {edu.degree} - {edu.institution} ({edu.duration})
            </ThemedText>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleEditEducation(index)}>
                <ThemedText style={styles.editText}>Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteEducation(index)}>
                <ThemedText style={styles.deleteText}>Delete</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Skills */}
        <ThemedText style={styles.header}>Skills</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              color: isDark ? Colors.dark.text : Colors.light.text,
              borderColor: isDark ? Colors.dark.border : Colors.light.border,
            },
          ]}
          value={skillInput}
          onChangeText={setSkillInput}
          placeholder="e.g. JavaScript, Project Management"
          placeholderTextColor={
            isDark ? Colors.dark.subtleText : Colors.light.subtleText
          }
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: isDark ? Colors.dark.tint : Colors.light.tint,
            },
          ]}
          onPress={handleSaveSkill}
        >
          <ThemedText style={styles.addButtonText}>
            {editingSkillIndex !== null ? "Update Skill" : "Add Skill"}
          </ThemedText>
        </TouchableOpacity>

        {skills.map((skill, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
              },
            ]}
          >
            <ThemedText style={styles.cardText}>{skill}</ThemedText>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleEditSkill(index)}>
                <ThemedText style={styles.editText}>Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteSkill(index)}>
                <ThemedText style={styles.deleteText}>Delete</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Proceed */}
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: isDark
                ? Colors.dark.accent
                : Colors.light.accent,
            },
          ]}
          onPress={proceed}
        >
          <ThemedText style={styles.addButtonText}>Proceed</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: vw(5),
    paddingBottom: vh(8),
  },
  header: {
    fontSize: vw(5),
    fontWeight: "600",
    marginBottom: vh(2),
    marginTop: vh(4),
  },
  label: {
    fontSize: vw(3.5),
    fontWeight: "500",
    marginBottom: vh(0.8),
  },
  input: {
    borderWidth: 1,
    borderRadius: vw(3),
    padding: vh(1.8),
    marginBottom: vh(2),
    fontSize: vw(3.8),
  },
  addButton: {
    paddingVertical: vh(1.4),
    borderRadius: vw(3),
    alignItems: "center",
    marginBottom: vh(3),
  },
  addButtonText: {
    color: "#fff",
    fontSize: vw(3.8),
    fontWeight: "600",
  },
  card: {
    borderRadius: vw(3),
    padding: vh(2),
    marginBottom: vh(2),
    borderWidth: 1,
  },
  cardText: {
    fontSize: vw(3.8),
    fontWeight: "600",
    marginBottom: vh(1),
  },
  cardSubText: {
    fontSize: vw(3.5),
    marginBottom: vh(1),
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: vw(4),
  },
  editText: {
    fontWeight: "500",
  },
  deleteText: {
    fontWeight: "500",
  },
});
