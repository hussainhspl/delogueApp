import React, { Component } from 'react';
import {
	View, StyleSheet, Keyboard
	, TouchableWithoutFeedback, Text, Dimensions
	, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import styled from 'styled-components';
import CNRichTextEditor, { CNToolbar, getInitialObject, getDefaultStyles, 
	convertToHtmlString } from "react-native-cn-richtext-editor";
import {
	Menu, MenuOptions, MenuOption,MenuTrigger,MenuContext,
	MenuProvider, renderers} from 'react-native-popup-menu';
import { Icon } from "native-base";


const { SlideInMenu } = renderers;

const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');
const defaultStyles = getDefaultStyles();	

const ToolbarButton = styled.View`
	width: 28px;
	height: 28px;
	align-items: center;
	justify-content: center;
`;
class TextEditor extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedTag: 'body',
			selectedStyles: [],
			selectedColor : 'default',
			colors : ['red', 'green', 'blue'],
			value: [getInitialObject()]
		};

		this.editor = null;
	}

	onStyleKeyPress = (toolType) => {
		this.editor.applyToolbar(toolType);
	}

	onSelectedTagChanged = (tag) => {
		this.setState({
			selectedTag: tag
		})
	}

	onSelectedStyleChanged = (styles) => {
		this.setState({
			selectedStyles: styles,
		})
	}

	onValueChanged = (value) => {
		this.setState({
			value: value
		});
	}

	sendHtml() {
		let html = convertToHtmlString(this.state.value);
		console.log('html string', html);
		this.props.bodyHtml(html)
	}

	renderColorSelector() {
       
		let selectedColor = '#737373';
		if(defaultStyles[this.state.selectedColor])
		{
				selectedColor = defaultStyles[this.state.selectedColor].color;
		}
		
		return (
				<Menu renderer={SlideInMenu} onSelect={this.onColorSelectorClicked}>
				<MenuTrigger>
					{/* <MaterialCommunityIcons name="format-color-text" color={selectedColor}
            size={28} style={{
            	top:2
            }} />            */}
				</MenuTrigger>
				<MenuOptions customStyles={optionsStyles}>
						{this.renderColorMenuOptions()}
				</MenuOptions>
				</Menu>
		);
	}
	renderColorMenuOptions = () => {

		let lst = [];

		if(defaultStyles[this.state.selectedColor]) {
				 lst = this.state.colors.filter(x => x !== this.state.selectedColor);
				 lst.push('default');
				lst.push(this.state.selectedColor);
		}
		else {
				lst = this.state.colors.filter(x=> true);
				lst.push('default');
		}

		return (
				
				lst.map( (item) => {
						let color = defaultStyles[item] ? defaultStyles[item].color : 'black';
						return (
								<MenuOption value={item} key={item}>
										{/* <MaterialCommunityIcons name="format-color-text" color={color}
										size={28} /> */}
									<Icon />
								</MenuOption>
						);
				})
				
		);
}

	render() {
		return (
			<KeyboardAvoidingView
				behavior="padding"
				enabled
				keyboardVerticalOffset={0}
				style={{
					flex: 1,
					paddingTop: 20,
					backgroundColor: '#eee',
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} >
					<View style={styles.main}>
						<CNRichTextEditor
							ref={input => this.editor = input}
							onSelectedTagChanged={this.onSelectedTagChanged}
							onSelectedStyleChanged={this.onSelectedStyleChanged}
							value={this.state.value}
							style={{ backgroundColor: '#fff' }}
							styleList={defaultStyles}
							onValueChanged={this.onValueChanged}
							onBlur={() => this.sendHtml()}
						/>
					</View>
				</TouchableWithoutFeedback>

				<View style={{
					minHeight: 35
				}}>

					<CNToolbar
						style={{
							height: 35,
						}}
						iconSetContainerStyle={{
							flexGrow: 1,
							justifyContent: 'space-evenly',
							alignItems: 'center',
						}}
						size={30}
						iconSet={[
							{
								type: 'tool',
								iconArray: [{
									toolTypeText: 'bold',
									buttonTypes: 'style',
									iconComponent: <ToolbarButton>
										<Image source={require("../../../assets/img/text-editor/001-bold.png")} />
									</ToolbarButton>

								}]
							},
							{
								type: 'tool',
								iconArray: [{
									toolTypeText: 'italic',
									buttonTypes: 'style',
									iconComponent:<ToolbarButton>
										<Image source={require("../../../assets/img/text-editor/002-italic.png")} />
									</ToolbarButton>
								}]
							},
							{
								type: 'tool',
								iconArray: [{
									toolTypeText: 'underline',
									buttonTypes: 'style',
									iconComponent:<ToolbarButton>
										<Image source={require("../../../assets/img/text-editor/003-underline.png")} />
									</ToolbarButton>
								}]
							},
							// {
							// 	type: 'seperator'
							// },
							// {
							// 	type: 'tool',
							// 	iconArray: [
							// 		{
							// 			toolTypeText: 'body',
							// 			buttonTypes: 'tag',
							// 			iconComponent:
							// 				<Text style={styles.toolbarButton}>
							// 					body
              //         </Text>
							// 		},
							// 	]
							// },
							{
								type: 'tool',
								iconArray: [
									{
										toolTypeText: 'ul',
										buttonTypes: 'tag',
										iconComponent: <ToolbarButton>
											<Image source={require("../../../assets/img/text-editor/007-list.png")} />
										</ToolbarButton>
									}
								]
							},
							{
								type: 'tool',
								iconArray: [
									{
										toolTypeText: 'ol',
										buttonTypes: 'tag',
										iconComponent: <ToolbarButton>
											<Image source={require("../../../assets/img/text-editor/number.png")} />
										</ToolbarButton>
									}
								]
							},
							{
								type: 'tool',
								iconArray: [{
									toolTypeText: 'color',
									iconComponent: this.renderColorSelector()
								}]
							},
						]}
						selectedTag={this.state.selectedTag}
						selectedStyles={this.state.selectedStyles}
						onStyleKeyPress={this.onStyleKeyPress}
					/>
				</View>
			</KeyboardAvoidingView>
		);
	}

}

const optionsStyles = {
	optionsContainer: {
		backgroundColor: 'yellow',
		padding: 0,   
		width: 40,
		marginLeft: width - 40 - 30,
		alignItems: 'flex-end',
	},
	optionsWrapper: {
		//width: 40,
		backgroundColor: 'white',
	},
	optionWrapper: {
		 //backgroundColor: 'yellow',
		margin: 2,
	},
	optionTouchable: {
		underlayColor: 'gold',
		activeOpacity: 70,
	},
	// optionText: {
	//   color: 'brown',
	//},
  }; 

var styles = StyleSheet.create({
	main: {
		flex: 1,
		marginTop: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 1,
		alignItems: 'stretch',
	},
	italicButton: {
		fontStyle: 'italic'
	},
	boldButton: {
		fontWeight: 'bold'
	},
	underlineButton: {
		textDecorationLine: 'underline'
	},
	lineThroughButton: {
		textDecorationLine: 'line-through'
	},
});


export default TextEditor;