import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageProps,
    Image,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import { useSelector } from 'react-redux';


interface CartItemProps {
    id: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    roasted: string;
    prices: any;
    type: string;
    quantity: number;
    incrementCartItemQuantityHandler: any;
    decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    imagelink_square,
    special_ingredient,
    roasted,
    prices,
    quantity,
    type,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,
}) => {

    const cartItem = useSelector((state: any) => state.cart.cart);
    console.log("CART", cartItem)
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.CartItemLinearGradient}
            >
                <View style={styles.CartItemRow}>
                    <Image source={imagelink_square} style={styles.CartItemImage} />
                    <View style={styles.CartItemInfo}>
                        <View>
                            <Text style={styles.CartItemTitle}>{name}</Text>
                            <Text style={styles.CartItemSubtitle}>
                                {special_ingredient}
                            </Text>
                        </View>
                        <View style={styles.CartItemRoastedContainer}>
                            <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                        </View>
                    </View>
                </View>
                <View
            //   key={index.toString()}
              style={styles.CartItemSizeRowContainer}>
              <View style={styles.CartItemSizeValueContainer}>
                <View style={styles.SizeBox}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize:
                          type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                      },
                    ]}>
                    S
                  </Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  ₹
                  <Text style={styles.SizePrice}> {prices}</Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    // decrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    // incrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemRow: {
        flexDirection: 'row',
        gap: SPACING.space_12,
        flex: 1,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between',
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemSingleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SPACING.space_10,
        marginVertical: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
    },
    CartItemSingleInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: SPACING.space_10
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBox: {
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_4,
        padding: SPACING.space_10
    },
    SizeText: {
        color: COLORS.primaryBlackHex,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
    },
    SizeCurrency: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
    },
    SizePrice: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: BORDERRADIUS.radius_8,
        padding: SPACING.space_10
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_8,
        padding: SPACING.space_10,
        marginHorizontal: SPACING.space_10,
    },
    CartItemQuantityText: {
        color: COLORS.primaryBlackHex,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
    },
    CartItemSinglePriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    CartItemSinglePriceText: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
    },
    CartItemSingleRemoveButton: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: BORDERRADIUS.radius_8,
        padding: SPACING.space_10,
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

});

export default CartItem;