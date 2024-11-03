import { useThemeColor } from '@/hooks/useThemeColor';
import { Image, StyleSheet, View } from 'react-native';
import { ThemeText } from '../typography';


type Props = {
    type: "cast" | "gallery" | "movie";
    heading: string,
    subheading: string,
    imgSrc: string,
};

export function CarouselItem({ type = 'movie', heading, subheading, imgSrc }:Props) {
  const colors = useThemeColor();

  const ItemStyles = StyleSheet.create({
    common: {
      width: '100%',
      ...(type === 'movie' ? { 
        maxWidth: 150,
        } : { 
          maxWidth: 120,
      })
    },
    image: {
        objectFit: 'cover',
        ...(type === 'movie' ? { 
            width: 150,
            height: 176,
          } : {
            width: 120,
            height: 120,
          }
        ),
        ...(type === 'cast' ? { borderRadius: 999 } : { borderRadius: 12 })
    },
    infoContainer: {
      width: '100%',
      marginTop: 8,
        ...(type === 'gallery' && { display: 'none' }
        ),
    },
    heading: {
      color: colors.text.base,
      ...(type === 'cast' && { textAlign: 'center' })
    },
    subheading: {
      color: colors.text.details,
      marginBottom: 4,
      ...(type === 'cast' && { textAlign: 'center' })
    },
  });

  return (
    <View style={ItemStyles.common}>
        <Image style={ItemStyles.image} source={{
          uri: imgSrc,
        }}/> 
        <View style={[ItemStyles.infoContainer]}>
            <ThemeText size='base' style={ItemStyles.heading}>{heading}</ThemeText>
            <ThemeText size={type === "movie" ? 'xs' : 'sm'} style={ItemStyles.subheading}>{subheading}</ThemeText>
        </View>
    </View>
  );
}
