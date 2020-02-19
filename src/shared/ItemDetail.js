import React, { Fragment } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import styled from "styled-components";
import Title from "../styles/SmallText";
import CardText from '../styles/CardText';

const ImageBox = styled.View`
  height: 80px;
  width: 80px;
  /* justify-content: center;
  align-items: center; */
  margin-right: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`;
const Flex = styled.View`
  flex: 1;
  flex-direction: row;
  height: 70px;
`;

const MainRow = styled.View`
  border-bottom-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.3);
  padding: 5px 5px 5px 5px;
  flex-direction: row;
  align-items: center;
  /* margin-bottom: 5px; */
`;

const StyledView = styled.View`
  width: 50%;
  justify-content: space-between;
`;

const StyleImage = styled.Image`
  width: 80px;
  height: 80px;
`;

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: null
    };
  }
  getThumbnail = (thumbnails) => {
    // console.log("get thumbnail called")
    if (thumbnails != null) {
      thumbnails.some(s => {

        if (s.size > 20000) {
          this.setState({
            imgSrc: s.url
          })
          return true;
        }
        else if (s.size > 10000) {
          this.setState({
            imgSrc: s.url
          })
          return true;
        }
        return false
      })
    }
  }
  componentDidMount = () => {
    if (this.props.data != null) {
      if (this.props.data.logoThumbnails != null) {
        this.getThumbnail(this.props.data.logoThumbnails)
      }
    }
  }
  render() {
    let data = this.props.data;
    // console.log("data in item detail", data);
    return (
      <MainRow>
        {data != null ? <Fragment>
          <ImageBox>
            <StyleImage
              resizeMode={"contain"}
              source={{
                uri: this.state.imgSrc ? this.state.imgSrc :
                  data.logo ? data.logo.url : noImage
              }}
            // source={require("../../assets/img/shirt-static.png")}
            />
          </ImageBox>
          <Flex>
            <StyledView>
              <View>
                <Title numberOfLines={1}>style no</Title>
                <CardText numberOfLines={1}>{data.userDefinedId}</CardText>
              </View>
              <View>
                <Title>style name</Title>
                <CardText numberOfLines={1}>{data.name}</CardText>
              </View>
            </StyledView>
            <StyledView>
              <View>
                <Title numberOfLines={1}>supplier</Title>
                <CardText numberOfLines={1}>
                  {data.supplierName ? data.supplierName : data.supplier ? data.supplier.name : "-"}
                </CardText>
              </View>
              <View>
                <Title numberOfLines={1}>season</Title>
                <CardText numberOfLines={1}>
                  {data.seasonName ? data.seasonName : data.season ? data.season.name : "-"}
                </CardText>
              </View>
            </StyledView>
          </Flex>
        </Fragment>
          : <Fragment>
          <ImageBox>
            <StyleImage
              resizeMode={"contain"}
              source={{
                uri: noImage
              }}
            />
          </ImageBox>
          <Flex>
            <StyledView>
              <View>
                <Title numberOfLines={1}>style no</Title>
                <CardText numberOfLines={1}></CardText>
              </View>
              <View>
                <Title>style name</Title>
                <CardText numberOfLines={1}/>
              </View>
            </StyledView>
            <StyledView>
              <View>
                <Title numberOfLines={1}>supplier</Title>
                <CardText numberOfLines={1} />
              </View>
              <View>
                <Title numberOfLines={1}>season</Title>
                <CardText numberOfLines={1} />
              </View>
            </StyledView>
          </Flex>
        </Fragment>
          // <Text>no data available</Text>
          }
      </MainRow>
    );
  }
}

export default ItemDetail;
