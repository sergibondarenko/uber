import { ImageProps } from 'react-native';

export type IImageProps = Omit<ImageProps, "source">;
export type IImage = (props: IImageProps) => JSX.Element;