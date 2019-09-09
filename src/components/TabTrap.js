import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { nano } from 'mko';
import { usePrevious } from 'hooks/usePrevious';

nano.put('.tab-trap', {
  position: 'absolute',
  height: 0,
  width: 0,
  padding: 0,
  border: 'none',
  margin: 0,
  opacity: 0
});

const TabTrap = React.forwardRef(function TabTrap(
  { isActive, firstId, lastId, element, onDeactivate, children, ...passProps },
  ref
) {
  const Container = element;
  const prevActive = usePrevious(isActive);

  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(() => {
        const target = ref.current.querySelector(`#${firstId}`);
        target.focus();
      });
    } else if (prevActive && onDeactivate) {
      onDeactivate();
    }
  }, [ref, isActive, prevActive, firstId, onDeactivate]);

  function focusCycler(e) {
    e.persist();

    const prev = e.relatedTarget;
    const isPrevATrap = prev.className.includes('tab-trap');
    const isCurrTopTrap = e.target.className.includes('tab-trap--top');

    if (isPrevATrap) {
      const targetId = isCurrTopTrap ? firstId : lastId;
      const targetElement = ref.current.querySelector(`#${targetId}`);
      targetElement.focus();
      return;
    }

    const nextTrapClass = isCurrTopTrap
      ? '.tab-trap--bottom'
      : '.tab-trap--top';

    const nextTrap = ref.current.querySelector(nextTrapClass);
    if (nextTrap === document.activeElement) {
      const targetElement = ref.current.querySelector(`#${firstId}`);
      targetElement.focus();
      return;
    }

    nextTrap.focus();
  }

  return (
    <Container ref={ref} {...passProps}>
      <input
        type="text"
        className="tab-trap tab-trap--top"
        onFocus={focusCycler}
      />
      {children}
      <input
        type="text"
        className="tab-trap tab-trap--bottom"
        onFocus={focusCycler}
      />
    </Container>
  );
});

TabTrap.defaultProps = {
  element: 'div'
};

TabTrap.propTypes = {
  isActive: PropTypes.bool.isRequired,
  element: PropTypes.string,
  firstId: PropTypes.string.isRequired,
  lastId: PropTypes.string.isRequired,
  onDeactivate: PropTypes.func
};

export default TabTrap;
