import React from 'react';
import {View, Text, Dimensions, TouchableHighlight} from 'react-native';
import styled from 'styled-components';

const MenuText = styled.Text`
  padding: 15px;
  
`;

const window = Dimensions.get('window');

export default class Menu extends React.Component {
  render() {
    const history= this.props.history;
    return (
      <View style={styles.menuContainer}>
        {/* <View style={styles.menuHeader}> 
          <Text> Menu </Text>
        </View> */}
        <View style={{height:80,paddingLeft: 15, paddingTop: 15, justifyContent:"space-between"}}>
          <TouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)' 
            onPress={() => history.push("/")}>
            <MenuText > Logout </MenuText>
          </TouchableHighlight>
          {/* <Text onPress={() => onItemSelected('Contacts')}> Switch Company </Text> */}
          <TouchableHighlight underlayColor='rgba(221, 221, 221, 0.4)' 
            onPress={() => history.push("/companyList")}>
              <View style={{backgroundColor: '#C2BEB6'}}><MenuText style={styles.grayButtonText}>demo company</MenuText></View>
            {/* <Button small </Button> */}
          </TouchableHighlight>
          
        </View>
      </View>
    )
  }
}

const styles = {
  menuHeader: {
    backgroundColor: '#3c86f2', 
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    borderWidth: 1,
    borderLeftColor: '#ccc',
    flex: 1,
    backgroundColor: '#eee',
  },
  grayButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
    padding: 5,
  },
}


// Menu.propTypes = {
//   onItemSelected: PropTypes.func.isRequired,
// };
