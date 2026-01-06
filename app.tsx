import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Video from 'react-native-video';

const steps = [
    {
        type: 'video',
        videoUrl: 'https://raw.githubusercontent.com/saumil-biizline/test-videos/main/select_business_type.mp4',
        nextStep: 1,
    },
    {
        type: 'form',
        title: 'Select Business Type',
        component: () => (
            <View style={styles.form}>
                <Text style={styles.formTitle}>Enter your business type</Text>
                <TextInput placeholder="e.g. Retail, Service" style={styles.input} />
            </View>
        ),
        nextStep: 2,
    },
    {
        type: 'video',
        videoUrl: 'https://raw.githubusercontent.com/saumil-biizline/test-videos/main/select_industry_type.mp4',
        nextStep: 3,
    },
    {
        type: 'form',
        title: 'Enter Business Details',
        component: () => (
            <View style={styles.form}>
                <Text style={styles.formTitle}>Enter your industry type</Text>
                <TextInput placeholder="e.g. Retail, Service" style={styles.input} />
            </View>
        ),
        nextStep: 4,
    },
    {
        type: 'video',
        videoUrl: 'https://raw.githubusercontent.com/saumil-biizline/test-videos/main/select_business_size.mp4',
        nextStep: 5,
    },
    {
        type: 'form',
        title: 'Enter Business Details',
        component: () => (
            <View style={styles.form}>
                <Text style={styles.formTitle}>Enter your business size</Text>
                <TextInput placeholder="e.g. s,m,l" style={styles.input} />
            </View>
        ),
        nextStep: null,
    },
];

const OnboardingWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [videoEnded, setVideoEnded] = useState(false);

    const step = steps[currentStep];

    const goToNext = () => {
        if (steps[currentStep].nextStep !== null) {
            setCurrentStep(steps[currentStep].nextStep);
            setVideoEnded(false);
        } else {
            console.log('Onboarding Done! 🚀');
        }
    };

    if (step.type === 'video') {
        return (
            <View style={styles.container}>
                <Video
                    source={{ uri: step.videoUrl }}
                    style={styles.video}
                    resizeMode="contain"
                    controls={false}
                    muted={false}              // iOS autoplay ke liye must
                    paused={false}
                    repeat={false}
                    onEnd={() => setVideoEnded(true)} // Video khatam → button show
                    onError={(e) => console.log('Error:', e)}
                />

                {videoEnded && (
                    <TouchableOpacity style={styles.continueBtn} onPress={goToNext}>
                        <Text style={styles.btnText}>Continue →</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.formHeader}>{step.title}</Text>
            {step.component()}

            <TouchableOpacity style={styles.continueBtn} onPress={goToNext}>
                <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    continueBtn: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    form: {
        padding: 20,
    },
    formHeader: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    formTitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
    },
});

export default OnboardingWizard;
