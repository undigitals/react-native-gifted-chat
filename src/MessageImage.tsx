import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  ImageProps,
  ViewStyle,
  StyleProp,
  ImageStyle,
  FlatList
} from 'react-native'
// TODO: support web
// @ts-ignore
import Lightbox from 'react-native-lightbox'
import { IMessage } from './Models'
import { StylePropType } from './utils'

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
})

export interface MessageImageProps<TMessage extends IMessage> {
  currentMessage?: TMessage
  containerStyle?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  imageProps?: Partial<ImageProps>
  lightboxProps?: object
}

export default class MessageImage<
  TMessage extends IMessage = IMessage
> extends Component<MessageImageProps<TMessage>> {
  static defaultProps = {
    currentMessage: {
      image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
  }

  static propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: StylePropType,
    imageStyle: StylePropType,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
  }
  render() {
    const {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage,
      multipleImages
    } = this.props
    if (!!currentMessage) {
      if(multipleImages?.length > 1){
        const renderMultipleImage = (props) => (
          <View style={[styles.container, containerStyle]}>
            <Lightbox activeProps={{style: styles.imageActive,}} {...lightboxProps}>
                <Image {...imageProps} style={[styles.image, imageStyle]} source={{ uri: props?.item?.Media }}/>
            </Lightbox>
          </View>
        )
        return (
          <FlatList 
            data={multipleImages}
            renderItem={(item) => renderMultipleImage(item)}
            keyExtractor={item => item.id}
          />
        )
      }

      return (
        <View style={[styles.container, containerStyle]}>
          <Lightbox
            activeProps={{
              style: styles.imageActive,
            }}
            {...lightboxProps}
          >
            <Image
              {...imageProps}
              style={[styles.image, imageStyle]}
              source={{ uri: currentMessage.image }}
            />
          </Lightbox>
        </View>
      )
    }
    return null
  }
}
