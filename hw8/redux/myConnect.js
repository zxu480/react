import { useState, useEffect } from 'react';

const connect = (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {
    return (props) => {
      const [stateProps, setStateProps] = useState(mapStateToProps(props.store.getState()));

      const dispatchProps = mapDispatchToProps(props.store.dispatch);

      useEffect(() => {
        const unsubscribe = props.store.subscribe(() => {
          setStateProps(mapStateToProps(props.store.getState()));
        });

        return () => {
          unsubscribe();
        };
      }, [props.store]);

      return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
};

export default connect;