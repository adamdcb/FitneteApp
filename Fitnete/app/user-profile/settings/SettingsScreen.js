import React from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Container from '../../utils/components/Container';
import FNIcon from '../../utils/components/FNIcon';
import I18n from '../../utils/i18n/I18n';
import SettingsPresenter from './SettingsPresenter';
import ListViewItemSeparator from '../../utils/components/ListViewItemSeparator';
import LoadingView from '../../utils/components/LoadingView';

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.presenter = new SettingsPresenter(this);
        this._renderItem = this._renderItem.bind(this);
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

    _renderItem({ item }) {
        return (
            <TouchableOpacity
                style={styles.listItemContainer}
            >
                <Text style={styles.listItemTitle}>{item.title}</Text>
                <FNIcon
                    name={item.iconName}
                    size={18}
                    color="#B4B3B6"
                />
            </TouchableOpacity>
        )
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return (<LoadingView />);
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>
                    <LinearGradient
                        style={styles.headerBackground1}
                        colors={['#1CD9D9', '#3E3750']}
                        locations={[0, 1]}
                        angle={90}
                        useAngle
                    />
                    <View style={styles.headerBackground2} />
                    <View style={styles.statusContainer}>
                        <Text style={styles.status}>{I18n.t('settings.status').toUpperCase()}</Text>
                        <View style={styles.statusBottomViewContainer}>
                            <Text style={styles.pro}>{I18n.t('settings.pro').toUpperCase()} <Text style={styles.proStatus}>Inactive</Text></Text>
                            <TouchableOpacity style={styles.getFullAccessButton}>
                                <LinearGradient
                                    style={styles.getFullAccessButtonGradient}
                                    colors={['#89F8AD', '#73F9E0']}
                                    locations={[0, 1]}
                                    angle={270}
                                    useAngle
                                >
                                    <View style={styles.getFullAccessButtonContent}>
                                        <Text style={styles.getFullAccess}>{I18n.t('settings.getFullAccess')}</Text>
                                        <View style={styles.star}>
                                            <FNIcon
                                                name="star"
                                                size={16}
                                                color="#DFB63E"
                                            />
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Container useScroll={false}>
                    <Text style={styles.listTitle}>{I18n.t('settings.proStatus').toUpperCase()}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    innerContainer: {
        backgroundColor: '#F3F4FA'
    },
    headerBackground1: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    headerBackground2: {
        position: 'absolute',
        height: 54,
        width: '100%',
        top: 0,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    statusContainer: {
        marginTop: 54
    },
    status: {
        marginVertical: 16,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    statusBottomViewContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 12,
        marginBottom: 12,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pro: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#FFFFFF'
    },
    proStatus: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#FFFFFF'
    },
    getFullAccessButton: {
        overflow: 'hidden',
        height: 40,
        borderRadius: 20
    },
    getFullAccessButtonGradient: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 4
    },
    getFullAccessButtonContent: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    getFullAccess: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#3E3750',
        textAlign: 'center'
    },
    star: {
        backgroundColor: '#3E3750',
        marginLeft: 8,
        height: 32,
        width: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
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
    listItemTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57'
    }
});

SettingsScreen.navigationOptions = () => ({
    title: I18n.t('settings.title')
});

export default SettingsScreen;