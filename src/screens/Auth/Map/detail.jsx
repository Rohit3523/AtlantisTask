import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import locations from '../../../locations';

function MapLocationDetail({ route, navigation }) {
    const detail = locations.find(x => x.id === route.params?.id);

    if (!detail) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.noDetailContainer}>
                    <Text style={styles.noDetailText}>I can't find detail for selected location</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{detail.title}</Text>
                </View>
                <Image source={{ uri: detail.image_url }} style={styles.image} />
                <Text style={styles.description}>{detail.description}</Text>
            </View>
            <Button mode='contained' style={styles.backButton} onPress={() => {
                if(navigation.canGoBack()){
                    navigation.goBack();
                }
            }}>
                <Text>View Detail</Text>
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    noDetailContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDetailText: {
        color: '#000000',
        fontSize: 18
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20
    },
    headerText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 17
    },
    image: {
        width: '100%',
        height: 300
    },
    description: {
        marginTop: 10,
        color: '#000'
    },
    backButton: {
        marginBottom: 7,
        borderRadius: 5,
        height: 48,
        width: '96%',
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

export default MapLocationDetail;