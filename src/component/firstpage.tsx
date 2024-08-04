import React, { useEffect, useMemo, useRef, useState } from 'react';
import { setStorage } from '../utils/storageUtils';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';

type FirstPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FirstPage'>;

interface FirstPageProps {
  navigation: FirstPageNavigationProp;
}

const FirstPage: React.FC<FirstPageProps> = ({ navigation }) => {
    const scaleAnim = useSharedValue(0.2);
    const fadeAnim = useSharedValue(0);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['50%', '100%'], []);
    const [mobileNumber, setMobileNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [mobileNumberFocused, setMobileNumberFocused] = useState(false);

    useEffect(() => {
        scaleAnim.value = withTiming(1, { duration: 2000 }, () => {
            fadeAnim.value = withTiming(1, { duration: 500 });
        });

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {});
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {});

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const animatedLogoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scaleAnim.value }],
    }));

    const animatedFadeStyle = useAnimatedStyle(() => ({
        opacity: fadeAnim.value,
    }));

    const handleButtonPress = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    };

    const handleCancelPress = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
        }
    };

    const login = async () => {
        try {
            const formData = new FormData();
            formData.append('usr', username);
            formData.append('pwd', password);

            const response = await fetch('https://shippex-demo.bc.brandimic.com/api/method/login', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Login Response:', data);

            if (data && data.message === 'Logged In') {
                // No token to store, just navigate to the next page
                await setStorage('formData', { username, password, mobileNumber });
                navigation.navigate('SecondPage');
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    const handleFormSubmit = async () => {
        login();
        handleCancelPress();
    };

    const isFormValid = mobileNumber && username && password;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                    <Image source={require('../../assets/log.png')} style={styles.logo} />
                </Animated.View>
                <TouchableWithoutFeedback onPress={handleCancelPress} accessible={false}>
                    <Animated.View style={[styles.blueScreen, animatedFadeStyle]}>
                        <View style={styles.shippex}>
                            <Image source={require('../../assets/shippex.png')} style={styles.slogo} />
                        </View>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    index={-1}
                    keyboardBehavior="extend"
                    keyboardBlurBehavior="restore"
                >
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.bottomSheetContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
                                <Image source={require('../../assets/Chevron.png')} style={{ width: 14, height: 14 }} />
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <View style={styles.formContainer}>
                                <Text style={styles.headerText}>Login</Text>
                                <Text style={styles.instructionText}>
                                    Please enter your username, password, and mobile number to log in.
                                </Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            borderColor: usernameFocused ? '#2F50C1' : '#ccc',
                                        },
                                    ]}
                                    placeholder="Username"
                                    placeholderTextColor="#888"
                                    value={username}
                                    onChangeText={setUsername}
                                    onFocus={() => setUsernameFocused(true)}
                                    onBlur={() => setUsernameFocused(false)}
                                />
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            borderColor: passwordFocused ? '#2F50C1' : '#ccc',
                                        },
                                    ]}
                                    placeholder="Password"
                                    placeholderTextColor="#888"
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    secureTextEntry
                                />
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            borderColor: mobileNumberFocused ? '#2F50C1' : '#ccc',
                                        },
                                    ]}
                                    placeholder="Mobile Number"
                                    placeholderTextColor="#888"
                                    value={mobileNumber}
                                    onChangeText={setMobileNumber}
                                    keyboardType="phone-pad"
                                    onFocus={() => setMobileNumberFocused(true)}
                                    onBlur={() => setMobileNumberFocused(false)}
                                />
                            </View>
                            <TouchableOpacity
                                style={[styles.submitButton, !isFormValid && styles.disabledButton]}
                                onPress={handleFormSubmit}
                                disabled={!isFormValid}
                            >
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    slogo: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    blueScreen: {
        ...StyleSheet.absoluteFillObject, // Fill the entire screen
        backgroundColor: '#2F50C1', // Blue color
        justifyContent: 'center',
        alignItems: 'center',
    },
    shippex: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 30, // Position the button at the bottom
        backgroundColor: '#fff', // White background
        borderRadius: 10, // Rounded corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2F50C1', // Blue border
        width: '80%',
    },
    buttonText: {
        color: '#2F50C1', // Blue text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomSheetContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Align items at the bottom
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    cancelButton: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    cancelText: {
        color: '#2F50C1', // Blue text color
        fontSize: 16,
        marginLeft: 4,
    },
    formContainer: {
        flex: 1,
        width: '100%',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    instructionText: {
        color: '#757281',
        marginTop: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#F1F1F1',
    },
    submitButton: {
        backgroundColor: '#2F50C1',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
});

export default FirstPage;
