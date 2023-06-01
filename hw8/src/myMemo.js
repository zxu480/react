import PureComponent from "./MyPureComponent";

export default function myMemo(Component, arePropsEqual) {
    let prevProps = null;
    let preComponent = null;

    return function(props) {
        const propsEqual = arePropsEqual ? arePropsEqual(prevProps, props) : PureComponent.shallowEqual(prevProps, props);
        prevProps = {...props};
        preComponent = preComponent && propsEqual ? preComponent : <Component {...props}/>;
        return preComponent; 
    }
}