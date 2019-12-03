import RealEstateViewContainer from '../containers/RealEstateViewContainer';
import HouseProfileViewContainer from '../containers/HouseProfileViewContainer';

export default [
    {
        exact: true,
        path: '/',
        component: RealEstateViewContainer,
        key: 'RealEstateViewContainer',
    },
    {
        exact: true,
        path: '/house-profile/:value',
        component: HouseProfileViewContainer,
        key: 'HouseProfileViewContainer',
    },
];
