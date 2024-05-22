import React from 'react';
import { View, Text, SafeAreaView, Dimensions, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import locations from '../../../locations';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

function MapScreen({ navigation }) {
    const dispatch = useDispatch();

    const bottomSheetModalRef = React.useRef(null);
    const mapRef = React.useRef();

    const snapPoints = React.useMemo(() => [330], []);

    const handlePresentModalPress = React.useCallback((uuid) => {
        const data = locations.find(x => x.id === uuid);
        if (data && mapRef.current) {
            bottomSheetModalRef.current?.present({ data });

            const newLatitude = data.coordinates.latitude + ((-20) / WINDOW_HEIGHT) * 0.5;
            mapRef.current.animateToRegion({ ...data.coordinates, latitude: newLatitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
        };
    }, [locations, mapRef.current, bottomSheetModalRef.current, WINDOW_HEIGHT]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button mode='contained' style={styles.logoutButton} onPress={()=>{
                    dispatch({ type: actions.SET_USER, payload: { user: {} } });
                }}>
                    <Text>Logout</Text>
                </Button>
                <MapView
                    style={styles.mapStyle}
                    ref={mapRef}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {
                        locations.map((location) => {
                            return (
                                <Marker
                                    key={location.id}
                                    coordinate={location.coordinates}
                                    onPress={() => {
                                        handlePresentModalPress(location.id);
                                    }}
                                />
                            )
                        })
                    }
                </MapView>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
            >
                {
                    (({ data }) => {
                        return (
                            <BottomSheetView style={styles.contentContainer}>
                                <Text style={styles.bottomSheetTitle}>{data.data.title}</Text>
                                <View style={styles.bottomSheetContainer}>
                                    <Image source={{ uri: data.data.image_url}} style={styles.bottomSheetImage}/>
                                </View>
                                <Button mode='contained' style={styles.viewMoreButton} onPress={()=>{
                                    bottomSheetModalRef.current?.dismiss();

                                    navigation.navigate("MapLocationDetail", {
                                        id: data.data.id
                                    });
                                }}>
                                    <Text>View Detail</Text>
                                </Button>
                            </BottomSheetView>
                        )
                    })
                }
            </BottomSheetModal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    logoutButton: {
        position: 'absolute',
        zIndex: 10,
        top: 10,
        right: 10
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bottomSheetTitle: {
        textAlign: 'center',
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold'
    },
    bottomSheetContainer: {
        marginTop: 10
    },
    bottomSheetImage: {
        width: '100%',
        height: 200
    },
    viewMoreButton: {
        marginTop: 7,
        borderRadius: 5,
        height: 48,
        width: '96%',
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

export default MapScreen;