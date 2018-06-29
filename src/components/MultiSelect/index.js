import classNames from 'classnames';
import React from 'react';

import { MultiSelect as MMultiSelect } from 'meiko';

const MultiSelect = ({ className, listClassName, ...props }) => (
  <MMultiSelect
    {...props}
    className={classNames(className, 'bishamon-multiselect')}
    listClassName={classNames(listClassName, 'bishamon-multiselect-list')}
  />
);

export default MultiSelect;
