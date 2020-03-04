import React, { Fragment } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback

} from "react-native";
import styled from "styled-components";
import { Icon } from "native-base";
// relative import
import SampleComponent from "./sampleComponent";
import NewSampleRequest from "./NewSampleRequest";
import SampleRequest from "./SampleRequest";
import ItemDetail from "../../../shared/ItemDetail";
import ButtonOverlay from "../../../styles/ButtonOverlay";
import GetAsyncToken from "../../../script/getAsyncToken";
import GetSamples from "../../../api/sample/getSamples";
import { connect } from "react-redux";
import { sampleList } from '../../../store/actions/index'
import LoaderView from "../../../styles/LoaderView";
import Loader from '../../../shared/Loader';
import UpdateOtherSampleRequest from '../../../api/sample/updateOtherSampleRequest';
// import console = require("console");

const data = {
  styleNo: "sty2211",
  styleName: "Casual Shirt",
  supplier: "head textiles",
  season: "summer"
};

// const sampleArr = [{ key: 1 }, { key: 2 }, { key: 3 }];
const StyleDescriptionRow = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-bottom: 5px;
`;
// button css start
const ButtonRow = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: 10px;
`;
const CommentedButton = styled(View)`
  background-color: ${props => props.theme.blue};
  padding: 0;
  justify-content: center;
  align-items: center;
  height: 30;
`;
const IconView = styled.View`
  width: 30px;
  height: 30px;
  background-color: #415461;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  padding: 0px 10px;
  text-align: center;
  font-family: ${props => props.theme.regular};
`;
// button css end
const SampleRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleRequest: false,
      showOpacity: false,
      sampleArray: null,
      selectedSample: null,
      mainState: [],
      finishOutsideState: null,
      finishInsideState: null
      // mainState: [{
      //   "sampleData": []
      // }],
    };
  }
  saveChanges() {
    // console.log("parent function called", this.state.sampleRequest);
    this.setState({
      sampleRequest: false
    });

    GetAsyncToken()
      .then(token => {
        console.log('design', this.props.designState);
        UpdateOtherSampleRequest(token, this.state.mainState, this.props.finishOutside, 
          this.props.finishInside, this.props.designState, this.props.customState)
          .then(res => {
            console.log('other sample updated', res);
          })
      })
  }
  componentDidMount = () => {
    this.getSamplesData();
  }
  getSamplesData = () => {
    // console.log('getting samples');
    GetAsyncToken()
      .then(token => {
        GetSamples(token, this.props.styleId)
          .then(res => {
            console.log('sample data from api', res);
            this.props.sampleListFunction(res)
          })
      })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.sampleData !== prevState.sampleArray) {
      return {
        sampleArray: nextProps.sampleData.data,
      }
    }
    if(nextProps.finishOutside !== prevState.finishOutsideState){
      return{
        finishOutsideState : nextProps.finishOutside
      }
    }
    if(nextProps.finishInside != prevState.finishInsideState){
      return{
        finishInsideState : nextProps.finishInside
      }
    }
    return null;
  }
  callSample = (sampleData) => {
    console.log('yay', sampleData);
    this.setState({
      sampleRequest: true,
      selectedSample: {
        "id": sampleData.id,
        "name": sampleData.sampleRequestStatus
      }
    }, () => this.updateMainState(sampleData))
  }
  updateMainState(sampleData1) {

    // this.setState(prevState => ({

    // }))

    this.setState(prevState => ({
      ...prevState,
      mainState: {
        ...prevState.mainState,
        sampleData: sampleData1
      }
    }))

    // this.setState(prevState => ({
    //   ...prevState,
    //   dataArray: {
    //     ...prevState.dataArray,
    //     data: {
    //       ...prevState.dataArray.data,
    //       isFollower: true
    //     }
    //   }
    // }))
    // this.setState(prevState => ({
    //   attachment: [...prevState.attachment, ...this.props.initialImages]
    // }), () =>
  }
  render() {
    // console.log('this.state.finishOutside', this.state.finishOutside);
    
    const history = this.props.history;
    return (
      <Fragment>
        <ItemDetail data={this.props.style.data} />
        {this.state.sampleRequest == false && (
          <Fragment>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <TouchableWithoutFeedback
                  onPressIn={() => this.setState({ showOpacity: true })}
                  onPressOut={() => this.setState({ showOpacity: false })}
                  onPress={() => { }}
                >
                  <ButtonRow>
                    {this.state.showOpacity && <ButtonOverlay />}
                    <IconView>
                      <Icon style={{ color: "#fff", fontSize: 15 }} name="eye" />
                    </IconView>
                    <CommentedButton>
                      <ButtonText> hide commented </ButtonText>
                    </CommentedButton>

                  </ButtonRow>
                </TouchableWithoutFeedback>
              </View>
              <SampleRow>
                {this.state.sampleArray != null ?
                  <Fragment>
                    {
                      this.state.sampleArray.sampleRequests.map(d => {
                        // console.log('reach condition', d);
                        return (
                          <SampleComponent
                            key={d.id}
                            data={d}
                            closeSampleList={this.callSample}
                          />
                        );
                      })

                    }
                    {

                    }
                    <NewSampleRequest
                      styleId={this.props.styleId}
                      data={this.props.style.data}
                      history={this.props.history}
                    />
                  </Fragment>
                  : <LoaderView>
                    <Loader />
                  </LoaderView>
                }

              </SampleRow>
            </ScrollView>
          </Fragment>
        )}
        {this.state.sampleRequest == true && (
          <SampleRequest
            apply={() => this.saveChanges()}
            cancel={() => this.setState({ sampleRequest: false })}
            history={this.props.history}
            id={this.state.selectedSample.id}
          // deadline={this.state.sampleData.}
          />
        )}
      </Fragment>
    );
  }
}
mapStateToProps = state => {
  return {
    sampleData: state.sampleList.sampleListState,
    styleId: state.styleId.styleIdState,
    style: state.singleStyle.singleStyleState,
    finishOutside: state.sampleRequestTabs.finishOutsideState,
    finishInside: state.sampleRequestTabs.finishInsideState,
    designState: state.sampleRequestTabs.designState,
    measurementState: state.sampleRequestTabs.measurementTableState,
    sampleStatusState: state.sampleRequestTabs.sampleStatusState,
    customState: state.sampleRequestTabs.customCommentsState,

  }
}
mapDispatchToProps = dispatch => {
  return {
    sampleListFunction: (data) => dispatch(sampleList(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sample);
