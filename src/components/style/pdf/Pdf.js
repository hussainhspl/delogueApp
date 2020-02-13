import React,{Fragment} from 'react';
import { View, Text, TouchableHighlight, AppState } from 'react-native';
import { ListItem, CheckBox, Body } from 'native-base';
import styled from 'styled-components';
import { connect } from "react-redux";
// relative import
import CommonModal from '../../../shared/CommonModal';
import { generalTab } from '../../../store/actions/index';
import GetAsyncToken from '../../../script/getAsyncToken';
import GetPrintOptions from '../../../api/pdf/getPrintOptions';
import { el } from 'date-fns/locale';
import PrintPdf from '../../../api/pdf/printPdf';

const SelectorBox = styled.View`
  padding: 10px;
`;
const TitleText = styled.Text`
  font-family: ${props => props.theme.regular};
  color: ${props => props.theme.textColor};
  font-size: ${props => props.theme.large};
  padding-bottom: 20px;
`;
const CheckBoxText = styled.Text`
  font-family: ${props => props.theme.bold};
  color: ${props => props.theme.textColor};
  font-size: ${props => props.theme.large};
`;
const SubListItem = styled(ListItem)`
  padding-left: 15px;
`;
class Pdf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      modalVisible: true,
      printOptions: null,
      selectAllOptions: false,
      sampleComments: null
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  redirectTo = (history) => {
    // console.log('enter in  redirect function');
    history.push("/style")
  }
  closeModal() {
    // console.log("enter in close modal")
    this.setState({ modalVisible: false }, () => this.props.generalTabFunction());
    // if(this.state.modalVisible == false) {
    //   this.props.generalTabFunction();
    // }
  }
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);

    GetAsyncToken()
      .then(token => {
        GetPrintOptions(token, this.props.styleID)
          .then(res => {
            console.log('print options', res);
            this.setState({
              printOptions: res.data.printSettings,
              sampleComments: res.data.sampleTypes
            })
          })
      })
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      this.setState({ modalVisible: false }, () => this.props.generalTabFunction());
    }
  }

  updatePrintOption(id) {
    // console.log('checkbox print', id);
    // let key = 2;
    
    this.setState(prevState => ({
      printOptions: prevState.printOptions.map(
        (el, index) => el.id === id ? {
          ...el, selectDefaultInPrint: !this.state.printOptions[index].selectDefaultInPrint
        } : el
      )
    }), () => this.updateChild(id))
    // console.log('sub list outside', this.state.printOptions[7].selectDefaultInPrint);
    
  }
  updateChild (id) {
    console.log('id : ', id);
    this.state.printOptions.map(el => {
      if(el.id == 7) {
        // let currentPosition = this.state.attachment.filter(imgObj => imgObj.id != id)
        console.log('sub list parent', el, el.id, el.selectDefaultInPrint);
        this.setState(prevState => ({
          sampleComments: prevState.sampleComments.map((el1, index) =>
            el1.id == el1.id ? { ...el1, isActive:  el.selectDefaultInPrint} : { ...el1, isActive:  el1.selectDefaultInPrint})
        }))
      }
    })
    
  }

  selectAll = () => {
    let toggle = !this.state.selectAllOptions;
    this.setState({ selectAllOptions: !this.state.selectAllOptions });
    this.setState(prevState => ({
      printOptions: prevState.printOptions.map((el, index) =>
        el.id == el.id ? { ...el, selectDefaultInPrint: !this.state.selectAllOptions } : el)
    }))
    this.setState(prevState => ({
      sampleComments: prevState.sampleComments.map((el, index) =>
        el.id == el.id ? { ...el, isActive: !this.state.selectAllOptions } : el)
    }))

    console.log("toggle checkbox", toggle);
  }

  updateSampleOption(id) {
    this.setState(prevState => ({
      sampleComments: prevState.sampleComments.map(
        (el, index) => el.id === id ? {
          ...el, isActive: !this.state.sampleComments[index].isActive
        } : el
      )
    }))
  }
  printClick = () => {
    console.log("pr");
    // let PrintOptionsIds = this.state.printOptions.filter(item.id);
    const {id} = this.state.printOptions;
    let PrintOptionsIds="";
    let SampleTypeIds = "";
    this.state.printOptions.map( (p, idx) => {
      if(p.selectDefaultInPrint){
        let count = this.state.printOptions.filter(x => x.selectDefaultInPrint == true).length;
        count > idx ?
        PrintOptionsIds+=p.id+",": PrintOptionsIds+=p.id

      }
    })
    this.state.sampleComments.map( (s,idx) =>{
      if(s.isActive) {
        let count = this.state.sampleComments.filter(x => x.isActive == true).length;
        count > idx ?
          SampleTypeIds+=s.id+",": SampleTypeIds+=s.id
      }
      
    })
    console.log('print ids', SampleTypeIds);
    GetAsyncToken()
      .then(token => {
        PrintPdf (token, this.props.styleID, PrintOptionsIds, SampleTypeIds)
          .then(res => {
            console.log('print output', res);
            // this.setState({
            //   printOptions: res.data.printSettings,
            //   sampleComments: res.data.sampleTypes
            // })
          })
      })
  }
  render() {
    console.disableYellowBox = true
    history = this.props.history;
    // console.log('pdf history', this.state.printOptions);
    return (
      <View style={{ flex: 1 }}>
        {/* <TouchableHighlight
					onPress={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}>

        <Text> pdf </Text>
          
          </TouchableHighlight> */}
        <CommonModal
          title='Print Style'
          modalVisible={this.state.modalVisible}
          // close={() => {this.props.generalTabFunction()}}
          close={() => { this.closeModal() }}
          okButtonText="print pdf"
          okClick={() => this.printClick()}
        >
          <SelectorBox>
            <TitleText> Please select which parts of this style you would like to print </TitleText>
            <ListItem>
              <CheckBox onPress={this.selectAll}
                checked={this.state.selectAllOptions} color="#415461"
              />
              <Body>
                <CheckBoxText style={{ paddingLeft: 15 }}>All</CheckBoxText>
              </Body>
            </ListItem>
            {
              this.state.printOptions != null ?
                this.state.printOptions.map(options => {
                  return (
                    <Fragment>
                    <ListItem key={options.id}>
                      <CheckBox checked={options.selectDefaultInPrint} color="#415461"
                        onPress={() => this.updatePrintOption(options.id)}
                      />
                      <Body>
                        <CheckBoxText style={{ paddingLeft: 15 }}>{options.printOptionName}</CheckBoxText>
                      </Body>
                      </ListItem>
                      {
                        options.printOptionName === "Sample Comments" ?
                          this.state.sampleComments.map(s => {
                            // console.log('s print', s);
                            return(
                            <SubListItem>
                              <CheckBox checked={s.isActive} color="#415461"
                                onPress={() => this.updateSampleOption(s.id)}
                              />
                              <Body>
                                <CheckBoxText style={{ paddingLeft: 15 }}> {s.name}</CheckBoxText>
                              </Body>
                            </SubListItem>
                          )})
                        : null
                      }
                    </Fragment>
                  )
                })
                : null
            }
          </SelectorBox>
        </CommonModal>
      </View>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    generalTabFunction: () => dispatch(generalTab()),
  }
}
export default connect(null, mapDispatchToProps)(Pdf);
// export default Pdf;