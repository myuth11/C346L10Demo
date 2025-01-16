import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View } from 'react-native';

let originalData = [];
const App = () => {
    const [mydata, setMydata] = useState([]);

    useEffect(() => {
        // Fetch data only once on first render
        fetch("https://jsonplaceholder.typicode.com/albums/")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length<1){
                setMydata(myJson);
                originalData = myJson;}
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []); // The empty dependency array ensures this runs only once

    const FilterData = (text) => {
        if (text!=''){
            let myFilteredData=originalData.filter((item)=>
            item.title.includes(text));
            setMydata(myFilteredData);
        }
        else {
            setMydata(originalData);
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Text style={{ borderWidth: 1 }}>{item.title}</Text>
            </View>
        );
    };

    return (
        <View>
            <StatusBar />
            <Text>Search:</Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={(text)=>{FilterData(text)}} />
            <FlatList data={mydata} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
        </View>
    );
};

export default App;
