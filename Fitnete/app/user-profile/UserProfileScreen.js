import React from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Container from '../utils/components/Container';
import FNIcon from '../utils/components/FNIcon';
import UserProfilePresenter from './UserProfilePresenter';
import I18n from '../utils/i18n/I18n';
import { push, Route } from '../utils/navigation/NavigationService';
import ListViewItemSeparator from '../utils/components/ListViewItemSeparator';
import LoadingView from '../utils/components/LoadingView';

class UserProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            pageWidth: Dimensions.get('window').width
        };
        this.presenter = new UserProfilePresenter(this);
        this._renderItem = this._renderItem.bind(this);
        this._openSettings = this._openSettings.bind(this);
        this.props.navigation.setParams({
            openSettings: this._openSettings
        });
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState({ data });
    }

    _openSettings() {
        push(Route.Settings);
    }

    _renderItem({ item }) {
        return (
            <View
                style={styles.listItemContainer}
            >
                <View style={styles.listItemInnerContainer}>
                    <View style={styles.listItemIconContainer}>
                        <FNIcon
                            name={item.iconName}
                            size={24}
                            color="#B4B3B6"
                        />
                    </View>
                    <Text style={styles.listItemTitle}>{item.title}</Text>
                </View>
                <View style={styles.listItemInnerContainer}>
                    <Text style={styles.listItemValue}>{`${item.displayValue}`}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { data, pageWidth } = this.state;
        const photoSize = pageWidth * PHOTO_SIZE_COEFF;
        if (!data) {
            return (<LoadingView />);
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.headerBackground1} />
                    <View style={[styles.headerBackground2, {
                        height: photoSize * (1 - PHOTO_OVERLAP_RATIO) + PADDING_TOP
                    }]} />
                    <View style={styles.userInfoContainer}>
                        <View style={[styles.photoContainer, {
                            width: photoSize,
                            height: photoSize,
                            borderRadius: photoSize / 2
                        }]}>

                        </View>
                        <View style={styles.userInfoInnerContainer}>
                            <View style={styles.userNameContainer}>
                                <View>
                                    <Text style={styles.greeting}>{I18n.t('userProfile.greeting')}</Text>
                                    <Text style={styles.name}>NAME HERE</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.changePhotoContainer}>
                                <FNIcon
                                    name="camera"
                                    size={16}
                                    color="#08C757"
                                />
                                <Text style={styles.changePhoto}>{I18n.t('userProfile.changePhoto')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Container useScroll={false}>
                    <Text style={styles.listTitle}>{I18n.t('userProfile.yourParameters').toUpperCase()}</Text>
                    <FlatList
                        style={{ flex: 1 }}
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={ListViewItemSeparator}
                    />
                </Container>
            </SafeAreaView>
        );
    }
}

const PHOTO_SIZE_COEFF = 0.35;
const PHOTO_OVERLAP_RATIO = 0.2;
const PADDING_TOP = 8;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08C757'
    },
    innerContainer: {
        flexWrap: 'wrap',
        backgroundColor: '#F3F4FA'
    },
    headerBackground1: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        backgroundColor: '#3E3750',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    headerBackground2: {
        position: 'absolute',
        width: '100%',
        top: 0,
        backgroundColor: '#08C757',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    userInfoContainer: {
        paddingTop: PADDING_TOP,
        paddingLeft: 16,
        flexDirection: 'row'
    },
    userInfoInnerContainer: {
        flex: 1,
        marginLeft: 16,
        marginBottom: 12
    },
    userNameContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    photoContainer: {
        marginBottom: 16,
        borderColor: '#07E664',
        borderWidth: 4
    },
    greeting: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#FFFFFF'
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#FFFFFF'
    },
    changePhotoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    changePhoto: {
        marginLeft: 8,
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#FFFFFF'
    },
    listTitle: {
        marginVertical: 16,
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#3E3750'
    },
    listItemContainer: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listItemInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemIconContainer: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItemTitle: {
        marginLeft: 8,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57'
    },
    listItemValue: {
        marginRight: 8,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#B4B3B6',
        textAlign: 'center',
    },
    settingsButton: {
        justifyContent: 'center',
        marginRight: 16
    }
});

UserProfileScreen.navigationOptions = ({ navigation }) => ({
    headerRight: () =>
        <TouchableOpacity
            style={styles.settingsButton}
            onPress={navigation.getParam('openSettings')}
        >
            <FNIcon
                name="settings"
                size={24}
                color="#FFFFFF"
            />
        </TouchableOpacity>,
    headerTitle: () => null
});

export default UserProfileScreen;