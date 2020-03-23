import React from 'react';

import { FormHeader } from './FormHeader';
import { FormFooter } from './FormFooter';

const Form = ({ onSubmit, header, footer, children }) => (
    <>
        {header && <FormHeader>{header}</FormHeader>}
        <form onSubmit={onSubmit} noValidate>
            {children}
        </form>
        {footer && <FormFooter>{footer}</FormFooter>}
    </>
);

export { Form };
