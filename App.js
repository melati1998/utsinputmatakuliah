import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, List, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

const pti = require('./src/images/pti.png');

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>MATA KULIAH</Text>
        <Text>PENDIDIKAN TEKNIK INFORMATIKA</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
constructor() {
    super();
    this.state = {
      mata_kuliah: '',
      kode_mk: '',
      kode_dos: '',
    }
  }

  Insert_Data_Into_MySQL = () =>
    {
            fetch('https://m3l471pramesti.000webhostapp.com/api/sentDatafix.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  mata_kuliah : this.state.mata_kuliah,
                  kode_mk : this.state.kode_mk,
                  kode_dos : this.state.kode_dos,

                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);
            }).catch((error) =>
            {
                console.error(error);
            });
    }

  render() {
       return (
         <View style={styles.containerMain}>

      <View style={styles.box2}>

       <View style={{ flex: 1, alignItems: 'center', paddingTop: 25 }}>
        <View style={styles.iconContainer}>
            <Image source={pti} style={styles.icon} />
          </View>
        <Text>{'\n'}</Text>
        <Text>Mata Kuliah</Text>
        <TextInput
                style={{ height: 30, width: 150, textAlign:'center' }}
              placeholder="Masukkan Mata Kuliah"
              onChangeText={(mata_kuliah) => this.setState({ mata_kuliah })}
            />
          <Text>Kode Mata Kuliah</Text>
        <TextInput
                style={{ height: 30, width: 100, textAlign:'center' }}
              placeholder="Masukkan Kode"
              onChangeText={(kode_mk) => this.setState({ kode_mk })}
            />
            <Text>Kode Dosen</Text>
        <TextInput
                style={{ height: 30, width: 150, textAlign:'center' }}
              placeholder="Masukkan Kode Dosen"
              onChangeText={(kode_dos) => this.setState({ kode_dos })}
            />
            <View style={{flexDirection: 'row'}}>
        <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = {{backgroundColor: 'blue', paddingTop: 10, paddingBottom: 30, marginTop: 20, marginRight: 10, width: '30%', height: '20%'}}
                  onPress = { this.Insert_Data_Into_MySQL }>

                    <Text style = { styles.TextStyle }>INPUT</Text>

                </TouchableOpacity>
          <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = {{backgroundColor: 'blue', paddingTop: 10, paddingBottom: 30, marginTop: 20, marginLeft: 10, width: '30%', height: '20%'}}
                  onPress={() => this.props.navigation.navigate('Detail')}>


                    <Text style = { styles.TextStyle }>LIHAT DATA</Text>

                </TouchableOpacity>     
        </View>
      </View>
      </View>
      </View>
     
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    );
  }
}

class DetailScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}

  componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'https://m3l471pramesti.000webhostapp.com/api/getData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.kode_mk;
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
              <Text>Mata Kuliah : {item.mata_kuliah}</Text>
              <Text>Kode Mata Kuliah : {item.kode_mk}</Text>
              <Text>Kode Dosen : {item.kode_dos}</Text>
            </View>
        }
        />

        <Button
          title="back"
          color="blue"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Detail: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    flex: 0.9,
    backgroundColor: 'white',
  },
  box2: {
    flex: 0.9,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  box3: {
    flex: 0.5,
    backgroundColor: 'white',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box4: {
    flex: 0.3,
    backgroundColor: 'white',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box5: {
    flex: 0.7,
    backgroundColor: 'white',
    margin: 40
  },
  button: {
    width: 140,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  iconContainer: {
    alignItems: 'center',
    //backgroundColor: '#fff',
    borderColor: 'white',
    //borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    height: 170,
    width: 170,
  },
  icon: {
    //tintColor: 'green',
    height: 170,
    width: 170,
  },
  BoxClass:
    {
      alignItems: 'flex-start',
      height: 150,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: 270,
      paddingTop: 5,
      paddingBottom: 5
    },
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18
    }
});
