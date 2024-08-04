import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Animated, ScrollView } from 'react-native';
import { getStorage } from '../utils/storageUtils';

const Status = ({reset}) => {
    const [statuses, setStatuses] = useState([
        { id: 1, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'DELIVERED', backgroundColor: '#E3FAD6', textColor: 'green', dropdownHeight: new Animated.Value(0) },
        { id: 2, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'RECEIVED', backgroundColor: '#D9E6FD', textColor: 'blue', dropdownHeight: new Animated.Value(0) },
        { id: 3, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'ON HOLD', backgroundColor: '#FFF3D5', textColor: 'orange', dropdownHeight: new Animated.Value(0) },
        { id: 4, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'CANCELLED', backgroundColor: '#F4F2F8', textColor: 'gray', dropdownHeight: new Animated.Value(0) },
        { id: 5, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'DELIVERED', backgroundColor: '#E3FAD6', textColor: 'green', dropdownHeight: new Animated.Value(0) },
        { id: 6, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'ON HOLD', backgroundColor: '#FFF3D5', textColor: 'orange', dropdownHeight: new Animated.Value(0) },
        { id: 7, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'DELIVERED', backgroundColor: '#E3FAD6', textColor: 'green', dropdownHeight: new Animated.Value(0) },
    ]);
    const [shipmentStatuses, setShipmentStatuses] = useState([]);
    const [shipmentList, setShipmentList] = useState([]);

 
    useEffect(() => {
        const fetchShipmentStatuses = async () => {
            try {
                const response = await fetch('https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list?doctype=AWB%20Status&fields=%5B%22*%22%5D', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Tasty Test',
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.status === 401) {
                    console.error('Unauthorized: Token may be invalid or expired.');
                    return; // Handle unauthorized access
                }
        
                const data = await response.json();
                setShipmentStatuses(data.data || []); // Assuming data.data holds the array of statuses
            } catch (error) {
                console.error('Error fetching shipment statuses:', error);
            }
        };
        
        fetchShipmentStatuses();
        
    }, []); // Empty dependency array to run only once on mount


    useEffect(() => {
        if (reset) {
            resetStatus(); // Call resetStatus if reset is true
        }
    }, [reset]);

    const resetStatus = () => {
        setStatuses([
            { id: 1, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'DELIVERED', backgroundColor: '#E3FAD6', textColor: 'green', dropdownHeight: new Animated.Value(0) },
            { id: 2, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'RECEIVED', backgroundColor: '#D9E6FD', textColor: 'blue', dropdownHeight: new Animated.Value(0) },
            { id: 3, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'ON HOLD', backgroundColor: '#FFF3D5', textColor: 'orange', dropdownHeight: new Animated.Value(0) },
            { id: 4, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'CANCELLED', backgroundColor: '#F4F2F8', textColor: 'gray', dropdownHeight: new Animated.Value(0) },
            { id: 5, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'DELIVERED', backgroundColor: '#E3FAD6', textColor: 'green', dropdownHeight: new Animated.Value(0) },
            { id: 6, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'ON HOLD', backgroundColor: '#FFF3D5', textColor: 'orange', dropdownHeight: new Animated.Value(0) },
            { id: 7, isChecked: false, isDropdownVisible: false, isImageUp: false, status: 'DELIVERED', backgroundColor: '#E3FAD6', textColor: 'green', dropdownHeight: new Animated.Value(0) },
        ]);
        // You can also reset shipmentStatuses and shipmentList if needed
    };

    const toggleDropdown = (index) => {
        const newStatuses = [...statuses];
        const status = newStatuses[index];

        if (status.isDropdownVisible) {
            Animated.timing(status.dropdownHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                status.isDropdownVisible = false;
                status.isImageUp = false;
                setStatuses(newStatuses);
            });
        } else {
            status.isDropdownVisible = true;
            status.isImageUp = true;
            setStatuses(newStatuses);
            Animated.timing(status.dropdownHeight, {
                toValue: 120, // You can adjust the height value as needed
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const toggleChecked = (index) => {
        const newStatuses = [...statuses];
        newStatuses[index].isChecked = !newStatuses[index].isChecked;
        setStatuses(newStatuses);
    };

    return (
        <ScrollView>
            <View style={styles.Shipments}>
                <Text style={styles.shipmentText}>Shipments</Text>
                <Pressable
                    style={styles.checkbox}
                    onPress={() => {
                        const allChecked = statuses.every(status => status.isChecked);
                        const newStatuses = statuses.map(status => ({ ...status, isChecked: !allChecked }));
                        setStatuses(newStatuses);
                    }}
                >
                    <Image
                        style={styles.checkboxImage}
                        source={
                            statuses.every(status => status.isChecked)
                                ? require('../../assets/checkfull.png')
                                : require('../../assets/checkempty.png')
                        }
                    />
                    <Text style={styles.markAllText}>Mark All</Text>
                </Pressable>
            </View>

            {statuses.map((status, index) => (
                <View key={status.id}>
                    <View style={[styles.statusContainer, status.isImageUp && styles.statusContainerExpanded]}>
                        <Pressable
                            style={styles.checkbox}
                            onPress={() => toggleChecked(index)}
                        >
                            <Image
                                style={styles.checkboxImage}
                                source={
                                    status.isChecked
                                        ? require('../../assets/checkfull.png')
                                        : require('../../assets/checkempty.png')
                                }
                            />
                        </Pressable>
                        <Image source={require('../../assets/box.png')} style={styles.box} />
                        <View style={styles.textContainer}>
                            <Text style={styles.awsText}>AWS</Text>
                            <Text style={styles.idText}>41785691423</Text>
                            <View style={styles.locationContainer}>
                                <Text style={styles.locationText}>Cairo</Text>
                                <Image style={styles.locationIcon} source={require('../../assets/a.png')} />
                                <Text style={styles.locationText}>Alexandria</Text>
                            </View>
                        </View>
                        <View style={[styles.statuses, { backgroundColor: status.backgroundColor }]}>
                            <Text style={{ color: status.textColor }}>{status.status}</Text>
                        </View>
                        <Pressable onPress={() => toggleDropdown(index)}>
                            <Image
                                style={styles.updownImage}
                                source={status.isImageUp ? require('../../assets/upup.png') : require('../../assets/updown.png')}
                            />
                        </Pressable>
                    </View>

                    <Animated.View style={[styles.dropdownContainer, { height: status.dropdownHeight }, status.isImageUp && styles.dropdownContainerExpanded]}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={styles.dropdownText}>Origin</Text>
                            <Text style={styles.dropdownText}>Destination</Text>
                        </View>
                        <View style={styles.locContainer}>
                            <Text style={styles.locText}>Cairo</Text>
                            <Image style={styles.locIcon} source={require('../../assets/a.png')} />
                            <Text style={styles.locText}>Alexandria</Text>
                        </View>
                        {/* Add more dropdown content here */}
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: -11, flexDirection: 'row' }}>
                            <Text style={styles.dropText}>Dokki, 22 Nile Str.</Text>
                            <Text style={styles.dropText}>Smoha, 22 Nile Str.</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', width: '100%', marginTop: -5, gap: 8, marginBottom: 20, flexDirection: 'row-reverse' }}>
                            <View style={{ backgroundColor: '#25D366', gap: 4, alignItems: 'center', marginRight: 10, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, flexDirection: 'row' }}>
                                <Image style={styles.locIcon} source={require('../../assets/Whatsapp.png')} />
                                <Text style={{ color: '#fff' }}>Whatsapp</Text>
                            </View>
                            <View style={{ backgroundColor: '#6E91EC', gap: 4, alignItems: 'center', marginRight: 10, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, flexDirection: 'row' }}>
                                <Image style={styles.locIcon} source={require('../../assets/phone.png')} />
                                <Text style={{ color: '#fff' }}>Call</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            ))}

            {/* Render fetched shipment statuses and shipment list */}
            <View style={styles.additionalInfoContainer}>
                <Text style={styles.additionalInfoHeader}>Shipment Statuses</Text>
                {shipmentStatuses.map((status, index) => (
                    <Text key={index} style={styles.additionalInfoText}>
                        {status.status}
                    </Text>
                ))}
            </View>
            <View style={styles.additionalInfoContainer}>
                <Text style={styles.additionalInfoHeader}>Shipment List</Text>
                {shipmentList.map((shipment, index) => (
                    <Text key={index} style={styles.additionalInfoText}>
                        {shipment.name}
                    </Text>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // ... previous styles
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        padding: 8,
        width: '100%',
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        elevation: 2, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    statusContainerExpanded: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    checkbox: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    checkboxImage: {
        width: 20,
        height: 20,
    },
    statuses: {
        width: "30%",
        height: 30,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center', // Center vertically
    },
    box: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    awsText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: "#888",
    },
    idText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: "#888",
    },
    locationIcon: {
        marginHorizontal: 4,
        width: 10,
        height: 10
    },
    locContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:10,
        marginTop: -14
    },
    locText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#888",
    },
    locIcon: {
        marginHorizontal: 4,
        width: 20,
        height: 20
    },
    tagImage: {
        width: "30%",
        height: '50%',
        marginRight: 10,
    },
    updownImage: {
        width: 20,
        height: 20,
    },
    Shipments: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    shipmentText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    markAllText: {
        color: '#2F50C1',
        fontWeight: 'bold',
    },
    dropdownContainer: {
        overflow: 'hidden',
        backgroundColor: '#F4F2F8',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 2, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    dropdownContainerExpanded: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    dropdownText: {
        fontSize: 10,
        color: '#2F50C1',
        padding: 10, // Additional padding inside the dropdown
    },
    dropText: {
        fontSize: 10,
        color: 'gray',
        padding: 10, // Additional padding inside the dropdown
    },
    additionalInfoContainer: {
        padding: 10,
        backgroundColor: '#F4F2F8',
        marginTop: 20,
    },
    additionalInfoHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    additionalInfoText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
});

export default Status;
