import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, FlatList, ToastAndroid, Linking, StyleSheet } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper';

function MovieScreen() {
    const [isLoading, setLoading] = React.useState(true);
    const [movies, setMovies] = React.useState([]);

    React.useEffect(()=>{
        axios.get('https://dummyapi.online/api/movies')
            .then((res)=>{
                if(res.status === 200){
                    setMovies(res.data);
                    setLoading(false);
                }
            });

        return ()=>{
            setLoading(true);
            setMovies([]);
        }
    }, []);

    function renderItem({ item }){
        return (
            <View style={styles.card}>
                <Text style={styles.movieTitle}>Title: {item.movie}</Text>
                <Text style={styles.movieRating}>Rating: {item.rating}/10</Text>
                <Button style={styles.visitMovie} mode="contained" onPress={()=>{
                    if(Linking.canOpenURL(item.imdb_url)){
                        Linking.openURL(item.imdb_url);
                    }else{
                        ToastAndroid.show("Unable to open the link", ToastAndroid.SHORT);
                    }
                }}>Visit Website</Button>
            </View>
        )
    }

    function MovieList(){
        return (
            <FlatList
                data={movies}
                renderItem={renderItem}
                style={styles.flatlist}
                overScrollMode='never'
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {
                    (isLoading) ? (
                        <ActivityIndicator color={"blue"} size={30} />
                    ) : (
                        <MovieList />
                    )
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    flatlist: {
        marginBottom: 10
    },
    card: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '95%',
        alignSelf: 'center',
        marginTop: 5,
        borderRadius: 5
    },
    movieTitle: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16
    },
    movieRating: {
        color: '#000000',
        fontSize: 16
    },
    visitMovie: {
        marginTop: 7,
        borderRadius: 5,
        height: 48,
        justifyContent: 'center'
    }
});

export default MovieScreen;